import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { supabase } from '../supabaseClient'
import Total from "../components/Total"







function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


const Study = () => {
    const navigate = useNavigate()
    const { deckId } = useParams()
    const [ deck, setDeck ] = useState(null)
    const [cards, setCards] = useState([])
    const [index, setIndex] = useState(0)
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false);


    //The process of getting the deckname inside the database
    useEffect(() => {
        if (finished) {
            const saveScore = async () => {
                const { data: userData } = await supabase.auth.getUser();
                const user = userData?.user;

                if (!user) {
                    console.error("No logged in user, cannot save score.");
                    navigate(`/total/${deckId}`);
                    return;
                }

                const { error } = await supabase
                    .from('quiz_attempts')
                    .insert([
                        {
                            user_id: user.id,
                            deck_id: deckId,
                            score: score,
                            total_questions: cards.length,
                        }
                    ]);

                if (error) {
                    console.error("Error saving score:", error);
                }

                navigate(`/total/${deckId}`);
            };

            saveScore();
        }
    }, [finished]);



    //The process of fetching the cards inside the database
    useEffect(() => {

        async function fetchCards() {

        const startTime = Date.now();
        const { data, error } = await supabase
            .from("cards")
            .select("*")
            .eq("deck_id", deckId);

        if (error) console.error("Error fetching cards:", error);
        else setCards(data);

        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;

        if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
        } else {
        setLoading(false);
        }
    }

        fetchCards();

    }, [deckId]);


    const card = cards[index];


     useEffect(() => {

        if (card) {
        const wrongAnswers = [card.option1, card.option2, card.option3].filter(Boolean);
        setOptions(shuffle([card.back, ...wrongAnswers]));
        setSelected(null);
        }

    }, [card]);


    useEffect(() => {

        if (finished) {
            navigate(`/total/${deckId}` )
        }
    }, [finished]);


    useEffect(() => {

        async function fetchDeck() {
            const { data, error } = await supabase
                .from("decks")
                .select("*")
                .eq("id", deckId)
                .single();

            if (error) console.error("Error fetching deck:", error);
            else setDeck(data);
        }

        fetchDeck();

    }, [deckId]);






    // this is the loading screen after clicking the study button
    if (loading) return(
        <div className="h-screen w-screen bg-gray-300 flex items-center justify-center">
            <p className=" bg-gray-300 text-3xl font-bold  ">
            <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-42 h-32" />
            Please wait...</p>
        </div>
    );


    if (!cards.length) return <p>No cards in this deck yet.</p>;

    function handleNext() {
    if (index + 1 < cards.length) {
        setIndex((i) => i + 1);
        } else {
            setFinished(true);
        }
    }

    function handleAnswer(opt) {
        setSelected(opt);
        if (opt === card.back) {
            setScore((s) => s + 1);
        }
    }






    return (

        <div className="w-screen h-screen bg-gray-300 flex flex-col items-center gap-4 pt-10">

            <div className="rounded-md relative flex items-center justify-center border-black border-2 gap-10 w-[55%] h-auto px-6">

                <div className="pb-10 pt-10 flex flex-row">
                    <button type="button" className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-centerr" onClick={() => navigate(`/cards/${deckId}`)}>
                        <X size={24} color="black" />
                    </button>



                    <h1 className="text-xl font-bold text-center">
                       <img src="/mortarboard.png" alt="mortarboard" className="inline-block w-8 h-8" /> { deck?.deckname}

                    </h1>
                </div>

                <div className="absolute right-5 flex flex-col gap-1">
                    <p className="font-bold text-md">
                        Card: {index + 1} / {cards.length}
                    </p>
                    <p className="font-bold text-md">
                        Score: {score}
                    </p>
                </div>

            </div>

            <form className="w-full px-10 flex flex-col items-center gap-4">

                <div className="w-[68%] flex-col gap-6 rounded-md border-black border-2 flex items-center justify-center min-h-[200px]">


                    {card.front_image_url && (
                        <img
                        src={card.front_image_url}
                        alt="front"
                        className="w-52 h-42 object-cover rounded-md ml-5 pt-5 "
                        />
                    )}

                    <h1 className="text-xl font-bold pb-5 ">{card.front} </h1>


                    {/* This is how you handle making if statement here in the index react */}
                    {selected ? (
                            <h1 className="font-bold text-3xl pb-5">{card.back}</h1>
                        ) : (
                            <h1 className="font-bold text-md pb-5">_ _ _ _</h1>
                        )}
                </div>

                <div className="w-[55%] flex flex-col items-center gap-4 py-6">

                    {/* Row 1: the answer choices */}
                    <div className="w-full flex flex-row items-center gap-4">
                        {options.map((opt) => {
                        const isPicked = selected === opt;
                        const isCorrect = opt === card.back;
                        return (
                            <button
                            type="button"
                            key={opt}
                            disabled={selected !== null}
                            onClick={() => handleAnswer(opt)}
                            className="w-full h-16 border-black border-2 rounded-md px-10 my-2 text-center font-bold text-md"
                            style={{
                                background:
                                selected && isPicked
                                    ? isCorrect ? "lightgreen" : "salmon"
                                    : selected && isCorrect
                                    ? "lightgreen"
                                    : "#d1d5db",
                            }}
                            >
                            {opt}
                            </button>
                        );
                        })}
                    </div>
                    {/* end of choices row */}

                    {/* Row 2: Next button, by itself */}
                    {selected && (
                        <button
                        type="button"
                        onClick={handleNext}
                        className="w-full px-10 py-3 border-black border-2 rounded-md font-bold"
                        >
                        Next
                        </button>

                    )}

                    </div>

            </form>

        </div>
    )
}
export default Study
