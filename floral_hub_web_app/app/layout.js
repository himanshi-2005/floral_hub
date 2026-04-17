
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-pink-50">
        <Navbar />
        <div className="p-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}