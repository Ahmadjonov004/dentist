// pages/api/booking.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    console.log('⏱️ Vaqt:', new Date().toLocaleString('uz-UZ'));

    // Hozircha faqat ma'lumotlarni konsolga chiqaramiz
    // Bu test muvaffaqiyatli bo'lsa, keyin Telegramni qo'shamiz

    // 2 soniya kutib turamiz (simulyatsiya)
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({ 
      success: true, 
      message: 'Qabul muvaffaqiyatli saqlandi! Tez orada siz bilan bog\'lanamiz.' 
    });

  } catch (error) {
    console.error('❌ API xatosi:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server xatosi. Iltimos, qaytadan urinib ko\'ring.' 
    });
  }
}