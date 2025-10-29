"use client"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, ChevronLeft, ChevronRight, Send } from "lucide-react"
import type { Story as StoryType } from "../types"

interface StoryProps {
  stories: StoryType[]
  showStoryModal: boolean
  currentStory: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Story({ stories, showStoryModal, currentStory, onClose, onNext, onPrev }: StoryProps) {
  const [progress, setProgress] = useState(0)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const storyDuration = 5000 // 5 seconds per story content

  useEffect(() => {
    if (!showStoryModal) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentContentIndex < stories[currentStory].content.length - 1) {
            setCurrentContentIndex((prev) => prev + 1)
            return 0
          } else {
            onNext()
            setCurrentContentIndex(0)
            return 0
          }
        }
        return prev + 100 / (storyDuration / 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [showStoryModal, currentStory, currentContentIndex, onNext, stories])

  if (!showStoryModal) return null

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center max-w-md mx-auto font-sans">
      <div className="relative w-full h-full">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {stories[currentStory]?.content.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: index < currentContentIndex ? "100%" : index === currentContentIndex ? `${progress}%` : "0%",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Header with Avatar and Username */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10 mt-4">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-white shadow-md">
              <AvatarImage src={stories[currentStory]?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-sm bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                {stories[currentStory]?.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm drop-shadow-md">
                {stories[currentStory]?.username}
              </span>
              <span className="text-white/70 text-xs drop-shadow-md">
                {new Date(stories[currentStory]?.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 drop-shadow-md" />
          </button>
        </div>

        {/* Story Content */}
        <div className="w-full h-full relative">
          <img
            src={stories[currentStory]?.content[currentContentIndex]?.url || "/placeholder.svg"}
            alt="Story"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
          <div className="absolute bottom-20 left-4 right-4">
            <p className="text-white text-lg font-medium drop-shadow-lg max-w-[80%] animate-fade-in">
              {stories[currentStory]?.content[currentContentIndex]?.text}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={onPrev}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-colors ${
            currentStory === 0 && currentContentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-white/10"
          }`}
          disabled={currentStory === 0 && currentContentIndex === 0}
        >
          <ChevronLeft className="w-8 h-8 drop-shadow-md" />
        </button>
        <button
          onClick={() => {
            if (currentContentIndex < stories[currentStory].content.length - 1) {
              setCurrentContentIndex((prev) => prev + 1)
              setProgress(0)
            } else {
              onNext()
              setCurrentContentIndex(0)
              setProgress(0)
            }
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-8 h-8 drop-shadow-md" />
        </button>

        {/* Input and Send Button */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Reply to story..."
            className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            onClick={handleInputClick}
          />
          <button className="bg-white/20 border border-white/20 rounded-full p-2 hover:bg-white/30 transition-colors">
            <Send className="w-5 h-5 text-white drop-shadow-md" />
          </button>
        </div>
      </div>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}