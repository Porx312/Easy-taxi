import { GoogleAdsConversion } from "@/components/ads/GoogleAdsConversion"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6 py-16">
        <div className="mb-8">
          <div className="w-20 h-20 bg-[#fbb024] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">¡Gracias por tu reserva!</h1>
          <p className="text-xl text-gray-300 mb-8">
            Hemos recibido tu solicitud correctamente. Te contactaremos pronto para confirmar los detalles de tu viaje.
          </p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">¿Qué pasa ahora?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#fbb024] rounded-full flex items-center justify-center shrink-0 mt-1">
                <span className="text-black font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Recepción de tu solicitud</h3>
                <p className="text-gray-400">Hemos recibido tu reserva y la estamos procesando.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#fbb024] rounded-full flex items-center justify-center shrink-0 mt-1">
                <span className="text-black font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Confirmación por WhatsApp</h3>
                <p className="text-gray-400">Te enviaremos un mensaje o llamada para confirmar los detalles.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#fbb024] rounded-full flex items-center justify-center shrink-0 mt-1">
                <span className="text-black font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Confirmación final</h3>
                <p className="text-gray-400">Recibirás la confirmación final con todos los detalles del viaje.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a 
            href="tel:+34641230218" 
            className="inline-block bg-[#fbb024] text-black font-bold py-4 px-8 rounded-xl hover:bg-[#f5a014] transition-colors"
          >
            Llamar ahora: +34 641 230 218
          </a>
          <div>
            <a 
              href="/" 
              className="text-gray-400 hover:text-white transition-colors underline"
            >
              Volver a la página principal
            </a>
          </div>
        </div>
      </div>
      
      {/* Google Ads Conversion Tracking */}
      <GoogleAdsConversion />
    </div>
  )
}
