"use client"

import type React from "react"
import { memo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plane, MapPin, Ship, Train, Route } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

type TaxiType = {
  title: string
  image: string
  alt: string
}

type Destination = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  description: string
  details: string
}

function TaxiTypesComponent() {
  const { t } = useLanguage()
  const [selectedDestination, setSelectedDestination] =
    useState<any | null>(null)

  const taxiTypes: TaxiType[] = [
    {
      title: t.taxiTypes.categories.plazas,
      image: "/taxi/types/7-8plazas.png",
      alt: `Taxi ${t.taxiTypes.categories.plazas}`,
    },
    {
      title: t.taxiTypes.categories.estandar,
      image: "/taxi/types/estandar.png",
      alt: `Taxi ${t.taxiTypes.categories.estandar}`,
    },
    {
      title: t.taxiTypes.categories.adaptado,
      image: "/taxi/types/adaptado.png",
      alt: `Taxi ${t.taxiTypes.categories.adaptado}`,
    },
    {
      title: t.taxiTypes.categories.premium,
      image: "/taxi/types/premium.png",
      alt: `Taxi ${t.taxiTypes.categories.premium}`,
    },
  ]

  const destinations = [
    {
      icon: Plane,
      id: "aeropuertos",
      ...t.taxiTypes.destinations.aeropuertos,
    },
    {
      icon: MapPin,
      id: "recogidas",
      ...t.taxiTypes.destinations.recogidas,
    },
    {
      icon: Ship,
      id: "cruceros",
      ...t.taxiTypes.destinations.cruceros,
    },
    {
      icon: Train,
      id: "estaciones",
      ...t.taxiTypes.destinations.estaciones,
    },
    {
      icon: Route,
      id: "largasDistancias",
      ...t.taxiTypes.destinations.largasDistancias,
    },
  ]

  return (
    <section className="w-full">
      {/* Yellow Header Section */}
      <div className="bg-taxi-yellow pt-16 pb-36 md:pb-44">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-taxi-dark italic text-balance leading-tight">
            {t.taxiTypes.header}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-taxi-dark/90 italic font-medium max-w-2xl mx-auto">
            {t.taxiTypes.subHeader}
          </p>
        </div>
      </div>

      {/* Cards Section - Overlapping yellow and black */}
      <div className="bg-taxi-dark -mt-28 md:-mt-36 pt-0 pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          {/* Taxi Cards Flex with Map */}
          <div className="flex flex-wrap justify-center gap-5 md:gap-7 lg:gap-8">
            {taxiTypes.map((taxi, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center w-[160px] md:w-[200px] lg:w-[250px] group"
              >
                <Card className="border-0 shadow-xl rounded-3xl h-[200px] md:h-[240px] w-full pt-2 pb-0 bg-white overflow-visible transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <CardContent className="flex flex-col items-center justify-start h-full p-4">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-black text-taxi-dark text-center text-balance">
                      {taxi.title}
                    </h3>
                  </CardContent>
                </Card>
              <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 
  w-[280px] md:w-[320px] lg:w-[360px] 
  h-[150px] md:h-[170px] lg:h-[200px] 
  transition-transform duration-300 group-hover:scale-115">
  <Image
    src={taxi.image || "/placeholder.svg"}
    alt={taxi.alt}
    fill
    className="object-contain object-center drop-shadow-2xl"
    loading="lazy"
  />
</div>


              </div>
            ))}
          </div>
        </div>

        {/* Destinations Section */}
        <div className="container mx-auto px-4 mt-24 md:mt-32">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 md:mb-14">
            {t.taxiTypes.servicesHeader}
          </h3>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-14 mb-14 md:mb-16">
            {destinations.map((dest, index) => {
              const IconComponent = dest.icon
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDestination(dest)}
                  type="button"
                  className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  <div className="relative p-4 md:p-5 bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:bg-taxi-yellow">
                    <IconComponent
                      className="w-10 h-10 md:w-12 md:h-12 text-taxi-dark transition-colors duration-300"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </div>
                  <span className="text-sm md:text-base font-bold text-white group-hover:text-taxi-yellow transition-colors duration-300">
                    {dest.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="#contacto">
            <Button
              size="lg"
              className="bg-taxi-yellow text-taxi-dark hover:bg-white rounded-xl px-10 py-6 text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
              {t.taxiTypes.cta}
            </Button>
              </Link>
          </div>
        </div>
      </div>

      {/* Dialog for Destination Details */}
      <Dialog
        open={!!selectedDestination}
        onOpenChange={() => setSelectedDestination(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              {selectedDestination && (
                <>
                  <div className="p-3 bg-taxi-yellow rounded-xl">
                    <selectedDestination.icon
                      className="w-6 h-6 text-taxi-dark"
                      strokeWidth={2}
                    />
                  </div>
                  {selectedDestination.label}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {selectedDestination?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedDestination?.details}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export const TaxiTypes = memo(TaxiTypesComponent)
