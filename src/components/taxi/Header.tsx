"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import CallButton from "./Buttons/Call"
import { ReserveButton } from "./Buttons/ReserveButton"
import { LanguageSelector } from "./LanguageSelector"
import { useLanguage } from "@/contexts/LanguageContext"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { t } = useLanguage()

    const navItems = [
        { id: "inicio", label: t.nav.inicio },
        { id: "tipos", label: t.nav.tipos },
        { id: "servicios", label: t.nav.servicios },
        { id: "precios", label: t.nav.precios },
        { id: "contacto", label: t.nav.contacto },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white">
                        EasyTaxi
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-white hover:text-taxi-yellow transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSelector />
                        <CallButton />
                        <ReserveButton
                            text={t.header.reserve}
                            className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden fixed top-0 left-0 right-0 h-screen bg-white z-50 p-8 flex flex-col gap-6">
                    <button
                        className="self-end"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex flex-col gap-6">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-black text-lg hover:text-taxi-yellow transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
                            <span className="font-medium">Idioma / Language</span>
                            <LanguageSelector />
                        </div>
                        <div className="flex gap-3">
                            <CallButton />
                            <ReserveButton
                                text={t.header.reserve}
                                className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90 w-full"
                            />
                        </div>
                    </div>
                </nav>
            )}
        </header>
    )
}
