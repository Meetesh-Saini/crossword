import { valeraRound } from "./fonts";

export default function Dialog({
    children,
    heading,
    setShowDialog,
}: {
    children: React.ReactNode;
    heading: string;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <div
                className={`${valeraRound.className} fixed w-[28rem] max-h-96 z-10 right-0 mr-4 border-4 p-4 border-black rounded-lg bg-amber-300 text-amber-900 overflow-auto`}
            >
                <div className="w-full flex justify-between">
                    <p className="font-bold text-2xl">{heading}</p>
                    <button
                        onClick={() => setShowDialog(false)}
                        className="rounded-full border-4 border-amber-900 p-1.5"
                    >
                        <svg
                            height="1rem"
                            width="1rem"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 232.468 232.468"
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    d="M171.204,3.192l-42.697,42.702c-4.248,4.248-11.134,4.248-15.382,0L73.475,6.244
                            c-4.248-4.248-11.134-4.248-15.382,0L6.237,58.105c-4.248,4.248-4.248,11.134,0,15.382l39.656,39.651
                            c4.248,4.248,4.248,11.134,0,15.382L3.186,171.227c-4.248,4.248-4.248,11.134,0,15.382l42.691,42.669
                            c4.248,4.248,11.134,4.248,15.382,0l42.691-42.691c4.248-4.248,11.134-4.248,15.382,0l39.645,39.634
                            c4.248,4.248,11.134,4.248,15.382,0l51.861-51.861c4.248-4.248,4.248-11.134,0-15.387l-39.629-39.645
                            c-4.248-4.248-4.248-11.139,0-15.387l42.691-42.691c4.248-4.248,4.248-11.134,0-15.382L186.591,3.176
                            C182.338-1.056,175.457-1.056,171.204,3.192z"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </>
    );
}
