import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Auth from "../utils/auth.js";

function Create() {

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const {username} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const createDeck = async (event) => {

        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/decks/create",
                null,
                {
                    params: {
                        name: name
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setMessage("Deck created!")
            const deckId = response.data.id;
            navigate(`/deck/${username}/${deckId}`);
        } catch(error) {
            alert(error);
            console.log(error.response);
        }
    }

    return(
        <div className="create">
            <form className="create-deck-form"
                  onSubmit={createDeck}>
                <label className="create-label"
                       htmlFor="kanji">Name: </label>
                <input id="kanji"
                       className="create-input"
                       placeholder="Deck name"
                       type="text"
                       value={name}
                       onChange={(event) => {
                    setName(event.target.value);
                }}/>
                <button type="submit"
                        className="btn">Create</button>
            </form>
        </div>
    );
}

export default Create;