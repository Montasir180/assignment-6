import "./globals.css";
import { FitLogProvider } from "@/app/context/FitLogContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#08090b] text-white">

        <FitLogProvider>

          <div className="flex min-h-screen flex-col">

            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />

          </div>

        </FitLogProvider>

      </body>
    </html>
  );
}