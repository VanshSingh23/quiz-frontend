import { useState, useEffect } from "react";

const QuizHistory = ({username, setShowHistory}) => {
  const [attempts, setAttempts] = useState([]);
  
    useEffect(()=>{
        const getQuizAttempt=async()=>{
            try {
                const res=await fetch(`https://quiz-backend-gt79.onrender.com/api/quiz-history?username=${username}`,{
                    method:"GET",
                    headers:{"Content-Type":"application/json"},
                })
                const data=await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setAttempts(data);
            } catch (error) {
                toast.error(error.message);
            }
        }
        if(username) getQuizAttempt();
    },[username])

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">📜 Quiz History</h2>
      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <div>
          <ul className="space-y-2">
          {attempts.map((attempt, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              <div className="text-lg font-medium">Attempts : {index+1}</div>
              <strong>{attempt.username}</strong> - {attempt.score}/{attempt.totalquestions}
            </li>
          ))}
        </ul>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-4" onClick={()=>setShowHistory(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
