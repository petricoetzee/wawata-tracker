import { supabase } from './supabase';

// --- Types ---
export interface Entry {
    id?: string;
    date: string;
    hours: number;
    species_name: string;
    site_name: string;
    person_name: string;
    notes: string;
}

// --- Entries Logic (The Fix) ---

export const getEntries = async () => {
    // We order by DATE now, because "name" doesn't exist on this table
    const { data, error } = await supabase
        .from('entries')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching entries:', error);
        throw error;
    }
    return data || [];
};

export const saveEntry = async (entry: Entry) => {
    // CLEANING THE DATA: We create a specific payload to ensure
    // no ghost fields (like 'name') accidentally get sent to the DB.
    const payload = {
        date: entry.date,
        hours: entry.hours,
        species_name: entry.species_name,
        site_name: entry.site_name,
        person_name: entry.person_name || '', // Handle optional fields safely
        notes: entry.notes || ''
    };

    const { data, error } = await supabase
        .from('entries')
        .insert(payload)
        .select();

    if (error) {
        console.error('Error saving entry:', error);
        throw error;
    }
    return data;
};

export const deleteEntry = async (id: string) => {
    const { error } = await supabase.from('entries').delete().eq('id', id);
    if (error) throw error;
};

// --- Config Logic (Sites, Species, People) ---
// These tables DO have a 'name' column, so we keep this logic simple.

const getList = async (table: string) => {
    const { data, error } = await supabase.from(table).select('*').order('name');
    if (error) throw error;
    return data || [];
};

const saveItem = async (table: string, name: string) => {
    const { data, error } = await supabase.from(table).insert({ name }).select();
    if (error) throw error;
    return data;
};

const deleteItem = async (table: string, id: string) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
};

// Exports for the UI to use
export const getSites = () => getList('sites');
export const saveSite = (name: string) => saveItem('sites', name);
export const deleteSite = (id: string) => deleteItem('sites', id);

export const getSpecies = () => getList('species');
export const saveSpecies = (name: string) => saveItem('species', name);
export const deleteSpecies = (id: string) => deleteItem('species', id);

export const getPeople = () => getList('people');
export const savePerson = (name: string) => saveItem('people', name);
export const deletePerson = (id: string) => deleteItem('people', id);