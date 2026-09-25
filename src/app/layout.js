import "./globals.css";
import { FitLogProvider } from "@/app/context/FitLogContext";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          {children}
        </FitLogProvider>
      </body>
    </html>
  );
}