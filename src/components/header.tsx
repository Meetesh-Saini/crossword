import { supperBubble } from "./fonts";

export default function Header() {
    return (
        <>
            <header className="fixed flex justify-between items-center p-4 text-white w-full">
                <h1
                    className={`${supperBubble.className} text-2xl font-bold bg-gradient-rainbow filter-black`}
                    style={{
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Crossword
                </h1>{" "}
                {/* Logo */}
                {/* <div className="flex items-center space-x-4"> Right section */}
                {/* <Tile>00:00:00</Tile> Timer */}
                {/* <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded">
          <CogIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Settings
        </button>  */}{" "}
                {/* Settings button */}
                {/* </div> */}
            </header>
        </>
    );
}
