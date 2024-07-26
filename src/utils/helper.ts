import React from "react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

enum Mode {
    NORMAL,
    PENCIL,
}

interface ModeContextType {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

interface MainContextType {
    viewAll: () => void;
}

const ModeContext = React.createContext<ModeContextType | undefined>(undefined);

const TileColors: { [key: string]: string } = {
    "": "white", // default
    "+": "#a3e635", // solved
    "-": "#9ca3af", // viewed
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);

export { delay, Mode, ModeContext, TileColors, MainContext };
