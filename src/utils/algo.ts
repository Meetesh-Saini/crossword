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
    private top_left: Coords = { x: 0, y: 0 };
    private bottom_right: Coords = { x: 0, y: 0 };

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

    private lies_in(x1: number, x2: number, p: number): boolean {
        return (p >= x1 && p <= x2) || (p <= x1 && p >= x2);
    }

    private validIntersection(wordEntry: CrosswordEntry, matchEntry: CrosswordEntry): boolean {
        // both lines are parallel
        if (wordEntry.dir == matchEntry.dir) {
            let invalid: boolean;
            if (wordEntry.dir == Direction.HORIZONTAL) {
                invalid =
                    [-1, 0, 1].includes(wordEntry.start.y - matchEntry.start.y) &&
                    (this.lies_in(matchEntry.start.x - 1, matchEntry.end.x + 1, wordEntry.start.x) ||
                        this.lies_in(matchEntry.start.x - 1, matchEntry.end.x + 1, wordEntry.end.x) ||
                        this.lies_in(wordEntry.start.x, wordEntry.end.x, matchEntry.start.x - 1) ||
                        this.lies_in(wordEntry.start.x, wordEntry.end.x, matchEntry.end.x + 1));
            } else {
                invalid =
                    [-1, 0, 1].includes(wordEntry.start.x - matchEntry.start.x) &&
                    (this.lies_in(matchEntry.start.y + 1, matchEntry.end.y - 1, wordEntry.start.y) ||
                        this.lies_in(matchEntry.start.y + 1, matchEntry.end.y - 1, wordEntry.end.y) ||
                        this.lies_in(wordEntry.start.y, wordEntry.end.y, matchEntry.start.y + 1) ||
                        this.lies_in(wordEntry.start.y, wordEntry.end.y, matchEntry.end.y - 1));
            }

            return !invalid;
        }
        // lines are not parallel
        else {
            if (wordEntry.dir == Direction.HORIZONTAL) {
                // Far up or down
                if (wordEntry.start.y - matchEntry.start.y > 1 || wordEntry.start.y - matchEntry.end.y < -1)
                    return true;

                // Y-axis is close. Check X-axis.
                if (wordEntry.start.y - matchEntry.start.y == 1 || wordEntry.start.y - matchEntry.end.y == -1)
                    return !this.lies_in(wordEntry.start.x, wordEntry.end.x, matchEntry.start.x);

                // Y-axis lies in between. Check if X-axis is close.
                if (wordEntry.start.x - matchEntry.start.x == 1 || wordEntry.end.x - matchEntry.start.x == -1)
                    return false;

                // Y-axis lies in between but far right or left.
                if (wordEntry.start.x - matchEntry.start.x > 1 || wordEntry.end.x - matchEntry.start.x < -1)
                    return true;

                // Intersects at one point. Check the intersection.
                return (
                    wordEntry.word[matchEntry.start.x - wordEntry.start.x] ==
                    matchEntry.word[matchEntry.start.y - wordEntry.start.y]
                );
            } else {
                // Far left or right
                if (wordEntry.start.x - matchEntry.start.x < -1 || wordEntry.start.x - matchEntry.end.x > 1)
                    return true;

                // X-axis is close. Check Y-axis.
                if (wordEntry.start.x - matchEntry.start.x == -1 || wordEntry.start.x - matchEntry.end.x == 1)
                    return !this.lies_in(wordEntry.start.y, wordEntry.end.y, matchEntry.start.y);

                // X-axis lies in between. Check if Y-axis is close.
                if (wordEntry.start.y - matchEntry.start.y == -1 || wordEntry.end.y - matchEntry.start.y == 1)
                    return false;

                // X-axis lies in between but far up or down.
                if (wordEntry.start.y - matchEntry.start.y < -1 || wordEntry.end.y - matchEntry.start.y > 1)
                    return true;

                // Intersects at one point. Check the intersection.
                return (
                    wordEntry.word[wordEntry.start.y - matchEntry.start.y] ==
                    matchEntry.word[wordEntry.start.x - matchEntry.start.x]
                );
            }
        }
    }

    private checkPosition(entry: CrosswordEntry): boolean {
        for (let index = 0; index < this.current.length; index++) {
            const element = this.current[index];
            // return if not valid
            if (!this.validIntersection(entry, element)) {
                return false;
            }
        }
        return true;
    }

    add(word: string): boolean {
        if (this.current.length === 0) {
            let newCrosswordEntry: CrosswordEntry = {
                word: word,
                dir: Direction.HORIZONTAL,
                match: "",
                at: 0,
                from: 0,
                start: { x: 0, y: 0 },
                end: { x: word.length - 1, y: 0 },
                set: new Set(word),
            };

            this.current.push(newCrosswordEntry);

            this.top_left = Object.assign({}, newCrosswordEntry.start);
            this.bottom_right = Object.assign({}, newCrosswordEntry.end);

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
            return true;
        }

        let overlappingWordIndex = 0;
        let match: { index: number; common: string[] } | null;

        do {
            match = this.overlappingWord(word, overlappingWordIndex);

            if (match === null) return false;

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
                                y: commonWordEntry.start.y - matchCharIndex,
                            };
                            end = { x: start.x + word.length - 1, y: start.y };
                        }

                        let newCrosswordEntry: CrosswordEntry = {
                            word: word,
                            dir: direction,
                            at: matchCharIndex,
                            from: wordCharIndex,
                            match: commonWordEntry.word,
                            start: start,
                            end: end,
                            set: new Set(word),
                        };
                        let validEntry = this.checkPosition(newCrosswordEntry);

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
                        console.log("wordCharIndex", wordCharIndex);
                        console.log("matchCharIndex", matchCharIndex);

                        if (validEntry) {
                            this.current.push(newCrosswordEntry);
                            console.log("valid");
                            this.top_left.x = Math.min(this.top_left.x, newCrosswordEntry.start.x);
                            this.top_left.y = Math.max(this.top_left.y, newCrosswordEntry.start.y);
                            this.bottom_right.x = Math.max(this.bottom_right.x, newCrosswordEntry.end.x);
                            this.bottom_right.y = Math.min(this.bottom_right.y, newCrosswordEntry.end.y);
                            return true;
                        }
                    }
                }
            }

            overlappingWordIndex = match.index + 1;
        } while (match != null);

        return false;
    }

    make() {
        while (this.current.length != 10) {
            let word = this.getRandWord();
            this.add(word);
        }
    }

    clear() {
        this.used_words = new Set<string>();
        this.current = [];
        this.top_left = { x: 0, y: 0 };
        this.bottom_right = { x: 0, y: 0 };
    }

    show(): string[][] {
        const n = this.bottom_right.x - this.top_left.x + 1;
        const m = this.top_left.y - this.bottom_right.y + 1;

        let board = [...Array(m)].map((_) => Array<string>(n).fill(" "));

        for (let i = 0; i < this.current.length; i++) {
            const element = this.current[i];
            for (let j = 0; j < element.word.length; j++) {
                const char = element.word[j];

                const row = this.top_left.y - element.start.y + +(Direction.VERTICAL == element.dir) * j;
                const col = element.start.x - this.top_left.x + +(Direction.HORIZONTAL == element.dir) * j;

                board[row][col] = char;
            }
        }

        let display = board.map((x) => x.join(" ")).join("\n");

        console.log(board);
        console.log(this.top_left);
        console.log(this.bottom_right);
        console.log(display);

        return board;
    }

    randomize(): string[][] {
        const n = this.bottom_right.x - this.top_left.x + 1;
        const m = this.top_left.y - this.bottom_right.y + 1;

        let board = [...Array(m)].map((_) => Array<string>(n).fill(" "));

        for (let i = 0; i < this.current.length; i++) {
            const element = this.current[i];
            let choose = Math.floor(Math.random() * 2) + 1;
            for (let j = 0; j < element.word.length; j++) {
                const char = element.word[j];

                const row = this.top_left.y - element.start.y + +(Direction.VERTICAL == element.dir) * j;
                const col = element.start.x - this.top_left.x + +(Direction.HORIZONTAL == element.dir) * j;

                board[row][col] = choose ? "#" : char;
                console.log(choose);
                choose = !choose ? Math.floor(Math.random() * 2) + 1 : --choose;
            }
        }
        let display = board.map((x) => x.join(" ")).join("\n");
        console.log(this.top_left);
        console.log(this.bottom_right);
        console.log(display);
        return board;
    }

    check(word: string): CrosswordEntry | null {
        for (let index = 0; index < this.current.length; index++) {
            const element = this.current[index];
            if (element.word == word) return element;
        }
        return null;
    }

    getCorners(): { topleft: Coords; bottomright: Coords } {
        return { topleft: Object.assign({}, this.top_left), bottomright: Object.assign({}, this.bottom_right) };
    }
}

export { Direction, Crossword };

/**
 *          b
 *          a p p l e
 *          t     i     t
 *              m o t i o n
 *                n     i
 *                      l
 *                      e
 *                      t
 *
 *
 */
