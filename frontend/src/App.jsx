import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import './App.css'
import Login from "./components/Login.jsx";
import Create from "./components/Create.jsx";
import Browse from "./components/Browse.jsx";
import Auth from "./utils/auth.js";
import Deck from "./components/Deck.jsx";
import DeckDetail from "./components/DeckDetail.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<Login/>}/>
                  <Route path="/home/:username" element={Auth.isAuthenticated ? <Home/> : <Navigate to="/login"/>}/>
                  <Route path="/signup" element={ <Register/>} />
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/create/:username" element={Auth.isAuthenticated ? <Create/> : <Navigate to="/login"/>}/>
                  <Route path="/deck/:username/:deckId" element={Auth.isAuthenticated ? <Deck/> : <Navigate to="/login"/>} />
                  <Route path="/browse/:username" element={Auth.isAuthenticated ? <Browse/> : <Navigate to="/login"/>}/>
                  <Route path="/:username/:deckName" element={Auth.isAuthenticated ? <DeckDetail/> : <Navigate to="/login"/>}/>
                </Routes>
            </BrowserRouter>
      </>
  );
}

export default App
