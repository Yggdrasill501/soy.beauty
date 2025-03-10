import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
  title: {
    default: "Soy beauty",
    template: "%s | soy.beauty",
  },
  description: "Unikatny salon krásy.",
  openGraph: {
    title: "soy.beauty",
    description:
      "Unikatny salon krásy a relaxácie v Nitre.",
    url: "https://soybeauty.sk",
    siteName: "soy.beauty",
    images: [
      {
        url: "https://soybeauty.sk/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "sk-SK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Soy beauty",
    card: "summary_large_image",
    description: "Unikatny salon krásy a relaxácie v Nitre.",
    creator: "@soybeauty",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
