import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { valeraRound } from "./fonts";
import PullUp from "./pull_up";
import { Mode } from "@/utils/helper";

export default function AnswerBar({ checkWord }: { checkWord: (word: string) => void }) {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value.toLowerCase());
    };

    const handleCheck = () => {
        checkWord(inputValue);
    };

    return (
        <>
            <div className="fixed bottom-0 mb-24 left-1/2 -translate-x-1/2 flex">
                <PullUp />
                <div
                    className={`${valeraRound.className} flex border-4 border-l-0 rounded-l-none border-black rounded-xl overflow-hidden text-black text-xl`}
                >
                    <input
                        className="w-60 p-2 rounded-sm  outline-none"
                        type="text"
                        value={inputValue}
                        onChange={handleInput}
                        onSubmit={handleCheck}
                    />
                    <button onClick={handleCheck} className="w-12 bg-lime-400">
                        <svg
                            className="scale-75"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                        >
                            <path d="m10 8-7 6V2l7 6z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
