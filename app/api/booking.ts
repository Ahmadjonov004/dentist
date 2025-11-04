// pages/api/booking.ts
import { NextApiRequest, NextApiResponse } from 'next';

async function sendToTelegram(data: {
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Environment variables tekshirish
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram environment variables topilmadi');
      return { 
        success: false, 
        error: 'Telegram sozlamalari topilmadi' 
      };
    }

    const message = `🎯 YANGI QABUL\n\n👤 Ism: ${data.fullName}\n📞 Telefon: ${data.phoneNumber}\n📅 Sana: ${data.date}\n⏰ Vaqt: ${data.time}\n\n⏱️ So'rov vaqti: ${new Date().toLocaleString('uz-UZ')}`;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Telegram API xatosi:', errorData);
      return { 
        success: false, 
        error: `Telegram API xatosi: ${response.status}` 
      };
    }

    console.log('✅ Telegram xabari muvaffaqiyatli jo\'natildi');
    return { success: true };

  } catch (error) {
    console.error('❌ Telegram xatosi:', error);
    return { 
      success: false, 
      error: 'Telegramga ulanishda xatolik' 
    };
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS sozlamalari
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    const { fullName, phoneNumber, date, time } = req.body;

    console.log('🎯 YANGI QABUL SO\'ROVI:');
    console.log('👤 Ism:', fullName);
    console.log('📞 Telefon:', phoneNumber);
    console.log('📅 Sana:', date);
    console.log('⏰ Vaqt:', time);

    // Ma'lumotlarni tekshirish
    if (!fullName || !phoneNumber || !date || !time) {
      return res.status(400).json({ 
        success: false, 
        error: 'Barcha maydonlarni to\'ldiring' 
      });
    }

    // Telegramga jo'natish
    const telegramResult = await sendToTelegram({
      fullName,
      phoneNumber,
      date,
      time,
    });

    if (telegramResult.success) {
      console.log('✅ Ma\'lumotlar muvaffaqiyatli saqlandi va Telegramga jo\'natildi');
      res.status(200).json({ 
        success: true, 
        message: 'Qabul muvaffaqiyatli saqlandi! Tez orada siz bilan bog\'lanamiz.' 
      });
    } else {
      console.log('⚠️ Telegramga jo\'natish muvaffaqiyatsiz:', telegramResult.error);
      // Telegram ishlamasa ham, ma'lumotlar saqlansin
      res.status(200).json({ 
        success: true, 
        message: 'Qabulingiz qabul qilindi! Tez orada aloqaga chiqamiz.',
        warning: 'Telegram xabari jo\'natilmadi'
      });
    }

  } catch (error) {
    console.error('❌ API xatosi:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server xatosi. Iltimos, qaytadan urinib ko\'ring.' 
    });
  }
}