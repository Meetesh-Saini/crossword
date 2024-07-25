import localFont from "next/font/local";
import { Varela_Round } from "next/font/google";

const supperBubble = localFont({ src: "../assets/font/SuperBubble.ttf" });

const valeraRound = Varela_Round({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export { supperBubble, valeraRound };
