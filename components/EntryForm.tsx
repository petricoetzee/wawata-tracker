"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addEntry, updateEntry, deleteEntry, getSites, getSpecies, getPeople, LogEntry } from "@/lib/data";

interface EntryFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultDate?: Date;
    initialData?: LogEntry | null;
    onSave: () => void;
    refreshTrigger?: number; // Trigger re-fetching lists
}

export default function EntryForm({ open, onOpenChange, defaultDate, initialData, onSave, refreshTrigger }: EntryFormProps) {
    const [name, setName] = useState("");
    const [targetSpecies, setTargetSpecies] = useState("");
    const [site, setSite] = useState("");
    const [hours, setHours] = useState("");

    const [availableSites, setAvailableSites] = useState<string[]>([]);
    const [availableSpecies, setAvailableSpecies] = useState<string[]>([]);
    const [availablePeople, setAvailablePeople] = useState<string[]>([]);

    useEffect(() => {
        setAvailableSites(getSites());
        setAvailableSpecies(getSpecies());
        setAvailablePeople(getPeople());
    }, [open, refreshTrigger]);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setTargetSpecies(initialData.targetSpecies);
            setSite(initialData.site);
            setHours(initialData.hours.toString());
        } else {
            setName("");
            setTargetSpecies("");
            setSite("");
            setHours("8");
        }
    }, [initialData, open]);

    const handleSubmit = async () => {
        if (initialData) {
            await updateEntry(initialData.id, {
                date: defaultDate || new Date(), // Keep date or allow changing? Assuming keeping date or using passed date context
                name,
                targetSpecies,
                site,
                hours: parseFloat(hours) || 0,
            });
        } else {
            await addEntry({
                date: defaultDate || new Date(),
                name,
                targetSpecies,
                site,
                hours: parseFloat(hours) || 0,
            });
        }

        onOpenChange(false);
        onSave();
        if (!initialData) setHours(""); // Reset only if adding new
    };

    const handleDelete = async () => {
        if (initialData && confirm("Are you sure you want to delete this entry?")) {
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className={labelClasses}>
                            Name
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={setName} value={name}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select kaitiaki" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availablePeople.map(p => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="site" className={labelClasses}>
                            Site
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={setSite} value={site}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select site" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availableSites.map(s => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="species" className={labelClasses}>
                            Species
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={setTargetSpecies} value={targetSpecies}>
                                <SelectTrigger className={selectTriggerClasses}>
                                    <SelectValue placeholder="Select species" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-2 border-[#8D6E63]">
                                    {availableSpecies.map(s => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hours" className={labelClasses}>
                            Hours
                        </Label>
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
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="bg-red-700 hover:bg-red-800 text-white font-bold px-4"
                        >
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
