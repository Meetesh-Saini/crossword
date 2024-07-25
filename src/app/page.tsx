"use client";

import AnswerBar from "@/components/answerbar";
import Header from "@/components/header";
import Tile from "@/components/tile";
import { Crossword, Direction } from "@/utils/algo";
import { useRef, useState } from "react";

export default function Home() {
    const supported_lists = {
        English: "english-25k",
    };
    const BOARD = useRef<Crossword | null>(null);
    const [wordlist, setWordlist] = useState(supported_lists["English"]);
    const [displayBoard, setDisplayBoard] = useState<string[][]>([]);

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
                        setDisplayBoard(BOARD.current.randomize());
                    });
            });
    }

    const checkWord = (word: string) => {
        let result = BOARD.current?.check(word);
        let corners = BOARD.current?.getCorners();

        if (result && corners) {
            const newBoard = displayBoard.map((row) => [...row]);
            for (let i = 0; i < result.word.length; i++) {
                const char = result.word[i];

                const row = corners.topleft.y - result.start.y + +(Direction.VERTICAL == result.dir) * i;
                const col = result.start.x - corners.topleft.x + +(Direction.HORIZONTAL == result.dir) * i;

                newBoard[row][col] = char;
            }
            setDisplayBoard(newBoard);
        }
    };

    return (
        <>
            <Header />
            <AnswerBar checkWord={checkWord} />
            <main className="min-h-screen pt-24 pb-28 overflow-scroll">
                <div className="flex p-16 w-fit m-auto">
                    {displayBoard.map((row) => (
                        <>
                            <div>
                                {row.map((val) => (
                                    <Tile customCSS={val != " " ? {} : { visibility: "hidden" }}>
                                        {val == "#" ? " " : val}
                                    </Tile>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            </main>
        </>
    );
}
