import {useNavigate, useParams} from "react-router-dom";
import Auth from "../utils/auth.js";


function Home(){

    const navigate = useNavigate();
    console.log(Auth.isAuthenticated());
    const {username} = useParams();

    return(
        <div className="homepage-container">
            <div className="homepage">
                <div className="homepage-header-div">
                    <h1 className="homepage-header">{username}</h1>
                </div>
                <div className="homepage-btn-container">
                    <button className = "homepage-btn" onClick={() => navigate(`/create/${username}`)}>Create deck</button>
                    <button className = "homepage-btn" onClick={() => navigate(`/browse/${username}`)}>Browse decks</button>
                </div>
                <p className="signup-p">
                    <a  className="sign-up-a"
                        onClick={() => {
                    Auth.logout()
                    navigate("/login");
                }}>Log out</a></p>
            </div>
        </div>
    );
}

export default Home;