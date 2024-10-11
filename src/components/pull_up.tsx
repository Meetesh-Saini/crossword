import { MainContext, Mode, ModeContext } from "@/utils/helper";
import React, { MouseEventHandler, useContext, useEffect, useState } from "react";

function Button({
    children,
    className = "",
    onClick = () => {},
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <>
            <button
                onClick={onClick}
                className={`flex m-0 bold text-[1.8rem] text-center justify-center items-center w-14 h-14 bg-amber-300 border-4 border-black rounded-lg text-amber-900 p-2 ${className}`}
            >
                {children}
            </button>
        </>
    );
}

export default function PullUp() {
    const [open, setOpen] = useState(false);
    const { mode, setMode } = useContext(ModeContext)!;
    const { viewAll } = useContext(MainContext)!;

    return (
        <>
            <div>
                <Button
                    className={`absolute ${open ? "-top-[108px]" : "top-0"} transition-[top] ${open ? "duration-200" : "duration-100"}`}
                    onClick={viewAll}
                >
                    <svg
                        className="pointer-events-none"
                        fill="currentColor"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title />
                        <circle cx="256" cy="256" r="64" />
                        <path d="M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96c-42.52,0-84.33,12.15-124.27,36.11C90.66,156.54,53.76,192.23,21.71,238.18a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416c46.71,0,93.81-14.43,136.2-41.72,38.46-24.77,72.72-59.66,99.08-100.92A32.2,32.2,0,0,0,490.84,238.6ZM256,352a96,96,0,1,1,96-96A96.11,96.11,0,0,1,256,352Z" />
                    </svg>
                </Button>
                <Button
                    className={`absolute ${open ? "-top-[54px]" : "top-0"} transition-[top] duration-100 ${!open ? "duration-100" : "duration-200"}`}
                    onClick={() => {
                        mode != Mode.PENCIL ? setMode(Mode.PENCIL) : setMode(Mode.NORMAL);
                    }}
                >
                    <svg
                        className="pointer-events-none"
                        id="Layer_2"
                        fill="currentColor"
                        version="1.1"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path d="M27.20001,1.64996c-1.53003-1.52997-4.02002-1.52997-5.54999,0L3.13,20.16998C2.94,20.37,2.81,20.60999,2.72998,20.87   l-2.19,8.77002C0.41998,30.14996,0.57001,30.69,0.94,31.06s0.91998,0.51996,1.41998,0.39001L11.13,29.26996   c0.26001-0.07996,0.5-0.21997,0.70001-0.39996l18.51996-18.52002C31.09003,9.60999,31.5,8.62,31.5,7.57996   c0-1.04999-0.40997-2.03998-1.15002-2.77997L27.20001,1.64996z M10.77002,25.69L6.31,21.22998l13-13.01001l4.46002,4.46002   L10.77002,25.69z" />
                        </g>
                    </svg>
                </Button>
                <Button
                    className="relative rounded-r-none"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <svg
                        className="pointer-events-none"
                        fill="currentColor"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title />
                        <path d="M288,464H224a16,16,0,0,0,0,32h64a16,16,0,0,0,0-32Z" />
                        <path d="M304,416H208a16,16,0,0,0,0,32h96a16,16,0,0,0,0-32Z" />
                        <path d="M369.42,62.69C339.35,32.58,299.07,16,256,16A159.62,159.62,0,0,0,96,176c0,46.62,17.87,90.23,49,119.64l4.36,4.09C167.37,316.57,192,339.64,192,360v24a16,16,0,0,0,16,16h24a8,8,0,0,0,8-8V274.82a8,8,0,0,0-5.13-7.47A130.73,130.73,0,0,1,208.71,253,16,16,0,1,1,227.29,227c7.4,5.24,21.65,13,28.71,13s21.31-7.78,28.73-13A16,16,0,0,1,303.29,253a130.73,130.73,0,0,1-26.16,14.32,8,8,0,0,0-5.13,7.47V392a8,8,0,0,0,8,8h24a16,16,0,0,0,16-16V360c0-19.88,24.36-42.93,42.15-59.77l4.91-4.66C399.08,265,416,223.61,416,176A159.16,159.16,0,0,0,369.42,62.69Z" />
                    </svg>
                </Button>
            </div>
        </>
    );
}
