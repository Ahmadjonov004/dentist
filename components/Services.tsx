"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Calendar, Phone, CheckCircle, Clock } from "lucide-react"
import { getIcon } from "@/utils/icons"
import type { Service } from "@/types"

interface ServicesProps {
  services: Service[]
  selectedService: Service | null
  showServiceDrawer: boolean
  onServiceClick: (service: Service) => void
  onCloseDrawer: () => void
  onBooking: () => void
  onCall: () => void
}

export default function Services({
  services,
  selectedService,
  showServiceDrawer,
  onServiceClick,
  onCloseDrawer,
  onBooking,
  onCall,
}: ServicesProps) {
  return (
    <>
      <div className="px-4 space-y-6 pb-6 pt-4">
        {/* Services Grid */}
        <div className="space-y-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border border-gray-200 rounded-2xl bg-white cursor-pointer"
              onClick={() => onServiceClick(service)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <div className="text-white">{getIcon(service.icon, "w-6 h-6")}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">{service.shortDesc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-600">{service.price}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-400">
                    <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Savollar bormi?</p>
            <Button
              onClick={onCall}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-100 rounded-xl bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Maslahat olish
            </Button>
          </div>
        </div>
      </div>

      {/* Service Drawer */}
      {showServiceDrawer && selectedService && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40 max-w-md mx-auto" onClick={onCloseDrawer}></div>

          {/* Drawer */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-md mx-auto transform transition-transform duration-300 ${
              showServiceDrawer ? "translate-y-0" : "translate-y-full"
            }`}
          >
            {/* Drawer Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${selectedService.gradient} rounded-xl flex items-center justify-center`}
                >
                  <div className="text-white">{getIcon(selectedService.icon, "w-5 h-5")}</div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{selectedService.title}</h2>
                  <p className="text-sm text-gray-500">{selectedService.shortDesc}</p>
                </div>
              </div>
              <button onClick={onCloseDrawer} className="p-2">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Price and Duration */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{selectedService.price}</div>
                    <div className="text-sm text-gray-500">Narx</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{selectedService.duration}</span>
                    </div>
                    <div className="text-sm text-gray-500">Vaqt</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Tavsif</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedService.description}</p>
              </div>

              {/* Service Includes */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Xizmat tarkibi</h3>
                <div className="space-y-2">
                  {selectedService.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button onClick={onBooking} className="w-full bg-blue-600 text-white rounded-xl h-12 font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Qabulga yozilish
                </Button>
                <Button
                  onClick={onCall}
                  variant="outline"
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl h-12 font-medium bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Qo'ng'iroq qilish
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
