import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Entrenamiento en Neuroventa Digital · Eva Benavidez',
  description: '3 días para hackear tu mente y vender diferente. Entrenamiento práctico online en vivo — Junio 2025.',
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
        {children}
      </body>
    </html>
  );
}
