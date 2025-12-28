"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarView from "@/components/CalendarView";
import SettingsDialog from "@/components/SettingsDialog";
import EntryForm from "@/components/EntryForm";
import { getEntries, deleteEntry, Entry } from "@/lib/data";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  // Initial load
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch (error) {
      console.error("Failed to load entries:", error);
    }
  };

  const handleCreate = () => {
    setEditingEntry(null);
    setIsEntryFormOpen(true);
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
    setIsEntryFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this entry?")) {
      await deleteEntry(id);
      refreshData();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#1A3C34] font-sans">
      {/* Header */}
      <header className="bg-[#1A3C34] text-[#F5F5DC] p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold tracking-wide">Wawata Cloud v2</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="text-[#F5F5DC] hover:bg-[#F5F5DC]/20 hover:text-white transition-colors"
            title="Configuration"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-[#8D6E63]/30 shadow-sm">
          <div className="flex items-center gap-2">
            <Link href="/reports">
              <Button variant="outline" className="border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34]/10 gap-2 font-medium">
                <FileText className="h-4 w-4" /> View Reports
              </Button>
            </Link>
          </div>

          <Button
            onClick={handleCreate}
            className="bg-[#1A3C34] text-[#F5F5DC] hover:bg-[#1A3C34]/90 gap-2 shadow-md w-full sm:w-auto font-bold"
          >
            <Plus className="h-4 w-4" /> Log Entry
          </Button>
        </div>

        {/* Calendar View */}
        <CalendarView
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* Dialogs */}
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onUpdate={refreshData}
      />

      <EntryForm
        open={isEntryFormOpen}
        onOpenChange={setIsEntryFormOpen}
        initialData={editingEntry}
        onSave={refreshData}
      />
    </div>
  );
}