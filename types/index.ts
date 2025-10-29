export interface Story {
  id: number
  username: string
  avatar: string
  gradient: string
  viewed: boolean
  content: StoryContent[]
}

export interface StoryContent {
  type: string
  url: string
  text: string
  duration: number
}

export interface Service {
  id: number
  icon: string
  title: string
  shortDesc: string
  price: string
  duration: string
  description: string
  includes: string[]
  gradient: string
}

export interface BeforeAfterImage {
  title: string
  before: string
  after: string
  description: string
}

export interface Achievement {
  icon: string
  title: string
  desc: string
}

export interface CalendarDay {
  day: number
  date: Date
  isToday: boolean
  isPast: boolean
  isWeekend: boolean
  isAvailable: boolean
}
