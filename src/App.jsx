import { useState } from "react";
import Quiz from "../components/Quiz";
import QuizHistory from "../components/QuizHistory";
import {toast, Toaster} from "react-hot-toast"

function App() {
  const [username, setUsername] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleStart = () => {
    if (username.trim()) {
      setStartQuiz(true);
      toast("Quiz Started")
    } else {
      toast("❌ Please Enter Username To Proceed")
    }
  };

  const handleHistoryButton = () => {
    setShowHistory(true);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {!startQuiz ? (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Enter Your Username</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleStart}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          <Quiz username={username} setShowHistory={setShowHistory}/>
          {showHistory ? <QuizHistory username={username} setShowHistory={setShowHistory}/> : <button className=" bg-blue-500 text-white mt-5 px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleHistoryButton}>Show History</button>}
        </div>
      )}
      <Toaster></Toaster>
    </div>
  );
}

export default App;
