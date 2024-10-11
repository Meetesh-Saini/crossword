import React, { useContext } from "react";
import { valeraRound } from "./fonts";
import { Mode, ModeContext } from "@/utils/helper";

export default function Tile({
    children,
    customCSS = {},
    className = "",
    onClick = () => {},
}: Readonly<{
    children: React.ReactNode;
    customCSS?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler;
}>) {
    const { mode, setMode } = useContext(ModeContext)!;
    const style = { boxShadow: "1px 1px black", ...customCSS };

    return (
        <div
            className={`${valeraRound.className} flex m-0 bold text-[1.8rem] text-center justify-center items-center w-14 h-14 bg-white border-4 border-black rounded-lg text-black p-2 ${mode == Mode.NORMAL ? "cursor-pointer" : ""} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
