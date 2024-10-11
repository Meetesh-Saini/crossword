"use client";

import AnswerBar from "@/components/answerbar";
import Header from "@/components/header";
import Tile from "@/components/tile";
import { Crossword, CrosswordEntry, Direction } from "@/utils/algo";
import { delay, MainContext, Mode, ModeContext, TileColors, DisplayEntry, stringEntryToDisplayEntry } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const supported_lists = {
        English: "english-25k",
    };
    const BOARD = useRef<Crossword | null>(null);
    const [wordlist, setWordlist] = useState(supported_lists["English"]);
    const [displayBoard, setDisplayBoard] = useState<DisplayEntry[][]>([]);
    const [animatedTile, setAnimatedTile] = useState<{ row: number; col: number } | null>(null);
    const [cursor, setCursor] = useState("");
    const [mode, setMode] = useState<Mode>(Mode.NORMAL);

    if (BOARD.current === null) {
        fetch("https://raw.githubusercontent.com/Meetesh-Saini/words/main/link.json", {
            method: "get",
        })
            .then((res) => res.json())
            .then((data) => {
                let url = data[wordlist];
                fetch(url, {
                    method: "get",
                })
                    .then((link_res) => link_res.text())
                    .then((words) => {
                        BOARD.current = new Crossword(words.split("\n"));
                        BOARD.current.make();
                        BOARD.current.show();
                        setDisplayBoard(stringEntryToDisplayEntry(BOARD.current.randomize(), BOARD.current.current, BOARD.current.getCorners()));
                    });
            });
    }

    const checkWord = async (word: string) => {
        let result = BOARD.current?.check(word);
        let corners = BOARD.current?.getCorners();

        if (result && corners) {
            const newBoard = displayBoard.map((row) => [...row]);
            for (let i = 0; i < result.word.length; i++) {
                const char = result.word[i];

                const row = corners.topleft.y - result.start.y + +(Direction.VERTICAL == result.dir) * i;
                const col = result.start.x - corners.topleft.x + +(Direction.HORIZONTAL == result.dir) * i;

                newBoard[row][col].value = char;
                newBoard[row][col].modifier = "+";
                setAnimatedTile({ row, col });
                setDisplayBoard(newBoard);
                await delay(150);
            }
            setAnimatedTile(null);
        }
    };

    const viewTile = (row: number, col: number) => {
        if (displayBoard[row][col].value != "#") return;

        const newBoard = displayBoard.map((row) => [...row]);
        const currentBoard = BOARD.current?.solvedBoard;
        newBoard[row][col].value = currentBoard![row][col]
        newBoard[row][col].modifier = "-";
        setDisplayBoard(newBoard);
    };

    const viewAll = async () => {
        if (!BOARD.current || !BOARD.current.current) return;

        let corners = BOARD.current.getCorners();
        const newBoard = displayBoard.map((row) => [...row]);
        for (let i = 0; i < BOARD.current.current.length; i++) {
            const element: CrosswordEntry = BOARD.current.current[i];
            for (let j = 0; j < element.word.length; j++) {
                const char = element.word[j];

                const row = corners.topleft.y - element.start.y + +(Direction.VERTICAL == element.dir) * j;
                const col = element.start.x - corners.topleft.x + +(Direction.HORIZONTAL == element.dir) * j;

                newBoard[row][col].value = char;
                newBoard[row][col].modifier = "+";
                setAnimatedTile({ row, col });
                setDisplayBoard(newBoard);
                await delay(150);
            }
        }
        setAnimatedTile(null);
    };

    const handleMode = () => {
        switch (mode) {
            case Mode.NORMAL:
                setCursor("");
                break;

            case Mode.PENCIL:
                setCursor("pencil-cursor");
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        handleMode();
    }, [mode]);

    return (
        <>
            <MainContext.Provider value={{ viewAll: viewAll }}>
                <ModeContext.Provider value={{ mode: mode, setMode: setMode }}>
                    <Header />
                    <AnswerBar checkWord={checkWord} />
                    <main className={`min-h-screen pt-24 pb-28 ${cursor}`}>
                        <div className="flex p-16 w-fit m-auto">
                            {displayBoard.map((row, rowIndex) => (
                                <>
                                    <div>
                                        {row.map((val, colIndex) => (
                                            <Tile
                                                key={`${rowIndex}-${colIndex}`}
                                                customCSS={{
                                                    visibility: val.value === " " ? "hidden" : "visible",
                                                    backgroundColor:
                                                        val.modifier != "" && TileColors[val.modifier]
                                                            ? TileColors[val.modifier]
                                                            : "white",
                                                }}
                                                className={
                                                    animatedTile &&
                                                        animatedTile.row === rowIndex &&
                                                        animatedTile.col === colIndex
                                                        ? "animate-beat"
                                                        : ""
                                                }
                                                onClick={() => {
                                                    if (mode == Mode.PENCIL) {
                                                        viewTile(rowIndex, colIndex);
                                                    }
                                                }}
                                            >
                                                {val.value === "#" ? " " : val.value}
                                            </Tile>
                                        ))}
                                    </div>
                                </>
                            ))}
                        </div>
                    </main>
                </ModeContext.Provider>
            </MainContext.Provider>
        </>
    );
}
