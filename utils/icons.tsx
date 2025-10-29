import { Smile, Star, Shield, Heart, Zap, CheckCircle, Award, Users, TrendingUp } from "lucide-react"

const iconMap = {
  Smile,
  Star,
  Shield,
  Heart,
  Zap,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
}

export const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap]
  if (!IconComponent) return null
  return <IconComponent className={className} />
}
