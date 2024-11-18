import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Auth from "../utils/auth.js";

function Deck() {

    const [sign, setSign] = useState("");
    const [message, setMessage] = useState("");
    const deck = useRef(new Set());
    const {username, deckId} = useParams();
    const token = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const fetchFlashcard = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8080/flashcards/add`, {
                    deckId: Number(deckId),
                    sign: sign
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(response);
            setMessage("Kanji added.");
        } catch(error) {
            console.log(error.response)
            setMessage("Something went wrong. Try again.");
        }
    }

    const addToDeck = (sign) => {
        deck.current.add(sign);
    }

    const isInDeck = (sign) => {
        return deck.current.has(sign);
    }

    const addFlashcard = (event) => {
        event.preventDefault();

        if(isInDeck(sign)) {
            setMessage("Already in deck");
        } else {
            addToDeck(sign);
            fetchFlashcard(event);
            setSign("");
        }
    }

    return(
        <div className="add-kanji-container">
            <button className="btn deck-browse-btn"
                    onClick={() => navigate(`/browse/${username}`)}>Browse decks
            </button>
            <form className="create-deck-form"
                  onSubmit={addFlashcard}>
                <div className="add-flashcard-container">
                    <label className="create-label"
                           htmlFor="flashcard-input">Add kanji:</label>
                    <input
                        type="text"
                        className="add-kanji-input"
                        id="flashcard-input"
                        placeholder="  字"
                        value={sign}
                        onChange={(event) => {
                            setSign(event.target.value);
                        }}/>
                    <p>{message}</p>
                    <button className="btn"
                            type="submit">Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Deck;