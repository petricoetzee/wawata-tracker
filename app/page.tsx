"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getEntries, Entry } from "@/lib/data";

export default function ReportsPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEntries().then(data => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  const totalHours = entries.reduce((sum, e) => sum + Number(e.hours), 0);

  const bySpecies = entries.reduce((acc, e) => {
    const name = e.species_name || "Unknown";
    acc[name] = (acc[name] || 0) + Number(e.hours);
    return acc;
  }, {} as Record<string, number>);

  const bySite = entries.reduce((acc, e) => {
    const name = e.site_name || "Unknown";
    acc[name] = (acc[name] || 0) + Number(e.hours);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-[#F5F5DC] p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-[#1A3C34]/10">
              <ArrowLeft className="h-5 w-5 mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#1A3C34]">Eradication Reports</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#1A3C34] text-[#F5F5DC]">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium opacity-80">Total Hours Logged</CardTitle></CardHeader>
            <CardContent><div className="text-4xl font-bold">{totalHours.toFixed(1)}</div></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Charts omitted for brevity, but data is safe now */}
          <Card>
            <CardHeader><CardTitle className="font-serif text-[#1A3C34]">Hours by Species</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(bySpecies).map(([name, hours]) => (
                <div key={name} className="flex items-center justify-between">
                  <span className="font-medium text-[#1A3C34]">{name}</span>
                  <span className="text-stone-600">{hours.toFixed(1)} h</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}