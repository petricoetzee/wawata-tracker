"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { getSites, addSite, deleteSite, getSpecies, addSpecies, deleteSpecies, getPeople, addPerson, deletePerson } from "@/lib/data";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: () => void;
}

// Sub-component defined outside to prevent re-mounting on parent state changes
const ListSection = ({ title, items, newItemValue, onNewItemChange, onAdd, onDelete, placeholder }: any) => (
    <section className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-[#1A3C34]">{title}</h3>
        <div className="flex gap-2">
            <Input
                value={newItemValue}
                onChange={(e) => onNewItemChange(e.target.value)}
                placeholder={placeholder}
                className="bg-white border-2 border-[#8D6E63] text-[#1A3C34]"
            />
            <Button onClick={onAdd} className="bg-[#1A3C34] text-[#F5F5DC] hover:bg-[#1A3C34]/90">
                <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
        </div>
        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
            {items.map((item: string) => (
                <div key={item} className="flex items-center justify-between bg-white/50 p-2 rounded border border-stone-300">
                    <span className="font-medium text-[#1A3C34]">{item}</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    </section>
);

export default function SettingsDialog({ open, onOpenChange, onUpdate }: SettingsDialogProps) {
    // Initialize with empty arrays to prefer hydration from source of truth
    const [sites, setSites] = useState<string[]>([]);
    const [species, setSpecies] = useState<string[]>([]);
    const [people, setPeople] = useState<string[]>([]);

    const [newSite, setNewSite] = useState("");
    const [newSpecies, setNewSpecies] = useState("");
    const [newPerson, setNewPerson] = useState("");

    // Sync with data source when opened
    useEffect(() => {
        if (open) {
            setSites(getSites());
            setSpecies(getSpecies());
            setPeople(getPeople());
        }
    }, [open]);

    // Re-sync on open - kept for prop compatibility but logic moved to useEffect
    const handleOpenChange = (isOpen: boolean) => {
        onOpenChange(isOpen);
    };

    const handleAddSite = async () => {
        if (newSite.trim()) {
            await addSite(newSite.trim());
            setSites(getSites());
            setNewSite("");
            onUpdate();
        }
    };

    const handleDeleteSite = async (site: string) => {
        await deleteSite(site);
        setSites(getSites());
        onUpdate();
    };

    const handleAddSpecies = async () => {
        if (newSpecies.trim()) {
            await addSpecies(newSpecies.trim());
            setSpecies(getSpecies());
            setNewSpecies("");
            onUpdate();
        }
    };

    const handleDeleteSpecies = async (spec: string) => {
        await deleteSpecies(spec);
        setSpecies(getSpecies());
        onUpdate();
    };

    const handleAddPerson = async () => {
        if (newPerson.trim()) {
            await addPerson(newPerson.trim());
            setPeople(getPeople());
            setNewPerson("");
            onUpdate();
        }
    };

    const handleDeletePerson = async (person: string) => {
        await deletePerson(person);
        setPeople(getPeople());
        onUpdate();
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="bg-[#F5F5DC] border-[#8D6E63] border-2 shadow-xl sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-[#1A3C34] font-serif text-2xl font-bold border-b border-[#8D6E63]/30 pb-2">
                        Configuration
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 py-4">
                    <ListSection
                        title="Manage Team Members"
                        items={people}
                        newItemValue={newPerson}
                        onNewItemChange={setNewPerson}
                        onAdd={handleAddPerson}
                        onDelete={handleDeletePerson}
                        placeholder="New Team Member Name"
                    />

                    <ListSection
                        title="Manage Sites"
                        items={sites}
                        newItemValue={newSite}
                        onNewItemChange={setNewSite}
                        onAdd={handleAddSite}
                        onDelete={handleDeleteSite}
                        placeholder="New Site Name"
                    />

                    <ListSection
                        title="Manage Species"
                        items={species}
                        newItemValue={newSpecies}
                        onNewItemChange={setNewSpecies}
                        onAdd={handleAddSpecies}
                        onDelete={handleDeleteSpecies}
                        placeholder="New Species Name"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
