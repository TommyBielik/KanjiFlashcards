import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useRef, useState} from "react";

function DeckDetail() {

    const token = localStorage.getItem("authToken");

    const [translations, setTranslations] = useState(null);
    const [isTurned, setIsTurned] = useState(false);
    const [deckIndex, setDeckIndex] = useState(0);
    const {username} = useParams();

    const isFirstRender = useRef(true);
    const navigate = useNavigate();
    const location = useLocation();
    const deck = location.state?.deck;

    const LENGTH = deck.flashcards.length;


    function shuffleDeck(deck) {
        var LENGTH = deck.length;
        var temp, i;

        while(LENGTH) {
            i = Math.floor(Math.random() * LENGTH--);

            temp = deck[LENGTH];
            deck[LENGTH] = deck[i];
            deck[i] = temp;
        }
    }

    function next() {
        setDeckIndex((prevIndex) => (prevIndex + 1) % LENGTH);
        setIsTurned(false);
    }

    const getTranslations = async (sign) => {

        try {
            const response = await axios.post(
                "http://localhost:8080/flashcards/translations",
                null,
                {
                    params: {
                        sign: sign
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response.data);
            setTranslations(response.data);
        } catch (error){
            console.log(error.response);
        }
    }

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            shuffleDeck(deck.flashcards);
            getTranslations(deck.flashcards[deckIndex]);
        }
    }, [deckIndex])

    return (
        <div className="flashcard-container">
            <button className="btn deck-browse-btn"
                    onClick={() => navigate(`/browse/${username}`)}>Browse decks
            </button>
            {(!isTurned) ? (
                <>
                    <div className="flashcard">
                        <div className="card-back"
                             onClick={() => setIsTurned(true)}>
                            <h1 className="kanji-sign japanese-text">{deck.flashcards[deckIndex]}</h1>
                        </div>
                        <p className="click-p">Click the card to turn</p>
                    </div>
                </>
            ) : (
                <div className="flashcard">
                    <div className="card-front">
                        <h3 className="japanese-text card-back-text">{translations.readings}</h3>
                        <h3 className="japanese-text card-back-text">{translations.translations}</h3>
                    </div>
                    <div className="front-btn-container">
                        <button className="btn"
                                onClick={() => setIsTurned(false)}>Back
                        </button>
                        <button className="btn"
                                onClick={() => next()}>Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeckDetail;