import React from "react";
import { CrosswordEntry, Coords, Direction } from "./algo";

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

interface DisplayEntry {
    value: string;
    modifier: string;
    index: number;
}

const ModeContext = React.createContext<ModeContextType | undefined>(undefined);

const TileColors: { [key: string]: string } = {
    "": "white", // default
    "+": "#a3e635", // solved
    "-": "#9ca3af", // viewed
};

const MainContext = React.createContext<MainContextType | undefined>(undefined);

function stringEntryToDisplayEntry(
    board: string[][],
    BOARD: CrosswordEntry[],
    corners: { topleft: Coords; bottomright: Coords }
): DisplayEntry[][] {
    let displayArray: DisplayEntry[][] = [];
    for (let i = 0; i < board.length; i++) {
        let temp: DisplayEntry[] = [];
        for (let j = 0; j < board[i].length; j++) {
            temp.push({ value: board[i][j], modifier: "", index: -1 });
        }
        displayArray.push(temp);
    }

    for (let i = 0; i < BOARD.length; i++) {
        const element = BOARD[i];
        for (let j = 0; j < element.word.length; j++) {
            const row = corners.topleft.y - element.start.y + +(Direction.VERTICAL == element.dir) * j;
            const col = element.start.x - corners.topleft.x + +(Direction.HORIZONTAL == element.dir) * j;

            displayArray[row][col].index = i;
        }
    }
    return displayArray;
}

export { delay, Mode, ModeContext, TileColors, MainContext, type DisplayEntry, stringEntryToDisplayEntry };
