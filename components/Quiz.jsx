import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Quiz = ({ username, setShowHistory }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch("https://quiz-backend-gt79.onrender.com/api/questions", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setQuestions(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    const handleCorrectAnswer = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correctanswer || userInput == questions[currentQuestionIndex].correctanswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            handleCorrectAnswer();
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setSelectedAnswerIndex(null);
            setUserInput("");
            setTimeLeft(30);
        }else {
            handleCorrectAnswer();
            setQuizFinished(true);
        }
    };

    useEffect(() => {
        if (quizFinished) {
            saveQuizAttempt();
        }
    }, [quizFinished]);

    const saveQuizAttempt=async()=>{
        try {
            const res=await fetch("https://quiz-backend-gt79.onrender.com/api/quiz-history",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,score,totalquestions:questions.length})
            })
            const data=await res.json();
            if(data.error){
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (questions.length === 0)
        return <p className="text-center text-xl font-semibold mt-10 animate-pulse">Loading...</p>;

    if (quizFinished) {
        return (
            <div className="text-center mt-10 bg-white p-6 rounded-lg shadow-lg w-96 mx-auto border border-gray-200">
                <p className="text-2xl font-bold text-green-600">🎉 Quiz Finished!</p>
                <p className="text-lg mt-2">
                    Your Score: <span className="font-semibold">{score}/{questions.length}</span>
                </p>
                <button
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setTimeLeft(30);
                        setQuizFinished(false);
                        setShowHistory(false);
                    }}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-4"
                >
                    🔄 Retry Quiz
                </button>
            </div>
        );
    }
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 ">{currentQuestion.question}</h2>
            {currentQuestion.type === "MCQ" ? (
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <label
                            key={index}
                            className={`block p-4 border border-gray-300 rounded-md cursor-pointer transition duration-200 
                                ${selectedAnswerIndex === index ? "bg-gray-400" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswerIndex === index}
                                onChange={() => {
                                    if (index == 0) { setSelectedAnswer("A"); setSelectedAnswerIndex(0); }
                                    else if (index == 1) { setSelectedAnswer("B"); setSelectedAnswerIndex(1); }
                                    else if (index == 2) { setSelectedAnswer("C"); setSelectedAnswerIndex(2); }
                                    else { setSelectedAnswer("D"); setSelectedAnswerIndex(3); }
                                }}
                                className="hidden"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ) : (
                <div className="mb-6">
                    <input
                        type="number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your answer"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
            <div className="flex items-center justify-between mt-6 space-x-4 p-4 bg-gray-100 rounded-lg">
                <div className="text-lg font-semibold flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Score: {score}</span>
                </div>

                <div className={`text-lg font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700"} flex items-center space-x-2`}>
                    <span>⏳</span>
                    <span>Time Left: {timeLeft}s</span>
                </div>

                <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold text-lg"
                >
                    Next ➡️
                </button>
            </div>

        </div>
    );
};

export default Quiz;
