// utils/calendar.ts
import type { CalendarDay } from "../types";

export const generateCalendarDays = (
  year?: number,
  month?: number
): (CalendarDay | null)[] => {
  const today = new Date();
  const currentYear = typeof year === "number" ? year : today.getFullYear();
  const currentMonth = typeof month === "number" ? month : today.getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();

  // getDay(): 0 - Sunday ... 6 - Saturday
  // Agar haftaning boshini Dushanba qilish kerak bo'lsa, transform qiling. Hozir Du=0 ko'rsatgan holda qoldirdim.
  const startingDayOfWeek = firstDay.getDay(); // 0..6

  const days: (CalendarDay | null)[] = [];

  // Bo'sh hujayralar (oy boshiga qadar)
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Bugungi kunni soat/daqiqa/sekund bo'yicha emas, faqat sana bo'yicha solishtirish uchun midnight yarating
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dateMid = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const isToday =
      dateMid.getFullYear() === todayMid.getFullYear() &&
      dateMid.getMonth() === todayMid.getMonth() &&
      dateMid.getDate() === todayMid.getDate();

    // Kechagi va undan oldingi sanalar true bo'ladi
    const isPast = dateMid < todayMid;

    // Haftaning dam kunlari (yakshanba yoki shanba) ni dam kun deb belgilash uchun:
    const isWeekend = date.getDay() === 6;

    // Bugungi kun ham tanlanadigan bo'lsin: isAvailable -> true agar kelajak yoki bugun bo'lsa va dam kuni bo'lmasa
    const isAvailable = !isPast && !isWeekend;

    days.push({
      day: d,
      date,
      isToday,
      isPast,
      isWeekend,
      isAvailable,
    });
  }

  return days;
};
