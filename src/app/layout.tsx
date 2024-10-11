import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const baseURL = "crossword"

export const metadata: Metadata = {
    title: "Crossword | by Meetesh 😄",
    description: "Crossword game with hints support",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={inter.className}
                style={{
                    backgroundImage: `url(/${baseURL}/back_0.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="fixed inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">{children}</div>
            </body>
        </html>
    );
}
