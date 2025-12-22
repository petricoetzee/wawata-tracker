"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// We import the specific functions that actually exist in your new data.ts
import { saveEntry, deleteEntry, getSites, getSpecies, getPeople, Entry } from "@/lib/data";

interface EntryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultDate?: Date;
    initialData?: Entry | null; // We use the Entry type correctly now
    onSave: () => void;
    refreshTrigger?: number;
}

export default function EntryForm({ open, onOpenChange, defaultDate, initialData, onSave, refreshTrigger }: EntryFormProps) {
    // 1. Updated State Names to match Database
    const [personName, setPersonName] = useState("");
    const [speciesName, setSpeciesName] = useState("");
    const [siteName, setSiteName] = useState("");
    const [hours, setHours] = useState("");

    const [availableSites, setAvailableSites] = useState<any[]>([]);
    const [availableSpecies, setAvailableSpecies] = useState<any[]>([]);
    const [availablePeople, setAvailablePeople] = useState<any[]>([]);

    useEffect(() => {
        // Load the lists when the form opens
        getSites().then(setAvailableSites);
        getSpecies().then(setAvailableSpecies);
        getPeople().then(setAvailablePeople);
    }, [open, refreshTrigger]);

    useEffect(() => {
        if (initialData) {
            // 2. Map the incoming data to the right fields
            setPersonName(initialData.person_name || "");
            setSpeciesName(initialData.species_name || "");
            setSiteName(initialData.site_name || "");
            setHours(initialData.hours.toString());
        } else {
            // Reset form
            setPersonName("");
            setSpeciesName("");
            setSiteName("");
            setHours("8");
        }
    }, [initialData, open]);

    const handleSubmit = async () => {
        // 3. Create the payload exactly how the database wants it
        const entryPayload: Entry = {
            id: initialData?.id, // Keep ID if editing
            date: (defaultDate || new Date()).toISOString().split('T')[0], // Ensure YYYY-MM-DD string
            person_name: personName,
            species_name: speciesName,
            site_name: siteName,
            hours: parseFloat(hours) || 0,
            notes: initialData?.notes || ""
        };

        // We use 'saveEntry' for both adding and editing (assuming insert for now)
        await saveEntry(entryPayload);

        onOpenChange(false);
        onSave();

        // Clear form if it was a new entry
        if (!initialData) {
            setHours("");
            setSpeciesName("");
            setSiteName("");
        }
    };

    const handleDelete = async () => {
        if (initialData && initialData.id && confirm("Are you sure you want to delete this entry?")) {
            await deleteEntry(initialData.id);
            onOpenChange(false);
            onSave();
        }
    };

    const labelClasses = "text-right font-bold text-[#1A3C34] text-base";
    const inputClasses = "col-span-3 bg-white border-2 border-[#8D6E63] text-[#1A3C34] focus-visible:ring-[#1A3C34] focus-visible:ring-offset-0 placeholder:text-stone-400";
    const selectTriggerClasses = "w-full bg-white border-2 border-[#8D6E63] text-[#1A3C34]";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F5F5DC] border-[#8D6E63] border-2 shadow-xl sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-[#1A3C34] font-serif text-2xl font-bold border-b border-[#8D6E63]/30 pb-2">
                        {initialData ? "Edit Journal Entry" : "New Journal Entry"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-6">

                    {/* Person Selector */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="person" className={labelClasses}>Kaitiaki</Label>
                        <div className="col-span-3">
                            <Select onValueChange={setPersonName} value={personName}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select kaitiaki" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availablePeople.map((p: any) => (
                                        <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Site Selector */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="site" className={labelClasses}>Site</Label>
                        <div className="col-span-3">
                            <Select onValueChange={setSiteName} value={siteName}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select site" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availableSites.map((s: any) => (
                                        <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Species Selector */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="species" className={labelClasses}>Species</Label>
                        <div className="col-span-3">
                            <Select onValueChange={setSpeciesName} value={speciesName}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select species" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availableSpecies.map((s: any) => (
                                        <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Hours Input */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hours" className={labelClasses}>Hours</Label>
                        <Input
                            id="hours"
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            className={inputClasses}
                            placeholder="0.0"
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-between sm:justify-between w-full">
                    {initialData ? (
                        <Button variant="destructive" onClick={handleDelete} className="bg-red-700 hover:bg-red-800 text-white font-bold px-4">
                            Delete Entry
                        </Button>
                    ) : <div></div>}

                    <Button onClick={handleSubmit} className="bg-[#1A3C34] text-[#F5F5DC] hover:bg-[#1A3C34]/90 font-bold px-6 py-2 rounded-md shadow-md">
                        {initialData ? "Update Entry" : "Log Entry"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}