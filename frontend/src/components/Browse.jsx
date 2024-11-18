import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

function Browse() {

    const [decks, setDecks] = useState([]);
    const token = localStorage.getItem("authToken");
    const {username} = useParams();
    const navigate = useNavigate();

    const browseDecks = async () => {

        try {
            const response = await axios.get(
                "http://localhost:8080/decks/browse",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response.data);
            setDecks(response.data);
        } catch(error) {
            console.log(error);
        }
    }

    const deleteDeck = async(deckName) => {

        try{
            const response = await axios.post(
                "http://localhost:8080/decks/delete",
                null,
                {
                    params: {
                        name : deckName
                    },
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                })
            console.log(response);
            setDecks(decks.filter(deck => deck.name !== deckName));
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        browseDecks();
    }, []);

    return (
        <div className="browse">
                <div className="browse-header-div">
                    <h1 className="browse-header">Browse Decks</h1>
                </div>
                <div className="deck-cards-container">
                    {decks.length > 0 ? (
                        decks.map((deck) => (
                            <>
                                <div className="deck-container">
                                    <div key={deck.id}
                                         className="deck-card"
                                         onClick={() => navigate(
                                        `/${username}/${deck.name}`,
                                        {state: {deck}}
                                    )}>
                                        <h3>{deck.name}</h3>
                                        <p>Cards: {deck.flashcards.length}</p>
                                    </div>
                                    <div className="register-btn-container">
                                        <button className="delete-btn"
                                                onClick={() => deleteDeck(deck.name)}>Delete</button>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <p>No decks available</p>
                    )}
                </div>
            <div className="register-btn-container">
            <button className="btn"
                    onClick={() => navigate(`/home/${username}`)}>Home</button>
            </div>
        </div>
    );
}

export default Browse;