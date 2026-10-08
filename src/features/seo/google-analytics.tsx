import Script from 'next/script'

export function GoogleAnalytics(props: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${props.id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${props.id}',{page_location:location.origin+location.pathname+location.search});`}
      </Script>
    </>
  )
}
