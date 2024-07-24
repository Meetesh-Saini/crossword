enum Direction {
    HORIZONTAL,
    VERTICAL,
}

type Coords = {
    x: number;
    y: number;
};

type CrosswordEntry = {
    word: string;
    dir: Direction;
    match: string;
    at: number;
    from: number;
    start: Coords;
    end: Coords;
    set: Set<string>;
};

class Crossword {
    private words: string[];
    private used_words = new Set<string>();
    private current: CrosswordEntry[] = [];

    constructor(words: string[]) {
        this.words = words;
    }

    /**
     * Gives unique random word from the collection
     * @returns {string} Random word from collection
     */
    getRandWord(): string {
        let index: number, word: string;
        do {
            // get random word
            index = Math.floor(Math.random() * this.words.length);
            word = this.words[index];
            // check if it is already used
        } while (this.used_words.has(word));
        // mark word as used
        this.used_words.add(word);
        return word;
    }

    d() {
        [
            ["apple", "h", "", 0, 0, [0, 0], [4, 0]],
            ["lion", "v", "apple", 3, 0, [3, 0], [3, -3]],
            [],
            // ["motion", "h", "lion", 2, 1, [2, -2], [7, -2]],
            // ["bat", "v", "motion", 2, 2, [4, 0], [4, -2]],
        ];
    }

    private overlappingWord(word: string, index: number = 0) {
        let set_word = new Set(word);
        for (let i = index; i < this.current.length; i++) {
            let element = this.current[i];
            let intersection = Array.from(element.set).filter((x) => set_word.has(x));
            if (intersection.length != 0) {
                return {
                    index: i,
                    common: intersection,
                };
            }
        }
        return null;
    }
    // @ts-ignore
    private intersectionPoints(
        matchStart: Coords,
        matchEnd: Coords,
        wordStart: Coords,
        wordEnd: Coords
    ): Coords[] | boolean {
        let wordDir = wordStart.x === wordEnd.x;
        let matchDir = matchStart.x === matchEnd.x;
        let points: Coords[] = [];

        // both lines are parallel
        if (wordDir === matchDir) {
            if ((wordDir && wordStart.x !== matchStart.x) || (!wordDir && wordStart.y !== matchStart.y)) {
                return true;
            }

            if (
                (wordDir &&
                    wordStart.x === matchStart.x &&
                    (wordEnd.y > matchStart.y + 1 || wordStart.y < matchEnd.y - 1)) ||
                (!wordDir &&
                    wordStart.y === matchStart.y &&
                    (wordEnd.x < matchStart.x - 1 || wordStart.x > matchEnd.x + 1))
            ) {
                return true;
            }

            if (
                (wordDir &&
                    wordStart.x === matchStart.x &&
                    ((wordStart.y > matchStart.y && wordEnd.y <= matchStart.y && wordEnd.y > matchEnd.y) ||
                        (wordEnd.y < matchEnd.y && wordStart.y < matchStart.y && wordStart.y >= matchEnd.y))) ||
                (!wordDir &&
                    wordStart.y === matchStart.y &&
                    ((wordStart.x < matchStart.x && wordEnd.x >= matchStart.x && wordEnd.x < matchEnd.x) ||
                        (wordEnd.x > matchEnd.x && wordStart.x > matchStart.x && wordStart.x <= matchEnd.x)))
            ) {
                return false;
            }
        }
        return points;
    }

    private checkPosition(entry: CrosswordEntry) {
        return entry;
    }

    add(word: string) {
        if (this.current.length === 0) {
            this.current.push({
                word: word,
                dir: Direction.HORIZONTAL,
                match: "",
                at: 0,
                from: 0,
                start: { x: 0, y: 0 },
                end: { x: word.length - 1, y: 0 },
                set: new Set(word),
            });
            console.log({
                word: word,
                dir: Direction.HORIZONTAL,
                match: "",
                at: 0,
                from: 0,
                start: { x: 0, y: 0 },
                end: { x: word.length - 1, y: 0 },
                set: new Set(word),
            });
            return;
        }
        let overlappingWordIndex = 0;
        let match: { index: number; common: string[] } | null;

        do {
            match = this.overlappingWord(word, overlappingWordIndex);

            if (match === null) return;

            for (let i = 0; i < match.common.length; i++) {
                const commonChar = match.common[i];
                const commonWordEntry = this.current[match.index];
                let matchCharIndex = -1;
                let wordCharIndex = -1;

                while ((matchCharIndex = commonWordEntry.word.indexOf(commonChar, matchCharIndex + 1)) != -1) {
                    while ((wordCharIndex = word.indexOf(commonChar, wordCharIndex + 1)) != -1) {
                        let direction: Direction;
                        let start: Coords;
                        let end: Coords;

                        if (commonWordEntry.dir === Direction.HORIZONTAL) {
                            direction = Direction.VERTICAL;
                            start = {
                                x: commonWordEntry.start.x + matchCharIndex,
                                y: commonWordEntry.start.y + wordCharIndex,
                            };
                            end = { x: start.x, y: start.y - word.length + 1 };
                        } else {
                            direction = Direction.HORIZONTAL;
                            start = {
                                x: commonWordEntry.start.x - wordCharIndex,
                                y: commonWordEntry.start.y + matchCharIndex,
                            };
                            end = { x: start.x + word.length - 1, y: start.y };
                        }

                        this.checkPosition({
                            word: word,
                            dir: direction,
                            at: matchCharIndex,
                            from: wordCharIndex,
                            match: commonWordEntry.word,
                            start: start,
                            end: end,
                            set: new Set(word),
                        });

                        console.log({
                            word: word,
                            dir: direction,
                            at: matchCharIndex,
                            from: wordCharIndex,
                            match: commonWordEntry.word,
                            start: start,
                            end: end,
                            set: new Set(word),
                        });
                    }
                }
            }

            overlappingWordIndex = match.index + 1;
        } while (match != null);
    }

    make() {
        while (this.current.length != 10) {
            let word = this.getRandWord();
            this.add(word);
        }
    }
}

export { Direction, Crossword };

/**
 *
 *          a p p l e
 *                i
 *              m o t i o n
 *                n
 */
