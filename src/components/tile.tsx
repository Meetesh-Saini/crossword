import React from "react";
import { valeraRound } from "./fonts";

export default function Tile({
    children,
    customCSS,
}: Readonly<{
    children: React.ReactNode;
    customCSS?: React.CSSProperties | undefined;
}>) {
    if (!customCSS) {
        customCSS = {};
    }
    const style = { boxShadow: "1px 1px black", ...customCSS };
    return (
        <div
            className={`${valeraRound.className} flex m-0 bold text-[1.8rem] text-center justify-center items-center w-14 h-14 bg-white border-4 border-black rounded-lg text-black p-2`}
            style={style}
        >
            {children}
        </div>
    );
}
