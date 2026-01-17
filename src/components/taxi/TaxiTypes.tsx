"use client"

import type React from "react"

import { memo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Plane, MapPin, Ship, Train, Route } from "lucide-react"

type TaxiType = {
  id: string
  name: string
  image: string
}

type Destination = {
  icon: React.ComponentType<{ className?: string }>
  label: string
}
const taxiTypes: TaxiType[] = [
  { id: "van", name: "7/8 plazas", image: "/taxi/types/7-8plazas.png" },
  { id: "standard", name: "Estándar", image: "/taxi/types/estandar.png" },
  { id: "premium", name: "Premium", image: "/taxi/types/premium.png" },
  { id: "pmr", name: "Adaptado PMR", image: "/taxi/types/adaptado.png" },
]

const destinations: Destination[] = [
  { icon: Plane, label: "aeropuertos" },
  { icon: MapPin, label: "recogidas" },
  { icon: Ship, label: "cruceros" },
  { icon: Train, label: "Estaciones" },
  { icon: Route, label: "Largas Distancias" },
]

function TaxiTypesComponent() {
  return (
    <section className="w-full">
      {/* Yellow Header Section */}
      <div className="bg-taxi-yellow pt-12 pb-32 md:pb-40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-taxi-dark italic">Nuestros Taxis</h2>
          <p className="mt-3 text-lg md:text-xl text-taxi-dark italic font-medium">
            Elige el vehículo que mejor se adapte a tu viaje
          </p>
        </div>
      </div>

      {/* Cards Section - Overlapping yellow and black */}
      <div className="bg-taxi-dark -mt-24 md:-mt-32 pt-0 pb-12">
        <div className="container mx-auto px-4">
          {/* Taxi Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {taxiTypes.map((taxi) => (
              <div key={taxi.id} className="relative flex flex-col items-center">
                {/* Solicitar Button - Above card */}
                
                {/* White Card */}
                <div className="bg-white rounded-3xl h-[250px] w-full pt-6 pb-24 md:pb-32 flex flex-col items-center relative overflow-visible">
                  <h3 className="text-xl md:text-2xl font-black text-taxi-dark text-center">{taxi.name}</h3>
                </div>

                {/* Car Image - Overlapping bottom of card */}
                <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-[120%] max-w-[380px] h-[200px] md:h-[240px]">
                  <Image
                    src={taxi.image || "/placeholder.svg"}
                    alt={`Taxi ${taxi.name}`}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destinations Section */}
        <div className="container mx-auto px-4 mt-20 md:mt-24">
         

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {destinations.map((dest, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <dest.icon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} aria-hidden />
                <span className="text-sm md:text-base font-bold text-white">{dest.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button className="bg-taxi-yellow text-taxi-dark hover:bg-taxi-yellow/90 rounded-lg px-8 py-3 text-base font-semibold">
              Consigue tu Taxi Ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const TaxiTypes = memo(TaxiTypesComponent)
