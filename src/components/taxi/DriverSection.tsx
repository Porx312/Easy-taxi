"use client"

import { Check, ShieldCheck, Star, BadgeCheck } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function DriversSection() {
  const { t } = useLanguage()

  return (
    <section
      id="servicios"
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-white md:text-4xl font-bold text-center text-foreground mb-2">
          {t.drivers.title}
        </h2>
        <p className="text-center text-taxi-yellow font-semibold mb-12">
          {t.drivers.subtitle}
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            {/* Header badge */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 bg-taxi-yellow/10 text-taxi-yellow px-5 py-2 rounded-full">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold text-sm">
                  {t.drivers.verified}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-5">
              {t.drivers.list.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-taxi-yellow rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-foreground text-base leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-neutral-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-taxi-yellow fill-taxi-yellow" />
                  <span className="text-2xl font-bold text-foreground">4.9</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.drivers.rating}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BadgeCheck className="w-5 h-5 text-taxi-yellow" />
                  <span className="text-2xl font-bold text-foreground">
                    100%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.drivers.regulated}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
