//src/app/layout.js
import { CustomerAuthProvider } from '@/hooks/useCustomerAuth';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Print Seoul",
  description: "Professional Printing Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
          <CustomerAuthProvider>
        {children}
         </CustomerAuthProvider>
      </body>
    </html>
  );
}
