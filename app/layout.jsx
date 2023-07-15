import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import { AudioProvider } from "@/context/AudioContext";

export const metadata = {
  title: "Al Quran",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto px-4">
          <AudioProvider>
            <Navbar />
            {children}
          </AudioProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
