"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"

export default function About() {
  return (
    <div className="px-4 space-y-4 pb-6 pt-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Dr. Ravshanbek haqida</h2>
      </div>

      <Card className="border border-gray-200 rounded-2xl">
        <CardContent className="p-6">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Dr.Ravshanbek - 5 yildan ortiq tajribaga ega yuqori malakali stomatolog. Zamonaviy texnologiyalar bilan
            an'anaviy davolash usullarini birlashtiradi.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Muloyim yondashuv va bemorlar qulayligiga e'tibor berish uni oilalar uchun ishonchli tanlovga aylantiradi.
          </p>
        </CardContent>
      </Card>

      <Card className="border border-blue-200 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 border-b border-blue-200">
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="w-4 h-4" />
            Ta'lim va sertifikatlar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="border-l-2 border-blue-200 pl-3">
            <div className="font-medium text-gray-900 text-sm">Stomatologiya doktori (DDS)</div>
            <div className="text-xs text-gray-600">Stomatologiya tibbiyot universiteti</div>
          </div>
          <div className="border-l-2 border-cyan-200 pl-3">
            <div className="font-medium text-gray-900 text-sm">Sertifikatlangan stomatolog</div>
            <div className="text-xs text-gray-600">Osiyo Stomatologlar Assotsiatsiyasi</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
