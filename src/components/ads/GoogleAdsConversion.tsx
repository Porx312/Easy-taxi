'use client'

import Script from 'next/script'

interface GoogleAdsConversionProps {
  conversionId?: string
}

export function GoogleAdsConversion({ conversionId = 'AW-17960671536/ZzicCIKzzPsbELCyqPRC' }: GoogleAdsConversionProps) {
  return (
    <Script
      id="google-ads-conversion"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          gtag('event', 'conversion', {'send_to': '${conversionId}'});
        `,
      }}
    />
  )
}
