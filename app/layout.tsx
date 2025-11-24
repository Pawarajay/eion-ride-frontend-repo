import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-context"
import WhatsAppButton from "@/components/whatsappbutton"
import { Suspense } from "react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Eion Rides",
  description: "Created by VasifyTech",
  generator: "vasifytech.com",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17631308778"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17631308778');
          `}
        </Script>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}         <WhatsAppButton />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
