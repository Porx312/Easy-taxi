import { CookieBanner } from "@/components/taxi/CokkieBanner";
import { ContactForm } from "@/components/taxi/ContactForm";
import { Destinations } from "@/components/taxi/Destination";
import { DriversSection } from "@/components/taxi/DriverSection";
import { FeaturesBar } from "@/components/taxi/FeatureBar";
import { Footer } from "@/components/taxi/Footer";
import { Header } from "@/components/taxi/Header";
import { HeroSection } from "@/components/taxi/Hero-Section";
import { HowItWorks } from "@/components/taxi/HowItWork";
import { TaxiTypes } from "@/components/taxi/TaxiTypes";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className=" bg-gradient-to-b bg-taxi-yellow">
      <HeroSection />

      <FeaturesBar />
      <TaxiTypes />
      </div>
      <HowItWorks />
      <div className=" bg-gradient-to-b from-black to-gray-950">

      <Destinations />
      <DriversSection />
      </div>
        <ContactForm />
      <Footer />
            <CookieBanner />
    </main>
  )
}
