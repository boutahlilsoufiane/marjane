import { Providers } from "./providers";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],          // Load only Latin characters
  weight: ['400', '500', '600', '700'], // Choose weights you need
  variable: '--font-poppins',   // CSS variable name
  display: 'swap',              // Optimise for performance
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
