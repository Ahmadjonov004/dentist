import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr.Ravshanbek',
  description: 'Developed by Kobiljon.com',
  generator: 'DentaMed Clinic',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
