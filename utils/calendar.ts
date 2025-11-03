// utils/calendar.ts
export interface CalendarDay {
  date: Date;
  day: number;
  isToday: boolean;
  isPast: boolean;
  isWeekend: boolean;
  isAvailable: boolean;
}

export function generateCalendarDays(year: number, month: number): (CalendarDay | null)[] {
  const days: (CalendarDay | null)[] = [];
  
  // Oyning birinchi kuni
  const firstDay = new Date(year, month, 1);
  // Oyning oxirgi kuni
  const lastDay = new Date(year, month + 1, 0);
  
  // O'zbekiston uchun: hafta Dushanbadan boshlanadi (1)
  // JavaScript'da: Yakshanba = 0, Dushanba = 1, ..., Shanba = 6
  let firstDayOfWeek = firstDay.getDay();
  // Agar Yakshanba (0) bo'lsa, uni 6 qilamiz (haftaning oxirgi kuni)
  if (firstDayOfWeek === 0) firstDayOfWeek = 6;
  else firstDayOfWeek--; // Boshqa kunlar uchun 1 ta kamaytiramiz
  
  // Oldingi oydan bo'sh katakchalar
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  
  // Joriy oy kunlari
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    
    // O'zbekistonda dam olish kunlari: Yakshanba (0) va shanba (6)
    const isWeekend = dayOfWeek === 0 ;
    
    // Bugungi kunni tekshirish
    const isToday = date.getTime() === today.getTime();
    
    // O'tgan kunlarni tekshirish
    const isPast = date < today;
    
    // Mavjud kunlar (dam olish kunlari va o'tgan kunlar mavjud emas)
    const isAvailable = !isPast && !isWeekend;
    
    days.push({
      date,
      day,
      isToday,
      isPast,
      isWeekend,
      isAvailable,
    });
  }
  
  return days;
}