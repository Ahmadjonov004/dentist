// hooks/useBooking.ts
import { useState } from 'react';
import type { CalendarDay } from '../types';

interface BookingData {
  fullName: string;
  phoneNumber: string;
  selectedDate: CalendarDay;
  selectedTime: string;
}

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // hooks/useBooking.ts yoki Contact komponenti ichida
const submitBooking = async (data: {
  fullName: string;
  phoneNumber: string;
  selectedDate: CalendarDay;
  selectedTime: string;
}): Promise<boolean> => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    console.log('📨 Jo\'natilayotgan ma\'lumotlar:', data);

    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        date: data.selectedDate.date.toLocaleDateString('uz-UZ'),
        time: data.selectedTime,
      }),
    });

    console.log('📡 Server javobi:', response.status, response.statusText);

    const result = await response.json();
    console.log('📄 Response data:', result);

    if (!response.ok) {
      // Agar serverda xatolik bo'lsa, lekin ma'lumotlar saqlangan bo'lsa
      if (result.success) {
        setSuccess(true);
        return true;
      }
      throw new Error(result.error || `Server xatosi: ${response.status}`);
    }

    
    setSuccess(true);
    return true;

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Noma\'lum xatolik';
    setError(errorMessage);
    console.error('❌ Booking error:', err);
    return false;
  } finally {
    setLoading(false);
  }
};

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submitBooking, loading, error, success, reset };
}