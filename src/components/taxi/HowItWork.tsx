"use client"

import { FileText, Car, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function HowItWorks() {
  const { t, language } = useLanguage()

  const steps = [
    {
      icon: FileText,
      step: language === "es" ? "Paso 1" : "Step 1",
      title: t.howItWorks.step1.title,
      subtitle: t.howItWorks.step1.subtitle,
    },
    {
      icon: Car,
      step: language === "es" ? "Paso 2" : "Step 2",
      title: t.howItWorks.step2.title,
      subtitle: t.howItWorks.step2.subtitle,
    },
    {
      icon: Clock,
      step: language === "es" ? "Paso 3" : "Step 3",
      title: t.howItWorks.step3.title,
      subtitle: t.howItWorks.step3.subtitle,
    },
  ]

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-14">
          {t.howItWorks.title}
        </h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 mb-14">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-white rounded-3xl shadow-lg px-8 py-8 w-64 text-center">
                <p className="text-sm font-bold text-taxi-yellow mb-3">
                  {step.step}
                </p>

                <div className="w-20 h-20 mx-auto bg-taxi-yellow/10 rounded-full flex items-center justify-center mb-5">
                  <step.icon className="w-9 h-9 text-taxi-yellow" />
                </div>

                <p className="text-base font-bold text-foreground">
                  {step.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {step.subtitle}
                </p>
              </div>

              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground mx-6" />
              )}
            </div>
          ))}
        </div>

        {/* Trust message */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm px-6 py-5 text-center border border-neutral-200">
          <p className="text-sm md:text-base text-muted-foreground">
            {t.howItWorks.trust}
            <span className="font-semibold text-foreground">
              {t.howItWorks.trustHighlight}
            </span>
            {language === "es" ? ", garantizando un servicio seguro, puntual y de máxima calidad." : ", guaranteeing a safe, punctual and high quality service."}
          </p>
        </div>
      </div>
    </section>
  )
}
