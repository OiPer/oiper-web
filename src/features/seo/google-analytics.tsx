import Script from 'next/script'

export function GoogleAnalytics(props: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${props.id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());var gtagUrl=function(){var u=new URL(location.href);['e','pat','token','evid','email','request_id'].forEach(function(k){u.searchParams.delete(k)});return u.origin+u.pathname+u.search};['pushState','replaceState'].forEach(function(m){var o=history[m];history[m]=function(){var r=o.apply(this,arguments);gtag('set',{page_location:gtagUrl()});return r}});gtag('config','${props.id}',{page_location:gtagUrl()});gtag('set',{page_location:gtagUrl()});`}
      </Script>
    </>
  )
}
