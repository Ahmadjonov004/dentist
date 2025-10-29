"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Gift, History, CreditCard, Camera, Sparkles, Calendar, Phone } from "lucide-react"
import { getIcon } from "../utils/icons"
import type { Story as StoryType, BeforeAfterImage, Achievement } from "../types"

interface HomeProps {
  stories: StoryType[]
  beforeAfterImages: BeforeAfterImage[]
  achievements: Achievement[]
  onStoryClick: (index: number) => void
  onBooking: () => void
  onCall: () => void
}

export default function Home({ stories, beforeAfterImages, achievements, onStoryClick, onBooking, onCall }: HomeProps) {
  const [selectedBeforeAfter, setSelectedBeforeAfter] = useState(0)

  return (
    <div className="space-y-4">
      {/* Stories Section */}
      <div className="px-4 pt-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map((story, index) => (
            <div key={story.id} className="flex flex-col items-center gap-2 min-w-[80px]">
              <button
                onClick={() => onStoryClick(index)}
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${story.gradient} p-0.5 ${
                  story.viewed ? "opacity-60" : ""
                } active:scale-95 transition-transform`}
              >
                <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.username} />
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-100 to-cyan-100">
                        {story.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </button>
              <span className="text-sm text-gray-600 font-medium truncate max-w-[80px]">{story.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="mx-4">
        <Card className="border border-gray-200 rounded-3xl bg-white">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 border-2 border-gray-200">
                  <AvatarImage src="/profile.png" alt="Dr. Kamronbek" />
                  <AvatarFallback className="text-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-700">
                    DK
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dr.Ravshanbek</h1>
                <p className="text-sm text-blue-600 font-medium mb-2">Stomatolog mutaxassis</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  5 yildan ortiq tajriba bilan yuqori sifatli tish parvarishi 🦷
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-blue-50 text-blue-700 border border-blue-200 font-normal">5+ yil tajriba</Badge>
                <Badge className="bg-cyan-50 text-cyan-700 border border-cyan-200 font-normal">1000+ bemor</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="border border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-semibold text-blue-700">5+</div>
              <div className="text-xs text-blue-600">Yil</div>
            </CardContent>
          </Card>
          <Card className="border border-cyan-200 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-semibold text-cyan-700">1000+</div>
              <div className="text-xs text-cyan-600">Bemor</div>
            </CardContent>
          </Card>
          <Card className="border border-teal-200 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100">
            <CardContent className="p-4 text-center">
              <div className="text-xl font-semibold text-teal-700">4.9</div>
              <div className="text-xs text-teal-600">Baho</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modern App Features */}
      <div className="px-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Xususiyatlar</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card className="border border-blue-200 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4 text-center">
              <Bell className="w-7 h-7 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Eslatmalar</div>
              <div className="text-xs text-gray-600">Qabul vaqti</div>
            </CardContent>
          </Card>
          <Card className="border border-cyan-200 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50">
            <CardContent className="p-4 text-center">
              <Gift className="w-7 h-7 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Bonuslar</div>
              <div className="text-xs text-gray-600">Chegirmalar</div>
            </CardContent>
          </Card>
          <Card className="border border-teal-200 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50">
            <CardContent className="p-4 text-center">
              <History className="w-7 h-7 text-teal-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Tarix</div>
              <div className="text-xs text-gray-600">Qabullar</div>
            </CardContent>
          </Card>
          <Card className="border border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-7 h-7 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">To'lov</div>
              <div className="text-xs text-gray-600">Onlayn</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900">Yutuqlar</h3>
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <Card key={index} className="border border-gray-200 rounded-2xl bg-white">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 rounded-xl flex items-center justify-center">
                    <div className="text-blue-600">{getIcon(achievement.icon, "w-5 h-5")}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-600">{achievement.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Before/After Gallery */}
      <div className="px-4 space-y-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Oldin va Keyin</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {beforeAfterImages.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedBeforeAfter(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                selectedBeforeAfter === index
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <Card className="border border-gray-200 rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-2">
              <div className="relative">
                <img
                  src={beforeAfterImages[selectedBeforeAfter].before || "/placeholder.svg"}
                  alt="Oldin"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  OLDIN
                </div>
              </div>
              <div className="relative border-l border-gray-200">
                <img
                  src={beforeAfterImages[selectedBeforeAfter].after || "/placeholder.svg"}
                  alt="Keyin"
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  KEYIN
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-1">{beforeAfterImages[selectedBeforeAfter].title}</h4>
              <p className="text-sm text-gray-600">{beforeAfterImages[selectedBeforeAfter].description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <div className="px-4 pb-6">
        <Card className="border border-blue-200 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white overflow-hidden">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">Qabulga yoziling!</h3>
            <p className="text-sm mb-4 opacity-90">Eng yaxshi tabassumingizga birinchi qadam</p>
            <div className="space-y-2">
              <Button
                onClick={onBooking}
                className="w-full bg-white/90 text-blue-700 hover:bg-white rounded-xl font-medium border-0 active:scale-95 transition-transform"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Hozir yozilish
              </Button>
              <Button
                onClick={onCall}
                variant="outline"
                className="w-full border border-white/50 text-white hover:bg-white/10 rounded-xl bg-transparent active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4 mr-2" />
                +998 90 366 09 08
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
