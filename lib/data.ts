export interface LogEntry {
    id: string;
    date: Date; // stored as Date object
    name: string;
    targetSpecies: string;
    site: string;
    hours: number;
}

const STORAGE_KEY = 'wawata-data';

// Default Seed Data
const defaultEntries: LogEntry[] = [
    {
        id: "1",
        date: new Date(),
        name: "Kaitiaki 1",
        targetSpecies: "Old Man's Beard",
        site: "River Bank",
        hours: 2.5,
    },
];

const defaultSites = ["River Bank", "Forest Edge", "Wetland", "Home Paddock"];
const defaultSpecies = ["Old Man's Beard", "Banana Passionfruit", "Woolly Nightshade", "Gorse", "Blackberry"];
const defaultPeople = ["Kaitiaki 1", "Volunteer A", "Volunteer B"];

// In-Memory State
let entries: LogEntry[] = [...defaultEntries];
let sites: string[] = [...defaultSites];
let species: string[] = [...defaultSpecies];
let people: string[] = [...defaultPeople];

function saveToStorage() {
    if (typeof window === 'undefined') return;
    const data = {
        entries,
        sites,
        species,
        people
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadFromStorage() {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);

            // Restore Entries (reviving Dates)
            if (Array.isArray(parsed.entries)) {
                entries = parsed.entries.map((e: any) => ({
                    ...e,
                    date: new Date(e.date)
                }));
            }

            // Restore Lists
            if (Array.isArray(parsed.sites)) sites = parsed.sites;
            if (Array.isArray(parsed.species)) species = parsed.species;
            if (Array.isArray(parsed.people)) people = parsed.people;

        } catch (error) {
            console.error("Failed to load Wawata data", error);
        }
    } else {
        // No data found, initialize storage with defaults
        saveToStorage();
    }
}

export function getEntries(): LogEntry[] {
    return entries;
}

export function addEntry(entry: Omit<LogEntry, "id">) {
    const newEntry = { ...entry, id: Math.random().toString(36).substr(2, 9) };
    entries.push(newEntry);
    saveToStorage();
    return newEntry;
}

export function updateEntry(id: string, updatedData: Partial<LogEntry>) {
    entries = entries.map(entry =>
        entry.id === id ? { ...entry, ...updatedData } : entry
    );
    saveToStorage();
}

export function deleteEntry(id: string) {
    entries = entries.filter(entry => entry.id !== id);
    saveToStorage();
}

// Management Functions
export function getSites(): string[] {
    return [...sites];
}

export function addSite(site: string) {
    if (!sites.includes(site)) {
        sites.push(site);
        saveToStorage();
    }
}

export function deleteSite(site: string) {
    sites = sites.filter(s => s !== site);
    saveToStorage();
}

export function getSpecies(): string[] {
    return [...species];
}

export function addSpecies(specie: string) {
    if (!species.includes(specie)) {
        species.push(specie);
        saveToStorage();
    }
}

export function deleteSpecies(specie: string) {
    species = species.filter(s => s !== specie);
    saveToStorage();
}

export function getPeople(): string[] {
    return [...people];
}

export function addPerson(person: string) {
    if (!people.includes(person)) {
        people.push(person);
        saveToStorage();
    }
}

export function deletePerson(person: string) {
    people = people.filter(p => p !== person);
    saveToStorage();
}

