// utils/telegram.ts
export async function sendToTelegram(data: {
  fullName: string;
  phoneNumber: string;
  date: string;
  time: string;
}): Promise<boolean> {
  try {
    const message = `🎯 *YANGI QABUL* \n\n👤 *Ism:* ${data.fullName}\n📞 *Telefon:* ${data.phoneNumber}\n📅 *Sana:* ${data.date}\n⏰ *Vaqt:* ${data.time}\n\n⏱️ *So'rov vaqti:* ${new Date().toLocaleString('uz-UZ')}`;

    const response = await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error('Telegram API error');
    }

    return true;
  } catch (error) {
    console.error('Telegramga jo\'natishda xatolik:', error);
    return false;
  }
}