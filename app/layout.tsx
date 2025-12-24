import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteSearch from "@/components/SiteSearch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bekzat Ilyasov - UI/UX Designer & Frontend Developer",
  description:
    "Portfolio of Bekzat Ilyasov, a skilled UI/UX designer and frontend developer specializing in creating intuitive and engaging digital experiences.",
  keywords: [
    "Bekzat Ilyasov",
    "UI designer",
    "UX designer",
    "frontend developer",
    "React developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web design",
    "Web development",
    "UI/UX portfolio",
    "Digital design",
    "Web applications",
    "User experience",
    "User interface",
    "Responsive design",
    "Web developer",
    "Creative developer",
    "Frontend engineer",
    "Web designer",
    "JavaScript developer",
    "CSS expert",
    "HTML5",
    "Web solutions",
    "Tech portfolio",
    "Software developer",
    "Interactive design",
    "Modern web development",
    "Cross-platform design",
    "Mobile-first design",
    "Web performance optimization",
    "Accessibility in web design",
    "Progressive web apps",
    "Single-page applications",
    "UI animations",
    "Design systems",
    "Component libraries",
    "Frontend architecture",
    "Web development best practices",
    "Open source contributor",
    "Tech blog",
    "Developer portfolio",
    "Creative coding",
    "Web innovation",
    "Digital experiences",
    "User-centered design",
    "Web trends",
    "Cutting-edge web tech",
    "Frontend frameworks",
    "Web development tools",
    "UI prototyping",
    "UX research",
    "Design thinking",
    "Agile development",
    "Collaboration in design",
    "Web project showcase",
    
  ],
  authors: [{ name: "Bekzat Ilyasov", url: "https://ilyasov-bekzat.vercel.app" }],
  creator: "Bekzat Ilyasov",
  publisher: "Bekzat Ilyasov",
  robots: "index, follow",
  openGraph: {
    title: "Bekzat Ilyasov - UI/UX Designer & Frontend Developer",
    description:
      "Portfolio of Bekzat Ilyasov, a skilled UI/UX designer and frontend developer specializing in creating intuitive and engaging digital experiences.",
    url: "https://ilyasov-bekzat.vercel.app",
    siteName: "Bekzat Ilyasov Portfolio",
    images: [
      {
        url: "https://ilyasov-bekzat.vercel.app/imzo.png",
        width: 1200,
        height: 630,
        alt: "Bekzat Ilyasov Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bekzat Ilyasov - UI/UX Designer & Frontend Developer",
    description:
      "Portfolio of Bekzat Ilyasov, a skilled UI/UX designer and frontend developer.",
    images: ["https://ilyasov-bekzat.vercel.app/imzo.png"],
    creator: "@BekzatIlyasov",
  },
  icons: {
    icon: "/imzo.png",
    shortcut: "/imzo.png",
    apple: "/imzo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
                <SiteSearch />

      </body>
    </html>
  );
}
