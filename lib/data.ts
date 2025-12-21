import { supabase } from './supabase';

export interface LogEntry {
    id: string;
    date: Date;
    name: string;
    targetSpecies: string;
    site: string;
    hours: number;
}

// In-Memory Cache (kept in sync with Supabase)
let entries: LogEntry[] = [];
let sites: string[] = [];
let species: string[] = [];
let people: string[] = [];

// --- LOAD DATA ---

export async function loadFromStorage() {
    try {
        // Fetch Entries
        const { data: entriesData, error: entriesError } = await supabase
            .from('entries')
            .select('*');

        if (entriesError) throw entriesError;

        if (entriesData) {
            entries = entriesData.map((e: any) => ({
                id: e.id,
                date: new Date(e.date),
                name: e.name,
                targetSpecies: e.target_species, // map snake_case from DB
                site: e.site,
                hours: e.hours
            }));
        }

        // Fetch Sites
        const { data: sitesData, error: sitesError } = await supabase
            .from('sites')
            .select('name');
        if (sitesError) throw sitesError;
        if (sitesData) sites = sitesData.map((s: any) => s.name);

        // Fetch Species
        const { data: speciesData, error: speciesError } = await supabase
            .from('species')
            .select('name');
        if (speciesError) throw speciesError;
        if (speciesData) species = speciesData.map((s: any) => s.name);

        // Fetch People
        const { data: peopleData, error: peopleError } = await supabase
            .from('people')
            .select('name');
        if (peopleError) throw peopleError;
        if (peopleData) people = peopleData.map((p: any) => p.name);

    } catch (error) {
        console.error("Failed to load Wawata data from Supabase:", error);
    }
}

// --- ENTRIES ---

export function getEntries(): LogEntry[] {
    return entries;
}

export async function addEntry(entry: Omit<LogEntry, "id">) {
    const dbEntry = {
        date: entry.date.toISOString(),
        name: entry.name,
        target_species: entry.targetSpecies,
        site: entry.site,
        hours: entry.hours
    };

    const { data, error } = await supabase
        .from('entries')
        .insert([dbEntry])
        .select()
        .single();

    if (error) {
        console.error("Error adding entry:", error);
        return null;
    }

    const newEntry: LogEntry = {
        ...entry,
        id: data.id,
    };
    entries.push(newEntry);
    return newEntry;
}

export async function updateEntry(id: string, updatedData: Partial<LogEntry>) {
    const dbUpdate: any = {};
    if (updatedData.date) dbUpdate.date = updatedData.date.toISOString();
    if (updatedData.name) dbUpdate.name = updatedData.name;
    if (updatedData.targetSpecies) dbUpdate.target_species = updatedData.targetSpecies;
    if (updatedData.site) dbUpdate.site = updatedData.site;
    if (updatedData.hours) dbUpdate.hours = updatedData.hours;

    const { error } = await supabase
        .from('entries')
        .update(dbUpdate)
        .eq('id', id);

    if (error) {
        console.error("Error updating entry:", error);
        return;
    }

    entries = entries.map(entry =>
        entry.id === id ? { ...entry, ...updatedData } : entry
    );
}

export async function deleteEntry(id: string) {
    const { error } = await supabase
        .from('entries')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Error deleting entry:", error);
        return;
    }

    entries = entries.filter(entry => entry.id !== id);
}

// --- SITES ---

export function getSites(): string[] {
    return [...sites];
}

export async function addSite(site: string) {
    if (!sites.includes(site)) {
        const { error } = await supabase.from('sites').insert([{ name: site }]);
        if (error) {
            console.error("Error adding site:", error);
            return;
        }
        sites.push(site);
    }
}

export async function deleteSite(site: string) {
    const { error } = await supabase.from('sites').delete().eq('name', site);
    if (error) {
        console.error("Error deleting site:", error);
        return;
    }
    sites = sites.filter(s => s !== site);
}

// --- SPECIES ---

export function getSpecies(): string[] {
    return [...species];
}

export async function addSpecies(specie: string) {
    if (!species.includes(specie)) {
        const { error } = await supabase.from('species').insert([{ name: specie }]);
        if (error) {
            console.error("Error adding species:", error);
            return;
        }
        species.push(specie);
    }
}

export async function deleteSpecies(specie: string) {
    const { error } = await supabase.from('species').delete().eq('name', specie);
    if (error) {
        console.error("Error deleting species:", error);
        return;
    }
    species = species.filter(s => s !== specie);
}

// --- PEOPLE ---

export function getPeople(): string[] {
    return [...people];
}

export async function addPerson(person: string) {
    if (!people.includes(person)) {
        const { error } = await supabase.from('people').insert([{ name: person }]);
        if (error) {
            console.error("Error adding person:", error);
            return;
        }
        people.push(person);
    }
}

export async function deletePerson(person: string) {
    const { error } = await supabase.from('people').delete().eq('name', person);
    if (error) {
        console.error("Error deleting person:", error);
        return;
    }
    people = people.filter(p => p !== person);
}


