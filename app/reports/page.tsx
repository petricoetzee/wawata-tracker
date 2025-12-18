"use client";
import { useState, useEffect } from "react";
import { getEntries, LogEntry, loadFromStorage } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
    const [period, setPeriod] = useState<"week" | "month">("week");
    const [_, setRefresh] = useState(0); // Force re-render after data load

    useEffect(() => {
        loadFromStorage();
        setRefresh(prev => prev + 1);
    }, []);

    const entries = getEntries();
    const now = new Date();

    // Filter entries based on period
    const filteredEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        if (period === "week") {
            return isWithinInterval(entryDate, { start: startOfWeek(now), end: endOfWeek(now) });
        } else {
            return isWithinInterval(entryDate, { start: startOfMonth(now), end: endOfMonth(now) });
        }
    });

    // Helper for aggregations
    const aggregate = (field: keyof LogEntry) => {
        const counts: Record<string, number> = {};
        filteredEntries.forEach(e => {
            const key = String(e[field]);
            counts[key] = (counts[key] || 0) + e.hours;
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]); // Sort Descending
    };

    const speciesData = aggregate("targetSpecies");
    const siteData = aggregate("site");

    const TableSection = ({ title, data, iconColor }: { title: string, data: [string, number][], iconColor: string }) => (
        <div className="bg-white border border-stone-300 rounded-xl shadow-md overflow-hidden">
            <div className="bg-[#1A3C34] p-4 flex items-center gap-2">
                <div className={`w-2 h-6 ${iconColor} rounded-full bg-white`}></div>
                <h2 className="text-[#F5F5DC] font-serif font-bold text-xl">{title}</h2>
            </div>
            <div className="p-6">
                {data.length === 0 ? (
                    <p className="text-stone-500 italic text-center py-4">No data for this period.</p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-[#8D6E63]/20">
                                <th className="pb-2 font-serif text-[#1A3C34] font-bold text-lg">Name</th>
                                <th className="pb-2 font-serif text-[#1A3C34] font-bold text-lg text-right">Total Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(([name, hours]) => (
                                <tr key={name} className="border-b border-stone-100 last:border-0 hover:bg-[#F5F5DC]/20">
                                    <td className="py-3 font-medium text-stone-700">{name}</td>
                                    <td className="py-3 font-bold text-[#8D6E63] text-right">{hours}h</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#F5F5DC] p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Button variant="ghost" className="text-[#1A3C34] hover:bg-[#1A3C34]/10 -ml-4 flex items-center gap-1 font-bold">
                            <ChevronLeft className="h-5 w-5" /> Back to Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-[#1A3C34]">Conservation Reports</h1>
                </div>

                {/* Controls */}
                <div className="flex justify-center bg-white p-1 rounded-lg border border-stone-300 shadow-sm w-fit mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => setPeriod("week")}
                        className={cn("rounded-md px-6 font-bold transition-all", period === "week" ? "bg-[#1A3C34] text-[#F5F5DC] shadow-sm" : "text-[#1A3C34] hover:bg-[#F5F5DC]")}
                    >
                        This Week
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setPeriod("month")}
                        className={cn("rounded-md px-6 font-bold transition-all", period === "month" ? "bg-[#1A3C34] text-[#F5F5DC] shadow-sm" : "text-[#1A3C34] hover:bg-[#F5F5DC]")}
                    >
                        This Month
                    </Button>
                </div>

                {/* Tables Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TableSection title="Hours by Species" data={speciesData} iconColor="text-[#8D6E63]" />
                    <TableSection title="Hours by Site" data={siteData} iconColor="text-[#C4B28C]" />
                </div>

            </div>
        </main>
    );
}
