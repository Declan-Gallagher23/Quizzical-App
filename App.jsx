import React from "react"
import "./index.css"
import Questions from "./components/questions.jsx" 

export default function App() {
    const [play, setPlay] = React.useState(false)
    return (
        <>
        {play ? 
        (<Questions/>) : (
        <div id="loading_screen">
        <h1>Quizzical</h1>
        <p id="description-text">Quizzical is an interactive quiz game built with React, where players answer multiple-choice questions, check their score, and replay to test their knowledge.</p>
        <button onClick={()=> {setPlay(true)}} id="start_game_btn">Start Quiz</button>
        </div> )}
    </>
    );
}