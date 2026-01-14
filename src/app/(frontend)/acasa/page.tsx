import type { Metadata } from 'next'
import React from 'react'
import HeroSection from '@/components/staticpages/acasa/HeroSection'
import ElearningSection from '@/components/staticpages/acasa/ElearningSection'
import SimulareSection from '@/components/staticpages/acasa/SimulareSection'
import TimelineSection from '@/components/staticpages/acasa/TimelineSection'
import StatisticsSection from '@/components/staticpages/acasa/StatisticsSection'
import NeedImageSection from '@/components/staticpages/acasa/NeedImageSection'
import PartnersSection from '@/components/staticpages/acasa/PartnersSection'
import HowToSection from '@/components/staticpages/acasa/HowToSection'
import TestimonialSection from '@/components/staticpages/acasa/TestimonialSection'
import BlogSection from '@/components/staticpages/acasa/BlogSection'

export default async function AcasaPage() {
  return (
    <article className="mt-0 overflow-x-hidden">
      <div className="w-full bg-[#3A3A3A] min-h-screen">
        <HeroSection
          title="Mesaj - ce facem pentru nevăzători, cum îi ajutăm"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          buttonText="Descoperă imaginile"
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Languages"
        />

        <HeroSection
          title="Mesaj - ce facem pentru surzi, cum îi ajutăm, etc."
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          buttonText="Descoperă imaginile"
          imagePosition="left"
          imageSrc="/hello-languages.jpg"
          imageAlt="Languages"
        />

        <HeroSection
          title="Mesaj - ce facem pentru persoane, cu dificultăți de învățare"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
          buttonText="Descoperă imaginile"
          imagePosition="right"
          imageSrc="/hello-languages.jpg"
          imageAlt="Languages"
        />

        <ElearningSection />

        <SimulareSection />

        <TimelineSection />

        <StatisticsSection />

         <HowToSection />

        <BlogSection />        

        <PartnersSection />

        <TestimonialSection />

        <NeedImageSection />


      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Acasă - Tactile Literacy',
  description: 'Descoperă cum ajutăm persoanele cu dizabilități',
}
