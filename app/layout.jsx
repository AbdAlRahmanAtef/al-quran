import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import { AudioProvider } from "@/context/AudioContext";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Al Quran",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AudioProvider>
          <Navbar />
          <main className="mt-[100px]">{children}</main>
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
};

export default RootLayout;
