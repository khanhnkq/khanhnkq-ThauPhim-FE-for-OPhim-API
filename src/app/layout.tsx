import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from 'nextjs-toploader';

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThauPhim - Phim Hay Cả Thau",
  description: "ThauPhim - Điểm đến tối thượng cho người yêu điện ảnh. Tuyển tập phim lẻ, phim bộ, anime, và show truyền hình mới nhất cập nhật liên tục với chất lượng Full HD vietsub.",
  keywords: "phim hay, thauphim, thau phim, thau phim hay cả thau, xem phim online, phim vietsub, phim chiếu rạp, phim hd, phim lẻ, phim bộ",
  openGraph: {
    title: "ThauPhim - Phim Hay Cả Thau",
    description: "Tuyển tập những bộ phim mới nhất, xem phim online miễn phí chất lượng cao tại ThauPhim.",
    url: "thauphim-neon.vercel.app",
    siteName: "ThauPhim",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "ThauPhim Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThauPhim - Phim Hay Cả Thau",
    description: "Tuyển tập những bộ phim mới nhất, phim vietsub sắc nét.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased min-h-screen flex flex-col`}>

        <NextTopLoader
          color="#fec93d"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #fec93d,0 0 5px #fec93d"
        />
        <Header />
        <main className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
