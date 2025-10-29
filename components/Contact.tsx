"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { CalendarDay } from "../types";
import { generateCalendarDays } from "../utils/calendar";
import { timeSlots } from "../data/mockData";

interface ContactProps {
  selectedDate: CalendarDay | null;
  selectedTime: string | null;
  onDateSelect: (date: CalendarDay) => void;
  onTimeSelect: (time: string) => void;
  onBooking: () => void;
  onCall: () => void;
  onEmail: () => void;
  onWhatsApp: () => void;
}

export default function Contact({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBooking,
  onCall,
  onEmail,
  onWhatsApp,
}: ContactProps) {
  // Hozirgi sana asosida boshlang'ich oy/yil
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [days, setDays] = useState<(CalendarDay | null)[]>([]);

  useEffect(() => {
    setDays(generateCalendarDays(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Tanlangan sana highlightni to'g'ri solishtirish uchun helper
  const isSameDate = (a?: CalendarDay | null, b?: CalendarDay | null) => {
    if (!a || !b) return false;
    return (
      a.date.getFullYear() === b.date.getFullYear() &&
      a.date.getMonth() === b.date.getMonth() &&
      a.date.getDate() === b.date.getDate()
    );
  };

  return (
    <div className="px-4 space-y-4 pb-6 pt-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Bog'lanish</h2>
        <p className="text-sm text-gray-600 mt-1">Qabulga yozilish uchun</p>
      </div>

      {/* Calendar */}
      <Card className="border border-blue-200 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarIcon className="w-4 h-4" />
            Qabul kalendari - {months[currentMonth]} {currentYear}
          </CardTitle>

          <div className="flex items-center gap-2">
            <button
              aria-label="Oldingi oy"
              onClick={goToPrevMonth}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              aria-label="Keyingi oy"
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((w) => (
              <div
                key={w}
                className="text-center text-xs font-semibold text-gray-500 py-2"
                aria-hidden
              >
                {w}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map((day, idx) => {
              // Agar bo'sh hujayra bo'lsa, layoutni saqlash uchun shaffof element ko'rsatamiz
              if (!day) {
                return <div key={idx} className="aspect-square" />;
              }

              const disabled = day.isPast || day.isWeekend || !day.isAvailable;
              const selected = isSameDate(selectedDate, day);

              return (
                <button
                  key={idx}
                  onClick={() => !disabled && onDateSelect(day)}
                  disabled={disabled}
                  aria-label={`Sana ${day.date.toDateString()}`}
                  className={`aspect-square text-xs rounded-lg transition-all flex items-center justify-center focus:outline-none
                    ${disabled ? "text-gray-300 cursor-not-allowed bg-transparent" : "text-gray-700 hover:bg-blue-50"}
                    ${day.isToday ? "bg-blue-100 font-semibold" : ""}
                    ${selected ? "bg-blue-500 text-white" : ""}
                    ${day.isAvailable ? "border border-green-200" : ""}`}
                >
                  {day.day}
                </button>
              );
            })}
          </div>

          {/* Time slots (faqat tanlangan kun bo'lsa) */}
          {selectedDate && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-sm">Mavjud vaqtlar:</h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all
                      ${selectedTime === time ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tanlangan sana/vaqt */}
          {selectedDate && selectedTime && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Tanlangan vaqt:</strong>{" "}
                {selectedDate.date.getDate()} {months[selectedDate.date.getMonth()]} {selectedDate.date.getFullYear()}, {selectedTime}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 border-b border-teal-200 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="w-4 h-4" />
            Manzil
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="text-gray-700 text-sm font-medium">Amir Temur 24</p>
            <p className="text-gray-600 text-sm">Qo'qon shahar, O'zbekiston</p>
          </div>

          <a
            href="https://www.google.com/maps/place/Denta+Med+A.I.N+Stomatologiya+Qo'qon/@40.5235162,70.9342314,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
          >
            Xaritada ko‘rish
          </a>
        </CardContent>
      </Card>

      {/* Ish vaqti */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 border-b border-indigo-200 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" />
            Ish vaqti
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-600">Dushanba - Shanba</span>
            <span className="font-medium">9:00 - 18:00</span>
          </div>
        </CardContent>
      </Card>

      {/* Aloqa tugmalari */}
      <div className="space-y-3">
        <Button
          onClick={onBooking}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl h-12 border-0 active:scale-95 transition-transform"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Qabulga yozilish
        </Button>

        <Button
          onClick={onCall}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl h-12 border-0 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 mr-2" />
          +998 90 366 09 08
        </Button>

        <Button
          onClick={onEmail}
          variant="outline"
          className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl h-12 bg-white active:scale-95 transition-transform"
        >
          <Mail className="w-4 h-4 mr-2" />
          ahmadjonovasilbek624@gmail.com
        </Button>

        <Button
          onClick={onWhatsApp}
          variant="outline"
          className="w-full border border-green-200 text-green-600 hover:bg-green-50 rounded-xl h-12 bg-white active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Telegram
        </Button>
      </div>
    </div>
  );
}
