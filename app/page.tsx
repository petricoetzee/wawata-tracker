"use client";
import { useState, useEffect } from "react";
import CalendarView from "@/components/CalendarView";
import SettingsDialog from "@/components/SettingsDialog";
import { Settings, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { loadFromStorage } from "@/lib/data";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadFromStorage();
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-[#F5F5DC] p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Block */}
        <header className="bg-[#1A3C34] p-8 rounded-xl shadow-lg border border-[#8D6E63]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5DC] font-serif mb-2 tracking-wide">
                Wawata Weed Management v2
              </h1>
              <p className="text-[#8D6E63] text-lg italic bg-[#F5F5DC]/10 px-3 py-1 rounded inline-block">
                "Kaitiaki of the Land"
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(true)}
              className="bg-[#F5F5DC]/10 border-[#F5F5DC]/30 text-[#F5F5DC] hover:bg-[#F5F5DC] hover:text-[#1A3C34] gap-2"
            >
              <Settings className="h-4 w-4" /> Configure
            </Button>
          </div>
        </header>

        {/* Content Aera */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Calendar Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-[#1A3C34] font-bold border-l-4 border-[#8D6E63] pl-4">
                Journal Calendar
              </h2>
            </div>
            <CalendarView refreshTrigger={refreshTrigger} />
          </div>

          {/* Sidebar / Actions */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-[#1A3C34] font-bold border-l-4 border-[#8D6E63] pl-4">
              Actions
            </h2>

            <Link href="/reports">
              <Card className="bg-white border border-stone-300 cursor-pointer hover:shadow-lg hover:border-[#1A3C34] transition-all group">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-[#1A3C34]/10 rounded-full flex items-center justify-center group-hover:bg-[#1A3C34] transition-colors">
                    <FileText className="h-6 w-6 text-[#1A3C34] group-hover:text-[#F5F5DC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1A3C34] font-serif">View Reports</h3>
                    <p className="text-sm text-stone-500">Analyze hours by species and site</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="bg-[#1A3C34]/5 p-6 rounded-xl border border-[#1A3C34]/10">
              <h3 className="font-bold text-[#1A3C34] mb-2 font-serif">Quick Tips</h3>
              <ul className="text-sm text-stone-600 space-y-2 list-disc pl-4">
                <li>Log hours daily for accuracy.</li>
                <li>Use the settings to manage your volunteer list.</li>
                <li>Check reports weekly to track eradication progress.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onUpdate={handleDataUpdate}
      />
    </main>
  );
}
