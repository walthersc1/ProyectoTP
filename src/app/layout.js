import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navegation from "@/components/Navegation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
 
  return (
    <html lang="en" className="h-screen">
      <body className={inter.className} >
        <Providers>
          <Navegation/>
          <main className="flex justify-center items-start bg-gradient-to-r from-violet-600 to-violet-300">
            <div className="xl:max-w-[1280px] w-full">
              {children}
            </div>
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}

