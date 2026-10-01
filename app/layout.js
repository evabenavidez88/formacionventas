import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Entrenamiento Neuroventa Digital + IA · Eva Benavidez',
  description: 'Aprendé mi método para ordenar tus conversaciones de venta y a usar la IA como aliada para diseñar tu proceso e integrar tus canales, sin perder lo humano. Entrenamiento online en vivo.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2086888815054968');
          fbq('track', 'PageView');
        `}</Script>
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yb00ke30gn");
        `}</Script>
        {children}
      </body>
    </html>
  );
}
