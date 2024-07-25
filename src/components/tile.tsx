import React from "react";

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
        <div className="bg-white border-4 border-black rounded-lg" style={style}>
            {children}
        </div>
    );
}
