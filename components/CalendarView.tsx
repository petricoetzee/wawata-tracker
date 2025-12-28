"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from "date-fns";
import { ChevronLeft, ChevronRight, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Entry } from "@/lib/data"; // Import the shared type

interface CalendarViewProps {
    entries: Entry[];
    onEdit: (entry: Entry) => void;
    onDelete: (id: string) => void;
    onAdd: (date: Date) => void;
}

export default function CalendarView({ entries, onEdit, onDelete, onAdd }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const startDayIndex = getDay(firstDayOfMonth);
    const previousMonthDays = Array.from({ length: startDayIndex }).map((_, i) => i);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    // Helper to find entries for a specific day
    const getEntriesForDay = (date: Date) => {
        return entries.filter(entry => {
            // Handle both string dates (YYYY-MM-DD) and Date objects safely
            const entryDate = typeof entry.date === 'string' ? new Date(entry.date) : entry.date;
            // Adjust for timezone offset if needed, or stick to simple string comparison
            const dateString = format(date, 'yyyy-MM-dd');
            return entry.date.toString().startsWith(dateString);
        });
    };

    return (
        <div className="bg-[#F5F5DC] rounded-lg shadow-md border-2 border-[#8D6E63] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#1A3C34] text-[#F5F5DC]">
                <h2 className="text-xl font-serif font-bold">{format(currentDate, "MMMM yyyy")}</h2>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="hover:bg-[#F5F5DC]/20 text-[#F5F5DC]">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="hover:bg-[#F5F5DC]/20 text-[#F5F5DC]">
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-[#1A3C34] bg-[#D2B48C]/30 py-2 border-b-2 border-[#8D6E63]">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 bg-[#F5F5DC]">
                {/* Empty cells for previous month */}
                {previousMonthDays.map((_, i) => (
                    <div key={`empty-${i}`} className="h-32 border-b border-r border-[#8D6E63]/30 bg-stone-100/50" />
                ))}

                {/* Days of the month */}
                {daysInMonth.map((date, i) => {
                    const dayEntries = getEntriesForDay(date);
                    const isToday = isSameDay(date, new Date());

                    return (
                        <div
                            key={i}
                            onClick={() => onAdd(date)}
                            className={`h-32 border-b border-r border-[#8D6E63]/30 p-1 flex flex-col gap-1 transition-colors hover:bg-[#D2B48C]/10 cursor-pointer ${isToday ? "bg-[#D2B48C]/20" : ""}`}
                        >
                            <div className={`text-right text-xs font-bold mb-1 mr-1 ${isToday ? "text-red-600" : "text-[#8D6E63]"}`}>
                                {format(date, "d")}
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                                {dayEntries.map(entry => (
                                    <div
                                        key={entry.id}
                                        className="group relative flex items-center justify-between bg-white border border-[#8D6E63]/50 rounded px-1.5 py-1 shadow-sm text-[10px]"
                                        onClick={(e) => e.stopPropagation()} /* Prevent triggering onAdd when clicking entry */
                                    >
                                        <div className="flex flex-col truncate">
                                            <span className="font-bold text-[#1A3C34] truncate">{entry.species_name}</span>
                                            <span className="text-stone-500 truncate">{entry.site_name}</span>
                                            {/* FIX: Use person_name instead of name */}
                                            <span className="text-stone-400 truncate text-[9px]">{entry.person_name}</span>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="h-3 w-3 text-[#8D6E63]" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => onEdit(entry)}>
                                                    <Edit className="mr-2 h-3 w-3" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => entry.id && onDelete(entry.id)}>
                                                    <Trash2 className="mr-2 h-3 w-3" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
