"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-white border-t border-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{t.footer.brand}</h3>
                        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
                            <Link href="#inicio" className="hover:text-foreground transition-colors">
                                {t.nav.inicio}
                            </Link>
                            <Link href="#tipos" className="hover:text-foreground transition-colors">
                                {t.nav.tipos}
                            </Link>
                            <Link href="#servicios" className="hover:text-foreground transition-colors">
                                {t.nav.servicios}
                            </Link>
                            <Link href="#precios" className="hover:text-foreground transition-colors">
                                {t.nav.precios}
                            </Link>
                            <Link href="#contacto" className="hover:text-foreground transition-colors">
                                {t.nav.contacto}
                            </Link>
                        </nav>
                        <p className="text-sm text-muted-foreground">{t.footer.rights}</p>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        <p>
                            <Link href="tel:+34868838373" className="hover:text-foreground transition-colors underline">
                                tel: +34 8686 838 373
                            </Link>
                        </p>
                        <p>
                            <Link href="mailto:taxibcn@taxi.com" className="hover:text-foreground transition-colors underline">
                                email: taxibcn@taxi.com
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
