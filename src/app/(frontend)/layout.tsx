import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { BackToTopWrapper } from '@/components/BackToTop/BackToTopWrapper'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <BackToTopWrapper />
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({
    slug: 'settings',
  })

  const siteName = settings?.siteName || 'Tactile CMS'
  const siteTitle = settings?.siteTitle || '%s | Tactile CMS'
  
  // Get favicon URLs
  const faviconUrl = settings?.favicon && typeof settings.favicon !== 'string' 
    ? settings.favicon.url 
    : '/favicon.ico'
    
  const faviconSvgUrl = settings?.faviconSvg && typeof settings.faviconSvg !== 'string'
    ? settings.faviconSvg.url
    : null

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: siteName,
      template: siteTitle,
    },
    description: 'Tactile CMS - Modern Content Management System',
    icons: {
      icon: [
        {
          url: faviconUrl || '/favicon.ico',
          sizes: '32x32',
        },
        ...(faviconSvgUrl ? [{
          url: faviconSvgUrl,
          type: 'image/svg+xml',
        }] : []),
      ],
    },
    openGraph: mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      creator: '@tactilecms',
    },
  }
}
