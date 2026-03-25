import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Cairo, Inter, Tajawal, Almarai, Changa, El_Messiri, Amiri, Poppins, Roboto, Montserrat, Playfair_Display, Oswald, Raleway, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: '--font-cairo' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["300", "400", "500", "700", "800"], variable: '--font-tajawal' });
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], variable: '--font-almarai' });
const changa = Changa({ subsets: ["arabic", "latin"], variable: '--font-changa' });
const messiri = El_Messiri({ subsets: ["arabic", "latin"], variable: '--font-messiri' });
const amiri = Amiri({ subsets: ["arabic", "latin"], weight: ["400", "700"], variable: '--font-amiri' });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: '--font-poppins' });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: '--font-roboto' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const oswald = Oswald({ subsets: ["latin"], variable: '--font-oswald' });
const raleway = Raleway({ subsets: ["latin"], variable: '--font-raleway' });
const dancing = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing' });

export const metadata: Metadata = {
  title: 'EasyLink - أنشئ صفحتك الشخصية',
  description: 'أنشئ صفحة شخصية أنيقة ومميزة مع روابط التواصل الاجتماعي والموسيقى والمزيد',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${cairo.variable} ${inter.variable} ${tajawal.variable} ${almarai.variable} ${changa.variable} ${messiri.variable} ${amiri.variable} ${poppins.variable} ${roboto.variable} ${montserrat.variable} ${playfair.variable} ${oswald.variable} ${raleway.variable} ${dancing.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
