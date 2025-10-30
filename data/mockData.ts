import type { Story, Service, BeforeAfterImage, Achievement } from "../types"

export const stories: Story[] = [
  {
    id: 1,
    username: "Implant",
    avatar: "/implant_profile.jpg",
    gradient: "from-blue-400 to-cyan-400",
    viewed: false,
    content: [
      {
        type: "image",
        url: "/coming_soon.jpg",
        text: "Implant qo'yish jarayoni",
        duration: 5000,
      },
    ],
  },
  {
    id: 2,
    username: "Tozalash",
    avatar: "/tozalsh_profile.jpg",
    gradient: "from-cyan-400 to-teal-400",
    viewed: false,
    content: [
      {
        type: "image",
        url: "/coming_soon.jpg",
        text: "Professional tish tozalash",
        duration: 5000,
      },
    ],
  },
  {
    id: 3,
    username: "Chegirmalar",
    avatar: "/discount.jpg",
    gradient: "from-teal-400 to-blue-400",
    viewed: true,
    content: [
      {
        type: "image",
        url: "/coming_soon.jpg",
        text: "50% chegirma barcha xizmatlarga!",
        duration: 5000,
      },
    ],
  },
  {
    id: 4,
    username: "Oqartirish",
    avatar: "/oqartirish.jpg",
    gradient: "from-indigo-400 to-blue-400",
    viewed: false,
    content: [
      {
        type: "image",
        url: "/coming_soon.jpg",
        text: "Tishlarni oqartirish natijasi",
        duration: 5000,
      },
    ],
  },
  {
    id: 5,
    username: "Bolalar",
    avatar: "/bolalar.jpg",
    gradient: "from-emerald-400 to-teal-400",
    viewed: false,
    content: [
      {
        type: "image",
        url: "/coming_soon.jpg",
        text: "Bolalar uchun maxsus parvarish",
        duration: 5000,
      },
    ],
  },
]

export const services: Service[] = [
  {
    id: 1,
    icon: "Smile",
    title: "Umumiy stomatologiya",
    shortDesc: "Asosiy tish parvarishi",
    price: "150,000 so'm",
    duration: "45 daqiqa",
    description:
      "To'liq tish parvarishi, tozalash, plomba qo'yish va profilaktik davolash. Muntazam tekshiruvlar orqali tish kasalliklarining oldini olish.",
    includes: ["Tish tekshiruvi", "Professional tozalash", "Plomba qo'yish", "Maslahat berish"],
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 2,
    icon: "Star",
    title: "Kosmetik stomatologiya",
    shortDesc: "Chiroyli tabassum",
    price: "300,000 so'm",
    duration: "60 daqiqa",
    description:
      "Tishlarni oqartirish, viner qo'yish va tabassum makeover xizmatlari. Tabassumingizni yanada chiroyli qilish uchun zamonaviy usullar.",
    includes: ["Tishlarni oqartirish", "Viner qo'yish", "Tabassum dizayni", "Rang tanlash"],
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 3,
    icon: "Shield",
    title: "Og'iz jarrohlik",
    shortDesc: "Jarrohlik amaliyotlari",
    price: "200,000 so'm",
    duration: "30 daqiqa",
    description:
      "Tish chiqarish, aql tishlari olib tashlash va kichik jarrohlik amaliyotlari. Og'riqsiz va xavfsiz jarrohlik.",
    includes: ["Tish chiqarish", "Aql tishlari", "Kichik jarrohlik", "Og'riqsizlashtirish"],
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 4,
    icon: "Heart",
    title: "Bolalar stomatologiyasi",
    shortDesc: "Bolalar uchun",
    price: "120,000 so'm",
    duration: "30 daqiqa",
    description:
      "Bolalar uchun maxsus tish parvarishi qulay va do'stona muhitda. Bolalarni qo'rqitmasdan davolash.",
    includes: ["Bolalar tekshiruvi", "Fluorlash", "Sealant qo'yish", "Og'iz gigienasi o'rgatish"],
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 5,
    icon: "Zap",
    title: "Implant qo'yish",
    shortDesc: "Zamonaviy implantlar",
    price: "800,000 so'm",
    duration: "90 daqiqa",
    description:
      "Yo'qolgan tishlarni qayta tiklash uchun zamonaviy implant texnologiyasi. Uzoq muddatli va ishonchli yechim.",
    includes: ["3D skanerlash", "Implant qo'yish", "Toj o'rnatish", "Kuzatuv"],
    gradient: "from-gray-700 to-gray-900",
  },
  {
    id: 6,
    icon: "CheckCircle",
    title: "Ortodontiya",
    shortDesc: "Tishlarni to'g'rilash",
    price: "500,000 so'm",
    duration: "45 daqiqa",
    description:
      "Breket tizimi va zamonaviy usullar bilan tishlarni to'g'rilash. Chiroyli va to'g'ri tish qatori.",
    includes: ["Tish tahlili", "Breket o'rnatish", "Muntazam kuzatuv", "Natija kafolati"],
    gradient: "from-gray-700 to-gray-900",
  },
]


export const beforeAfterImages: BeforeAfterImage[] = [
  {
    title: "Oqartirish",
    before: "/oqartirish1.png?height=200&width=200",
    after: "/oqartirish23.png?height=200&width=200",
    description: "Professional oqartirish natijasi - 3 seans",
  },
  {
    title: "Viner",
    before: "/vinir1.png?height=200&width=200",
    after: "/vinir23.png?height=200&width=200",
    description: "Keramik vinerlar bilan yangilash",
  },
  {
    title: "Implant",
    before: "/implant.png?height=200&width=200",
    after: "/implant2.png?height=200&width=200",
    description: "Tishni qayta tiklash",
  },
]

export const achievements: Achievement[] = [
  { icon: "Award", title: "Eng yaxshi shifokor", desc: "2025 yil" },
  { icon: "Users", title: "1000+ mamnun bemor", desc: "Yuqori baho" },
  { icon: "TrendingUp", title: "5 yillik tajriba", desc: "Professional" },
]

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]
