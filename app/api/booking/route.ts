// app/api/booking/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function sendToTelegram(data: {
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
}): Promise<boolean> {
  try {
    const message = `🎯 *YANGI QABUL* \n\n👤 *Ism:* ${data.fullName}\n📞 *Telefon:* ${data.phoneNumber}\n📅 *Sana:* ${data.date}\n⏰ *Vaqt:* ${data.time}\n\n⏱️ *So'rov vaqti:* ${new Date().toLocaleString('uz-UZ')}`;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram environment variables not set');
      return false;
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram API error:', errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Telegram error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phoneNumber, date, time } = body;

    console.log('Received booking data:', { fullName, phoneNumber, date, time });

    // Ma'lumotlarni tekshirish
    if (!fullName || !phoneNumber || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Barcha maydonlarni to\'ldiring' },
        { status: 400 }
      );
    }

    // Telegramga jo'natish
    const telegramSuccess = await sendToTelegram({
      fullName,
      phoneNumber,
      date,
      time,
    });

    if (telegramSuccess) {
      console.log('Telegram message sent successfully');
      return NextResponse.json({ 
        success: true, 
        message: 'Qabul muvaffaqiyatli saqlandi' 
      });
    } else {
      console.error('Failed to send Telegram message');
      return NextResponse.json(
        { success: false, error: 'Telegramga xabar jo\'natishda xatolik' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API xatosi:', error);
    return NextResponse.json(
      { success: false, error: 'Server xatosi' },
      { status: 500 }
    );
  }
}

// Boshqa methodlar uchun 405 qaytarish
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method Not Allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method Not Allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method Not Allowed' },
    { status: 405 }
  );
}