"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
// Import the new Supabase functions
import {
    getSites, saveSite, deleteSite,
    getSpecies, saveSpecies, deleteSpecies,
    getPeople, savePerson, deletePerson
} from "@/lib/data";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: () => void;
}

export default function SettingsDialog({ open, onOpenChange, onUpdate }: SettingsDialogProps) {
    const [activeTab, setActiveTab] = useState("people");

    // Local state for the lists
    const [people, setPeople] = useState<any[]>([]);
    const [sites, setSites] = useState<any[]>([]);
    const [species, setSpecies] = useState<any[]>([]);

    // Inputs
    const [newPerson, setNewPerson] = useState("");
    const [newSite, setNewSite] = useState("");
    const [newSpecies, setNewSpecies] = useState("");

    // Load data when dialog opens
    useEffect(() => {
        if (open) {
            loadAll();
        }
    }, [open]);

    const loadAll = async () => {
        const [p, s, sp] = await Promise.all([getPeople(), getSites(), getSpecies()]);
        setPeople(p);
        setSites(s);
        setSpecies(sp);
    };

    // --- Handlers ---

    const handleAddPerson = async () => {
        if (!newPerson.trim()) return;
        await savePerson(newPerson);
        setNewPerson("");
        loadAll();
        onUpdate();
    };

    const handleDeletePerson = async (id: string) => {
        await deletePerson(id);
        loadAll();
        onUpdate();
    };

    const handleAddSite = async () => {
        if (!newSite.trim()) return;
        await saveSite(newSite);
        setNewSite("");
        loadAll();
        onUpdate();
    };

    const handleDeleteSite = async (id: string) => {
        await deleteSite(id);
        loadAll();
        onUpdate();
    };

    const handleAddSpecies = async () => {
        if (!newSpecies.trim()) return;
        await saveSpecies(newSpecies);
        setNewSpecies("");
        loadAll();
        onUpdate();
    };

    const handleDeleteSpecies = async (id: string) => {
        await deleteSpecies(id);
        loadAll();
        onUpdate();
    };

    // --- Render Helper ---
    const renderList = (items: any[], onDelete: (id: string) => void) => (
        <div className="space-y-2 mt-4 max-h-[200px] overflow-y-auto custom-scrollbar">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded border border-[#8D6E63]/30">
                    <span className="text-[#1A3C34] font-medium">{item.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            {items.length === 0 && <p className="text-sm text-stone-400 italic text-center py-2">No items yet.</p>}
        </div>
    );

    const inputClasses = "bg-white border-[#8D6E63] text-[#1A3C34] placeholder:text-stone-400";
    const buttonClasses = "bg-[#1A3C34] hover:bg-[#1A3C34]/90 text-[#F5F5DC]";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F5F5DC] border-2 border-[#8D6E63] sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-[#1A3C34] font-serif text-2xl">Configuration</DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1A3C34]/10">
                        <TabsTrigger value="people" className="data-[state=active]:bg-[#1A3C34] data-[state=active]:text-[#F5F5DC]">People</TabsTrigger>
                        <TabsTrigger value="sites" className="data-[state=active]:bg-[#1A3C34] data-[state=active]:text-[#F5F5DC]">Sites</TabsTrigger>
                        <TabsTrigger value="species" className="data-[state=active]:bg-[#1A3C34] data-[state=active]:text-[#F5F5DC]">Species</TabsTrigger>
                    </TabsList>

                    {/* PEOPLE TAB */}
                    <TabsContent value="people" className="py-4">
                        <div className="flex gap-2">
                            <Input placeholder="Add new person..." value={newPerson} onChange={(e) => setNewPerson(e.target.value)} className={inputClasses} />
                            <Button onClick={handleAddPerson} className={buttonClasses}><Plus className="h-4 w-4" /></Button>
                        </div>
                        {renderList(people, handleDeletePerson)}
                    </TabsContent>

                    {/* SITES TAB */}
                    <TabsContent value="sites" className="py-4">
                        <div className="flex gap-2">
                            <Input placeholder="Add new site..." value={newSite} onChange={(e) => setNewSite(e.target.value)} className={inputClasses} />
                            <Button onClick={handleAddSite} className={buttonClasses}><Plus className="h-4 w-4" /></Button>
                        </div>
                        {renderList(sites, handleDeleteSite)}
                    </TabsContent>

                    {/* SPECIES TAB */}
                    <TabsContent value="species" className="py-4">
                        <div className="flex gap-2">
                            <Input placeholder="Add new species..." value={newSpecies} onChange={(e) => setNewSpecies(e.target.value)} className={inputClasses} />
                            <Button onClick={handleAddSpecies} className={buttonClasses}><Plus className="h-4 w-4" /></Button>
                        </div>
                        {renderList(species, handleDeleteSpecies)}
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)} variant="outline" className="border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34]/10">
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}