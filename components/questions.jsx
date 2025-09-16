import { useEffect, useState } from "react"
import {decode} from 'html-entities';
import "/index.css"

export default function questions() {
    const [fetchedData,setFetchedData] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [correctAnswerArray, setCorrectAnswerArray] = useState([])
    const [checked, setChecked] = useState(false)
    const [newGame, setNewGame] = useState(false)
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(0)

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5)
    }



    useEffect(() => {
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        .then((res)=> res.json())
        .then((data)=> {
            const processedData = data.results.map(item => {
                return {
                    ...item,
                    shuffledAnswers: shuffleArray([...item.incorrect_answers,item.correct_answer ])
                }
            })
            setFetchedData(processedData)
            setLoading(false) })
        .catch((error) => console.log(error))
    }, [newGame]); 

    useEffect (()=> {
        if (fetchedData.length > 0) {
        setSelectedAnswers(Array(fetchedData.length).fill(null));
        setCorrectAnswerArray(fetchedData.map((q) => q.correct_answer)); 
        setChecked(false)
        setScore(0)
        }
    },[fetchedData])



    const questions =  fetchedData.map((item, index) => {
        const answers = item.shuffledAnswers.map((answer, answerIndex) => {
            return (
                <section key={`Q${index}-A${answerIndex}`}className="question-answers">
                    <button onClick={()=> isSelected(index, answer)} className={`answer-buttons 
                    ${selectedAnswers[index]=== answer ? "selected": ""} 
                    ${getAnswerClass(index, answer)}`}
                    disabled= {checked}
                    >{answer}</button>
                </section>
            );
        });
        const decodedQuestions = decode(item.question);
        function getAnswerClass(index, answer) {
            if (!checked) return "";
            if (answer === correctAnswerArray[index]) {
            return "correct";
            }
            if (selectedAnswers[index] === answer) {
            return "incorrect";
            }
            console.log("hey")
            return "null"
            }
        return (
            <>
                <div className="question-container">
                    <h2 className="question">{decodedQuestions}</h2>
                    <div className="answer-container">{answers}</div>
                </div>
                <hr />
            </>
        );
    })
    function isSelected(index, answer) {
        setSelectedAnswers(prev => {
            const updated = [...prev]
            updated[index] = updated[index] === answer ? null : answer
            return updated
            })
    }
    function submitAnswers() {
        setChecked(true)
        let newScore = 0;
        selectedAnswers.forEach((answer, index) => {
        if (answer === correctAnswerArray[index]) {
            newScore += 1;
        }
    
  });
  setScore(newScore);
}
    function playAgain() {
        setNewGame(prev => !prev)
        setSelectedAnswers([]);
        setCorrectAnswerArray([]);
        setChecked(false);
        setScore(0);
    }
    if (loading) 
        return <p className="loading">Loading Questions...</p>
return (
        <section className="main-container">
        {questions}
        <p className="results">{checked? `You scored ${score}/5 correct answers!`: ""}</p>
        <button onClick={checked? playAgain :submitAnswers} className="check-answer-btn">{checked? "Play again": "Check answers"}</button>
        </section>
    ) }