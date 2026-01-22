"use client"

import { ShieldCheck, CreditCard, Users, UserCheck, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function FeaturesBar() {
  const { t } = useLanguage()

  const features = [
    { icon: ShieldCheck, title: t.features.price.title, subtitle: t.features.price.subtitle },
    { icon: CreditCard, title: t.features.payment.title, subtitle: t.features.payment.subtitle },
    { icon: Users, title: t.features.seats.title, subtitle: t.features.seats.subtitle },
    { icon: UserCheck, title: t.features.drivers.title, subtitle: t.features.drivers.subtitle },
    { icon: Clock, title: t.features.availability.title, subtitle: t.features.availability.subtitle },
  ]
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                flex items-center gap-4
                px-6 py-5
                border border-neutral-200
                rounded-2xl
                min-w-[220px]
                bg-white
                shadow-sm
                transition-all
                hover:shadow-lg hover:-translate-y-1
              "
            >
              <feature.icon className="w-10 h-10 text-taxi-yellow flex-shrink-0" />

              <div>
                <p className="font-bold text-base text-foreground">
                  {feature.title}
                </p>
                {feature.subtitle && (
                  <p className="text-sm text-muted-foreground">
                    {feature.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
