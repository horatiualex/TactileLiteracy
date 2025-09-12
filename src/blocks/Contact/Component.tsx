'use client'

import React from 'react'
import type { ContactBlock as ContactBlockProps } from '@/payload-types'

// Custom SVG Icons that are theme-aware
const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-foreground"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-foreground"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const AddressIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-foreground"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-foreground"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-foreground"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

type ContactInfo = {
  email?: string
  phone?: string
  address?: string
}

type BusinessHours = {
  day: string
  hours: string
}

type SocialLink = {
  platform: string
  url: string
  label: string
}

type GoogleMapsConfig = {
  embedUrl?: string | null
  height?: number | null
}

const GoogleMapsEmbed: React.FC<{ config: GoogleMapsConfig }> = ({ config }) => {
  const { embedUrl, height = 400 } = config

  if (!embedUrl) {
    return (
      <div 
        className="w-full bg-muted rounded-lg flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <AddressIcon />
          </div>
          <p className="text-muted-foreground">Adaugă URL-ul de embed pentru Google Maps</p>
          <p className="text-xs text-muted-foreground mt-2">
            Accesează Google Maps → Partajare → Încorporare hartă
          </p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-lg border border-border"
      style={{ height: `${height}px` }}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
        title="Google Maps"
      />
    </div>
  )
}

const ContactInfoCard: React.FC<{
  icon: React.ReactNode
  title: string
  value: string
  href?: string
}> = ({ icon, title, value, href }) => {
  const content = (
    <div className="bg-card hover:bg-accent/5 border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:border-accent/20">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-base font-semibold text-foreground break-words">{value}</p>
        </div>
        {href && (
          <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
            <ExternalLinkIcon />
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="group block" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

const BusinessHoursCard: React.FC<{ hours: BusinessHours[] }> = ({ hours }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <ClockIcon />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Programul</h3>
      </div>
      <div className="space-y-2">
        {hours.map((schedule, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-sm text-muted-foreground">{schedule.day}</span>
            <span className="text-sm font-medium text-foreground">{schedule.hours}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SocialLinksCard: React.FC<{ links: SocialLink[] }> = ({ links }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Urmărește-ne</h3>
      <div className="grid grid-cols-1 gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-accent/10 transition-colors group"
          >
            <span className="text-sm font-medium text-foreground">{link.label}</span>
            <ExternalLinkIcon />
          </a>
        ))}
      </div>
    </div>
  )
}

export const ContactBlockComponent: React.FC<
  ContactBlockProps & { className?: string }
> = ({
  contactInfo,
  googleMaps,
  businessHours,
  socialLinks,
  layout = 'grid',
  className,
}) => {
  return (
    <section className={`py-16 lg:py-24 ${className || ''}`}>
      <div className="container">
        <div className={`grid gap-8 ${
          layout === 'split' 
            ? 'lg:grid-cols-2' 
            : 'grid-cols-1'
        }`}>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-1">
              {contactInfo?.email && (
                <ContactInfoCard
                  icon={<EmailIcon />}
                  title="Email"
                  value={contactInfo.email}
                  href={`mailto:${contactInfo.email}`}
                />
              )}
              
              {contactInfo?.phone && (
                <ContactInfoCard
                  icon={<PhoneIcon />}
                  title="Telefon"
                  value={contactInfo.phone}
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                />
              )}
              
              {contactInfo?.address && (
                <ContactInfoCard
                  icon={<AddressIcon />}
                  title="Adresă"
                  value={contactInfo.address}
                  href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
                />
              )}
            </div>

            {/* Business Hours */}
            {businessHours && businessHours.length > 0 && (
              <BusinessHoursCard hours={businessHours} />
            )}

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <SocialLinksCard links={socialLinks} />
            )}
          </div>

          {/* Google Maps */}
          {googleMaps && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Locația noastră</h3>
              <GoogleMapsEmbed config={googleMaps} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}