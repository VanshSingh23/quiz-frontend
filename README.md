# Quiz Platform

A full-stack quiz platform built using the MERN (MongoDB, Express, React, Node.js) stack. Users can attempt multiple-choice and integer-type quizzes, receive instant feedback, track progress, and view quiz history.

## Features

- **User Authentication**: Enter a username to start the quiz.
- **MCQ & Integer-Based Questions**: Supports multiple-choice and integer-input questions.
- **Timer-Based Quiz**: Each question has a 30-second timer.
- **Instant Feedback**: Correct and incorrect answers are tracked.
- **Quiz History**: Users can view their past quiz attempts and scores.
- **Scoreboard**: Tracks user performance after each quiz attempt.
- **Backend API**: Fetches questions from MongoDB and saves quiz history.

## Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- react-hot-toast (for notifications)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js]
- [MongoDB]

### Installation

#### Clone the repository
```sh
git clone https://github.com/your-username/quiz-platform.git
cd quiz-platform
```

#### Install dependencies
For the frontend:
```sh
cd frontend
npm install
```
For the backend:
```sh
cd backend
npm install
```

### Running the Application

#### Start MongoDB
Ensure MongoDB is running on your local machine or connect to a MongoDB Atlas instance.

#### Start the Backend Server
```sh
cd backend
node index.js
```
Server runs at `http://localhost:5500`.

#### Start the Frontend
```sh
cd frontend
npm run dev
```
Frontend will be available at `http://localhost:3000`.

### API Endpoints

#### Fetch Questions
```
GET /api/questions
```
Returns a list of quiz questions.

#### Save Quiz Attempt
```
POST /api/quiz-history
Body: { "username": "string", "score": "number", "totalquestions": "number" }
```
Saves user quiz attempt details.

#### Fetch Quiz History
```
GET /api/quiz-history?username={username}
```
Returns past quiz attempts for a user.

### Deployed Application
Check out the live version here: [Quiz App](https://quiz-frontend-drab.vercel.app/)

