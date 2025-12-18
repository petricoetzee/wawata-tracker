"use client";
import { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEntries, LogEntry } from "@/lib/data";
import EntryForm from "./EntryForm";
import { cn } from "@/lib/utils";

export default function CalendarView({ refreshTrigger }: { refreshTrigger: number }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<"weekly" | "monthly">("monthly");
    const [isEntryOpen, setIsEntryOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [editingEntry, setEditingEntry] = useState<LogEntry | null>(null);

    // Internal refresh for immediate UI update after save, parent refreshTrigger handles global updates (like settings)
    const [internalRefresh, setInternalRefresh] = useState(0);

    const entries = getEntries();

    const days = view === "weekly"
        ? eachDayOfInterval({ start: startOfWeek(currentDate), end: endOfWeek(currentDate) })
        : eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        if (view === "weekly") newDate.setDate(newDate.getDate() - 7);
        else newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        if (view === "weekly") newDate.setDate(newDate.getDate() + 7);
        else newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const openNewEntry = (date: Date) => {
        setEditingEntry(null);
        setSelectedDate(date);
        setIsEntryOpen(true);
    };

    const openEditEntry = (entry: LogEntry, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingEntry(entry);
        setSelectedDate(new Date(entry.date)); // Keep date context
        setIsEntryOpen(true);
    };

    const DayCell = ({ date }: { date: Date }) => {
        const dayEntries = entries.filter(e => isSameDay(new Date(e.date), date));
        const totalHours = dayEntries.reduce((acc, curr) => acc + curr.hours, 0);

        return (
            <div
                className="min-h-[140px] bg-white border border-stone-300 rounded-lg p-3 flex flex-col relative group hover:border-[#1A3C34] hover:shadow-lg transition-all duration-200 shadow-md cursor-pointer"
                onClick={() => openNewEntry(date)}
            >
                <div className="flex justify-between items-start mb-2">
                    <span className={cn("text-lg font-bold font-serif", isSameDay(date, new Date()) ? "text-[#1A3C34] underline decoration-[#8D6E63] decoration-2" : "text-stone-500")}>
                        {format(date, "d")}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1A3C34]/10 hover:bg-[#1A3C34] hover:text-[#F5F5DC] rounded-full"
                        onClick={(e) => { e.stopPropagation(); openNewEntry(date); }}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[90px] pr-1">
                    {dayEntries.map(entry => (
                        <div
                            key={entry.id}
                            onClick={(e) => openEditEntry(entry, e)}
                            className="text-xs bg-[#F5F5DC] p-1.5 rounded border border-[#8D6E63]/30 text-[#1A3C34] font-medium truncate shadow-sm hover:bg-[#1A3C34] hover:text-[#F5F5DC] cursor-pointer transition-colors"
                        >
                            <span className="font-bold">{entry.hours}h</span> {entry.targetSpecies}
                        </div>
                    ))}
                </div>
                {totalHours > 0 && (
                    <div className="mt-2 text-xs font-bold text-center text-[#F5F5DC] bg-[#8D6E63] rounded py-0.5 shadow-sm">
                        {totalHours}h Total
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 pb-6 bg-[#1A3C34]/5 rounded-t-xl border border-stone-200 border-b-0 p-6">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" size="icon" onClick={handlePrev} className="bg-white border-stone-300 hover:bg-[#F5F5DC]"><ChevronLeft className="h-4 w-4" /></Button>
                    <CardTitle className="text-2xl font-serif text-[#1A3C34] min-w-[200px] text-center font-bold">
                        {format(currentDate, "MMMM yyyy")}
                    </CardTitle>
                    <Button variant="outline" size="icon" onClick={handleNext} className="bg-white border-stone-300 hover:bg-[#F5F5DC]"><ChevronRight className="h-4 w-4" /></Button>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-stone-300 shadow-sm">
                    <Button
                        variant="ghost"
                        onClick={() => setView("weekly")}
                        className={cn("rounded-md px-6 font-bold transition-all", view === "weekly" ? "bg-[#1A3C34] text-[#F5F5DC] shadow-sm" : "text-[#1A3C34] hover:bg-[#F5F5DC]")}
                    >
                        Weekly
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => setView("monthly")}
                        className={cn("rounded-md px-6 font-bold transition-all", view === "monthly" ? "bg-[#1A3C34] text-[#F5F5DC] shadow-sm" : "text-[#1A3C34] hover:bg-[#F5F5DC]")}
                    >
                        Monthly
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="bg-white/50 border border-stone-200 rounded-b-xl p-6 shadow-inset">
                <div className={`grid gap-4 ${view === "monthly" ? "grid-cols-2 md:grid-cols-7" : "grid-cols-2 md:grid-cols-7"}`}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-center text-sm font-bold text-[#8D6E63] uppercase tracking-wider mb-2">{day}</div>
                    ))}
                    {days.map(day => (
                        <DayCell key={day.toISOString()} date={day} />
                    ))}
                </div>
            </CardContent>

            <EntryForm
                open={isEntryOpen}
                onOpenChange={setIsEntryOpen}
                defaultDate={selectedDate}
                initialData={editingEntry}
                onSave={() => setInternalRefresh(prev => prev + 1)}
                refreshTrigger={refreshTrigger}
            />
        </Card>
    );
}
