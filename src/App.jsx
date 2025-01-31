import { useState, useEffect } from "react"
import StartScreen from "./components/start-screen"
import QuizScreen from "./components/quiz-screen"
import ResultScreen from "./components/result-screen"
import { FaGoogleScholar } from "react-icons/fa6";

const App = () => {
  const [quizState, setQuizState] = useState("loading")
  const [quizData, setQuizData] = useState(null)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [error, setError] = useState(null)
  const [countdownTimer, setCountdownTimer] = useState(3)

  useEffect(() => {
    fetchQuizData()
  }, [])

  const fetchQuizData = async () => {
    try {
        // const response = await fetch('/api/Uw5CrX')
        const response = await fetch('https://api.jsonserve.com/Uw5CrX')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setQuizData(data)
      setQuizState("start")
    } catch (error) {
      console.error("Error fetching quiz data:", error)
      setError(error.message)
      setQuizState("error")
    }
  }


  const endQuiz = () => {
    setQuizState("result")
  }

  const startQuiz = () => {
    setQuizState("countdown")
    const countdownInterval = setInterval(() => {
      setCountdownTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdownInterval)
          setQuizState("quiz")
          return 3
        }
        return prevTimer - 1
      })
    }, 1000)
  }

  const restartQuiz = () => {
    setQuizState("start")
    setScore(0)
    setCurrentQuestion(0)
  }

  if (quizState === "loading") {
    return <div className="min-h-screen flex items-center justify-center border-2 border-blue-950 p-5 text-center text-bold text-2xl">Loading quiz data...</div>
  }

  if (quizState === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-2xl text-red-600">
        Error loading quiz data: {error}. Please try again later.
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="w-full max-w-2xl mx-5 lg:mx-0 lg:max-w-4xl p-8 bg-blue-950 rounded-lg shadow-lg">
        {quizState === "start" && <StartScreen quizData={quizData} onStart={startQuiz} />}
        {quizState === "countdown" && (
          <div className="text-4xl lg:text-6xl font-bold text-center text-white flex justify-center">
            <span className="mr-4"><FaGoogleScholar /></span>
            Quiz begins in: {countdownTimer}
          </div>
        )}

        {quizState === "quiz" && (
          <QuizScreen
            quizData={quizData}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            score={score}
            setScore={setScore}
            endQuiz={endQuiz}
          />
        )}
        {quizState === "result" && (
          <ResultScreen 
            score={score} 
            totalQuestions={quizData.questions.length} 
            onRestart={restartQuiz} 
          />
        )}
      </div>
    </div>
  )
}

export default App