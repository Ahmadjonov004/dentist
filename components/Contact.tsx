"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [days, setDays] = useState<(CalendarDay | null)[]>([]);
  
  // Form state-lari
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  
  // Modal state-lari
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setDays(generateCalendarDays(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  // Modalni 3 soniya ko'rsatish
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const months = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
    "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
  ];

  // O'zbekiston uchun hafta kunlari (Dushanbadan boshlanadi)
  const weekDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

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

  const isSameDate = (a?: CalendarDay | null, b?: CalendarDay | null) => {
    if (!a || !b) return false;
    return (
      a.date.getFullYear() === b.date.getFullYear() &&
      a.date.getMonth() === b.date.getMonth() &&
      a.date.getDate() === b.date.getDate()
    );
  };

  // Qabul tugmasini bosganda tekshirish
  const handleBookingClick = () => {
    if (!fullName.trim()) {
      setModalMessage("Iltimos, ismingizni kiriting!");
      setShowModal(true);
      return;
    }

    if (!phoneNumber.trim()) {
      setModalMessage("Iltimos, telefon raqamingizni kiriting!");
      setShowModal(true);
      return;
    }

    // Telefon raqam formatini tekshirish (ixtiyoriy)
    const phoneRegex = /^\+?998?\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      setModalMessage("Iltimos, to'g'ri telefon raqamini kiriting!");
      setShowModal(true);
      return;
    }

    if (!selectedDate) {
      setModalMessage("Iltimos, qabul kunini tanlang!");
      setShowModal(true);
      return;
    }

    if (!selectedTime) {
      setModalMessage("Iltimos, qabul vaqtini tanlang!");
      setShowModal(true);
      return;
    }

    setError("");
    onBooking();
  };

  return (
    <div className="px-4 space-y-4 pb-6 pt-4 relative">
      {/* Modal/Alert */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Diqqat!</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-lg">!</span>
              </div>
              <p className="text-gray-700 flex-1">{modalMessage}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Avtomatik yopiladi</span>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${dot * 0.5}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Bog'lanish</h2>
        <p className="text-sm text-gray-600 mt-1">Qabulga yozilish uchun</p>
      </div>

      {/* Foydalanuvchi ma'lumotlari */}
      <Card className="border border-blue-200 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-base">
            <Phone className="w-4 h-4" />
            Shaxsiy ma'lumotlar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To'liq ism
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Masalan: Asilbek Ahmadjonov"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon raqami
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+998 90 123 45 67"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-medium mt-1">{error}</p>
          )}
        </CardContent>
      </Card>

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
          {/* Weekdays - O'zbekiston tartibida */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map((day, idx) => {
              if (!day) return <div key={idx} className="aspect-square" />;
              
              const disabled = day.isPast || day.isWeekend || !day.isAvailable;
              const selected = isSameDate(selectedDate, day);
              
              return (
                <button
                  key={idx}
                  onClick={() => !disabled && onDateSelect(day)}
                  disabled={disabled}
                  className={`aspect-square text-xs rounded-lg transition-all flex items-center justify-center ${
                    disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-blue-50"
                  } ${
                    day.isToday ? "bg-blue-100 font-semibold text-blue-700" : ""
                  } ${
                    selected ? "bg-blue-500 text-white" : ""
                  } ${
                    day.isAvailable ? "border border-green-200" : ""
                  }`}
                >
                  {day.day}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 text-sm">
                Mavjud vaqtlar:
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                      selectedTime === time
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Tanlangan vaqt:</strong>{" "}
                {selectedDate.date.getDate()}{" "}
                {months[selectedDate.date.getMonth()]}{" "}
                {selectedDate.date.getFullYear()}, {selectedTime}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Address */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-t-2xl">
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
            href="https://maps.app.goo.gl/sJnMzAc8BdCvvPLP6"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
          >
            Xaritada ko'rish
          </a>
        </CardContent>
      </Card>

      {/* Ish vaqti */}
      <Card className="border border-gray-200 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" />
            Ish vaqti
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between text-sm p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-gray-600">Dushanba - Shanba</span>
            <span className="font-medium">9:00 - 18:00</span>
          </div>
        </CardContent>
      </Card>

      {/* Aloqa tugmalari */}
      <div className="space-y-3">
        <Button
          onClick={handleBookingClick}
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