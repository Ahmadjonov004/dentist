"use client"

import { useState } from "react"
import Menu from "../components/Menu"
import Home from "../components/Home"
import Story from "../components/Story"
import About from "../components/About"
import Services from "../components/Services"
import Contact from "../components/Contact"
import { stories, services, beforeAfterImages, achievements } from "@/data/mockData"
import type { Service, CalendarDay } from "@/types"

export default function DentistWebsite() {
  const [activeTab, setActiveTab] = useState("home")
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [currentStory, setCurrentStory] = useState(0)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showServiceDrawer, setShowServiceDrawer] = useState(false)
  const [selectedDate, setSelectedDate] = useState<CalendarDay | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Story handlers
  const openStory = (storyIndex: number) => {
    setCurrentStory(storyIndex)
    setShowStoryModal(true)
  }

  const closeStory = () => {
    setShowStoryModal(false)
  }

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1)
    } else {
      closeStory()
    }
  }

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1)
    }
  }

  // Service handlers
  const openServiceDrawer = (service: Service) => {
    setSelectedService(service)
    setShowServiceDrawer(true)
  }

  const closeServiceDrawer = () => {
    setShowServiceDrawer(false)
    setSelectedService(null)
  }

  // Contact handlers
  const handleCall = () => {
    window.location.href = "tel:+998903660908"
  }

  const handleWhatsApp = () => {
    window.open("https://t.me/Doctor_yoqubov", "_blank")
  }

  const handleEmail = () => {
    // window.location.href = "mailto:dr.kamronbek@dental.uz"
    window.location.href = "mailto:ahmadjonovasilbek624@gmail.com"
  }

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      alert(`Qabul ${selectedDate.day}-dekabr ${selectedTime} ga belgilandi!`)
    } else {
      alert("Iltimos, sana va vaqtni tanlang!")
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            stories={stories}
            beforeAfterImages={beforeAfterImages}
            achievements={achievements}
            onStoryClick={openStory}
            onBooking={handleBooking}
            onCall={handleCall}
          />
        )
      case "about":
        return <About />
      case "services":
        return (
          <Services
            services={services}
            selectedService={selectedService}
            showServiceDrawer={showServiceDrawer}
            onServiceClick={openServiceDrawer}
            onCloseDrawer={closeServiceDrawer}
            onBooking={handleBooking}
            onCall={handleCall}
          />
        )
      case "contact":
        return (
          <Contact
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            onBooking={handleBooking}
            onCall={handleCall}
            onEmail={handleEmail}
            onWhatsApp={handleWhatsApp}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative">
        {/* Story Modal */}
        <Story
          stories={stories}
          showStoryModal={showStoryModal}
          currentStory={currentStory}
          onClose={closeStory}
          onNext={nextStory}
          onPrev={prevStory}
        />

        {/* Main Content */}
        <main className="pb-24">{renderContent()}</main>

        {/* Navigation Menu */}
        <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}
