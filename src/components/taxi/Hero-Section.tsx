"use client"

import { ReserveButton } from "./Buttons/ReserveButton"
import { useLanguage } from "@/contexts/LanguageContext"

export function HeroSection() {
    const { t } = useLanguage()

    return (
        <section id="inicio" className="relative bg-black rounded-b-4xl overflow-visible">
            <div className="container mx-auto px-20">
                <div className="grid lg:grid-cols-1 items-center justify-center text-center">
                    {/* Left content */}
                    <div className="pt-32 pb-20 relative z-10 flex flex-col items-center">
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                                {t.hero.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="text-taxi-yellow text-4xl md:text-5xl lg:text-6xl font-black italic drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                                    {t.hero.highlight}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-300 text-xl md:text-2xl mb-10 max-w-2xl">
                            {t.hero.description} 
                            <span className="text-taxi-yellow font-bold block mt-2">{t.hero.secondary}</span>
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <ReserveButton text={t.hero.cta} className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90 font-bold text-xl px-10 py-8 shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all hover:scale-105"/>
                        </div>
                    </div>
                    {/* Mobile background/Overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-b-4xl pointer-events-none"
                        style={{
                            backgroundImage: `url('/taxi/background.jpg')`,
                        }}
                    />
                </div>
            </div>


        </section>
    )
}
