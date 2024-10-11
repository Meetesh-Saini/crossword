import { useEffect, useState } from "react";

const DICT_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

interface MeaningEntry {
    partOfSpeech: string;
    definition: string;
}

const MeaningStore: { [key: string]: MeaningEntry[] } = {};

async function fetchMeaning(word: string): Promise<MeaningEntry[]> {
    if (MeaningStore[word]) return MeaningStore[word];

    let word_meaning: MeaningEntry[] = [];
    try {
        const response = await fetch(DICT_API + word);
        const data = await response.json();

        let meanings: { partOfSpeech: string; definitions: { definition: string }[] }[] = data[0].meanings;
        for (let i = 0; i < meanings.length; i++) {
            const element = meanings[i];
            word_meaning.push({
                partOfSpeech: element.partOfSpeech,
                definition: element.definitions[0].definition,
            });
        }
        MeaningStore[word] = word_meaning;
    } catch (err) {
        throw "Meaning not found";
    }
    return word_meaning;
}

function Meaning({ word }: { word: string }) {
    const [meanings, setMeanings] = useState<MeaningEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setMeanings(null);
        setLoading(true);
        setError(false);
        fetchMeaning(word)
            .then((result) => {
                setMeanings(result);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [word]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Not available</p>;

    return (
        <>
            {meanings?.map((elem, index) => (
                <div key={index}>
                    <p className="font-bold">{elem.partOfSpeech}</p>
                    <p>{elem.definition}</p>
                    <hr className="border-amber-900 bg-amber-900 text-amber-900" />
                </div>
            ))}
        </>
    );
}

export { Meaning };
