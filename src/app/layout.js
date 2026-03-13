import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from "@/app/context/UserContext";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sponsorship & Marketing",
  description: "Sponsorship Management Portal for Organizing Committees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <UserProvider>

        {children}
        <Footer />
         </UserProvider>
      </body>
    </html>
  );
}
