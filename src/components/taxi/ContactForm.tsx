"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  Loader2,
  CheckCircle,
  Map,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/LanguageContext"

export function ContactForm() {
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)

  const taxiTypes = [
    { value: "estandar", label: t.taxiTypes.categories.estandar },
    { value: "7-8-plazas", label: t.taxiTypes.categories.plazas },
    { value: "premium", label: t.taxiTypes.categories.premium },
    { value: "adaptado", label: t.taxiTypes.categories.adaptado },
  ]

  const popularDestinations = [
    { value: "aeropuerto-prat", label: t.destinations.items["Aeropuerto el prat"], coords: { lat: 41.2974, lng: 2.0833 } },
    { value: "aeropuerto-girona", label: t.destinations.items["Aeropuerto Girona"], coords: { lat: 41.9009, lng: 2.7606 } },
    { value: "lloret", label: t.destinations.items["Lloret del mar"], coords: { lat: 41.7, lng: 2.8453 } },
    { value: "port-aventura", label: t.destinations.items["Port aventura"], coords: { lat: 41.0869, lng: 1.1556 } },
    { value: "andorra", label: t.destinations.items["Andorra"], coords: { lat: 42.5063, lng: 1.5218 } },
    { value: "tarragona", label: t.destinations.items["Tarragona"], coords: { lat: 41.1189, lng: 1.2445 } },
  ]

  const MapPicker = dynamic(() => import("./MapPicker"), {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-neutral-100 rounded-lg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-taxi-yellow" />
      </div>
    ),
  })

  const STEPS = [
    { id: 1, title: t.contact.steps.step1.title, description: t.contact.steps.step1.description },
    { id: 2, title: t.contact.steps.step2.title, description: t.contact.steps.step2.description },
    { id: 3, title: t.contact.steps.step3.title, description: t.contact.steps.step3.description },
  ]
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoTaxi: "",
    origen: "",
    destino: "",
    destinoCoords: null as { lat: number; lng: number } | null,
    fecha: "",
    hora: "",
    pasajeros: "",
    mensaje: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [destinoInputMode, setDestinoInputMode] = useState<"text" | "select">("text")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar la reserva")
      }

      setIsSuccess(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        tipoTaxi: "",
        origen: "",
        destino: "",
        destinoCoords: null,
        fecha: "",
        hora: "",
        pasajeros: "",
        mensaje: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar la reserva")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMapSelect = (address: string, coords: { lat: number; lng: number }) => {
    setFormData({ ...formData, destino: address, destinoCoords: coords })
    setShowMap(false)
  }

  const handlePopularDestinationSelect = (value: string) => {
    const destination = popularDestinations.find((d) => d.value === value)
    if (destination) {
      setFormData({ ...formData, destino: destination.label, destinoCoords: destination.coords })
    }
  }

  const canProceedStep1 = formData.nombre && formData.email && formData.telefono
  const canProceedStep2 = formData.tipoTaxi && formData.origen && formData.destino && formData.pasajeros
  const canProceedStep3 = formData.fecha && formData.hora

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSuccess) {
    return (
      <section id="contacto" className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">{t.contact.success.title}</h2>
              <p className="text-muted-foreground mb-6">
                {t.contact.success.message}
              </p>
              <Button
                onClick={() => {
                  setIsSuccess(false)
                  setCurrentStep(1)
                }}
                className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90"
              >
                {t.contact.success.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto" className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.contact.title}</h2>
            <p className="text-muted-foreground">{t.contact.subtitle}</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      currentStep >= step.id ? "bg-taxi-yellow text-black" : "bg-neutral-200 text-neutral-500"
                    }`}
                  >
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span
                    className={`text-xs mt-1 hidden sm:block ${currentStep >= step.id ? "text-foreground font-medium" : "text-muted-foreground"}`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-1 mx-2 ${currentStep > step.id ? "bg-taxi-yellow" : "bg-neutral-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
              )}

              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">{STEPS[0].title}</h3>
                    <p className="text-sm text-muted-foreground">{STEPS[0].description}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-taxi-yellow" />
                      {t.contact.form.name}
                    </Label>
                    <Input
                      id="nombre"
                      required
                      placeholder={t.contact.form.namePlaceholder}
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-taxi-yellow" />
                      {t.contact.form.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-taxi-yellow" />
                      {t.contact.form.phone}
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      required
                      placeholder={t.contact.form.phonePlaceholder}
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Trip Details */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">{STEPS[1].title}</h3>
                    <p className="text-sm text-muted-foreground">{STEPS[1].description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="tipoTaxi">{t.contact.form.taxiType}</Label>
                      <Select
                        value={formData.tipoTaxi}
                        onValueChange={(value) => setFormData({ ...formData, tipoTaxi: value })}
                      >
                        <SelectTrigger id="tipoTaxi">
                          <SelectValue placeholder={t.contact.form.taxiTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {taxiTypes.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pasajeros" className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-taxi-yellow" />
                        {t.contact.form.passengers}
                      </Label>
                      <Input
                        id="pasajeros"
                        type="number"
                        min="1"
                        max="8"
                        required
                        placeholder={t.contact.form.passengersPlaceholder}
                        value={formData.pasajeros}
                        onChange={(e) => setFormData({ ...formData, pasajeros: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="origen" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-taxi-yellow" />
                      {t.contact.form.origin}
                    </Label>
                    <Input
                      id="origen"
                      required
                      placeholder={t.contact.form.originPlaceholder}
                      value={formData.origen}
                      onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      {t.contact.form.destination}
                    </Label>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        type="button"
                        variant={destinoInputMode === "text" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDestinoInputMode("text")}
                        className={
                          destinoInputMode === "text" ? "bg-taxi-yellow text-black hover:bg-taxi-yellow/90" : ""
                        }
                      >
                        {t.contact.form.write}
                      </Button>
                      <Button
                        type="button"
                        variant={destinoInputMode === "select" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDestinoInputMode("select")}
                        className={
                          destinoInputMode === "select" ? "bg-taxi-yellow text-black hover:bg-taxi-yellow/90" : ""
                        }
                      >
                        {t.contact.form.popular}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowMap(true)}
                        className="border-taxi-yellow text-taxi-yellow hover:bg-taxi-yellow hover:text-black"
                      >
                        <Map className="w-4 h-4 mr-1" />
                        {t.contact.form.map}
                      </Button>
                    </div>

                    {destinoInputMode === "text" && (
                      <Input
                        id="destino"
                        required
                        placeholder={t.contact.form.destinationPlaceholder}
                        value={formData.destino}
                        onChange={(e) => setFormData({ ...formData, destino: e.target.value, destinoCoords: null })}
                      />
                    )}

                    {destinoInputMode === "select" && (
                      <Select
                        value={popularDestinations.find((d) => d.label === formData.destino)?.value || ""}
                        onValueChange={handlePopularDestinationSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t.contact.form.taxiTypePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {popularDestinations.map((dest) => (
                            <SelectItem key={dest.value} value={dest.value}>
                              {dest.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {formData.destino && formData.destinoCoords && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                        <span className="text-sm text-green-800 flex-1">{formData.destino}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, destino: "", destinoCoords: null })}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Date, Time & Message */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">{STEPS[2].title}</h3>
                    <p className="text-sm text-muted-foreground">{STEPS[2].description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fecha" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-taxi-yellow" />
                        {t.contact.form.date}
                      </Label>
                      <Input
                        id="fecha"
                        type="date"
                        required
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hora" className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-taxi-yellow" />
                        {t.contact.form.time}
                      </Label>
                      <Input
                        id="hora"
                        type="time"
                        required
                        value={formData.hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">{t.contact.form.additionalInfo}</Label>
                    <Textarea
                      id="mensaje"
                      placeholder={t.contact.form.additionalInfoPlaceholder}
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
                    <h4 className="font-medium text-foreground text-sm">{t.contact.form.summaryTitle}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <span className="font-medium text-foreground">{t.contact.form.summaryName}:</span> {formData.nombre}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">{t.contact.form.summaryTaxi}:</span>{" "}
                        {taxiTypes.find((t) => t.value === formData.tipoTaxi)?.label}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">{t.contact.form.summaryFrom}:</span> {formData.origen}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">{t.contact.form.summaryTo}:</span> {formData.destino}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {t.contact.form.prev}
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                    className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90"
                  >
                    {t.contact.form.next}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!canProceedStep3 || isLoading}
                    className="bg-taxi-yellow text-black hover:bg-taxi-yellow/90"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      t.contact.form.confirm
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {t.contact.form.footer}
          </p>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{language === "es" ? "Selecciona el destino en el mapa" : "Select destination on map"}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMap(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">
              <MapPicker onSelect={handleMapSelect} initialCoords={{ lat: 41.3851, lng: 2.1734 }} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
