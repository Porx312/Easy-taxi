import { ShieldCheck, CreditCard, Users, UserCheck, Clock } from "lucide-react"

const features = [
  { icon: ShieldCheck, title: "Precio cerrado", subtitle: "garantizado" },
  { icon: CreditCard, title: "Pago después", subtitle: "del servicio" },
  { icon: Users, title: "Coches hasta 8", subtitle: "plazas" },
  { icon: UserCheck, title: "Conductores", subtitle: "profesionales" },
  { icon: Clock, title: "Taxi 24/7", subtitle: "" },
]

export function FeaturesBar() {
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
