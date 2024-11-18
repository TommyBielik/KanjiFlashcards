import { useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[message, setMessage] = useState("");

    const navigate = useNavigate();

    const addUser = async (event) => {

        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/signup",
                {
                    username: username,
                    password: password
                });

            if(response.status === 200) {
                alert("User registered successfully");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setMessage("");
                navigate("/login");
            }

        } catch(error) {
            if(error.response.status === 400) {
                setMessage("Username already exists");
            }
        }
    }

    const validatePasword = (password, confirmPassword) => {
        return password !== "" && password === confirmPassword;
    }

    return(
        <div className="register">
            <h1 className="japanese-text register-header">早い漢字</h1>
            <form className="register-card">
                <div className="register-container">
                    <div className="input-container">
                        <label htmlFor="username"
                               className="register-label">Username: </label>
                        <input
                            type="text"
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
                               className="register-label">Password: </label>
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
                    <div className="input-container">
                        <label htmlFor="confirm-password"
                               className="register-label">Confirm: </label>
                        <input type="password"
                               className="input"
                               id="confirm-password"
                               placeholder="Confirm password"
                               value={confirmPassword} onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        />
                    </div>
                    <p id="message">{message}</p>
                </div>
                <div className="register-btn-container">
                    <button
                        type="submit"
                        className="btn"
                        onClick={async (event) => {
                            event.preventDefault();
                            if (validatePasword(password, confirmPassword)) {
                                await addUser(event);
                            } else {
                                setMessage("Passwords do not match");
                            }
                        }}>Register
                    </button>
                </div>
            </form>
            <p className="signup-p">
                Already have an account? <a
                className="sign-up-a"
                onClick={() => navigate("/login")}>
                    Log in</a></p>
        </div>
    );
}

export default Register;