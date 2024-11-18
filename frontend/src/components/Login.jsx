import axios from "axios";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username : username,
                password : password
            });

            if(response.status === 200) {
                const {token, expiresIn} = response.data;
                const expirationTime = new Date().getTime() + expiresIn;

                localStorage.setItem("authToken", token);
                localStorage.setItem("tokenExpiration", expirationTime);
                setLoggedIn(true);
            }
        } catch(error) {
            console.error(error.response);
            alert(error);
        }
    }

    useEffect(() => {
        if(isLoggedIn) {
            navigate(`/home/${username}`)
        }
    }, [isLoggedIn, navigate])

    return(
        <div className="register">
            <h1 className="japanese-text register-header">早い漢字</h1>
            <form className="register-card" onSubmit={loginUser}>
                <div className="input-container">
                    <label htmlFor="username"
                           className="register-label">Username:</label>
                    <input type="text"
                           className="input"
                           id="username"
                           placeholder="Username"
                           value={username}
                           onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password"
                           className="register-label">Password:</label>
                    <input
                        type="password"
                        className="input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                    />
                </div>
                <div className="register-btn-container">
                <button type="submit"
                        className="btn">Log in</button>
                </div>
            </form>
            <p className="signup-p">
                Don`t have account? <a className="sign-up-a"
                                       onClick={() => {navigate("/signup")}}>Sign up</a></p>
        </div>
    );
}

export default Login;