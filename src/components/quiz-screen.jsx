import { useState, useEffect } from "react"
import ReactMarkdown from 'react-markdown';

const QuizScreen = ({ quizData, currentQuestion, setCurrentQuestion, score, setScore, endQuiz }) => {
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showDetailedSolution, setShowDetailedSolution] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          endQuiz()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endQuiz])

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestionData = quizData.questions[currentQuestion]
    const correct = currentQuestionData.options[answerIndex].is_correct
    
    setSelectedAnswer(answerIndex)
    setIsCorrect(correct)
    setShowResult(true)
    setShowDetailedSolution(true)

    if (correct) {
      setScore(score + Number.parseFloat(quizData.correct_answer_marks))
    } else {
      setScore(score - Number.parseFloat(quizData.negative_marks))
    }
  }

  const handleNextQuestion = () => {
    setShowResult(false)
    setSelectedAnswer(null)
    setShowDetailedSolution(false)

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endQuiz()
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const currentQuestionData = quizData.questions[currentQuestion]

  return (
    <div>
      <div className="flex justify-between items-center mb-4 ">
        <div className="text-lg md:text-xl font-semibold text-white underline">
          Question {currentQuestion + 1}/{quizData.questions.length}
        </div>
        <div className="text-base md:text-xl font-semibold text-blue-200 border border-white rounded-xl p-2">Time Left: {formatTime(timeLeft)}</div>
      </div>
      <div className="mb-6">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold mb-7 text-white">{currentQuestionData.description}</h2>
        <div className="space-y-2">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-3 pl-4 rounded-xl text-blue-950 font-semibold cursor-pointer ${
                selectedAnswer === index 
                  ? (option.is_correct 
                      ? "bg-green-500 text-white" 
                      : "bg-red-500 text-white")
                  : "bg-white hover:bg-blue-200 hover:font-bold"
              } ${showResult ? "cursor-not-allowed" : ""}`}
            >
              {option.description}
            </button>
          ))}
        </div>
      </div>
      {showDetailedSolution && (
      
      <div className="flex justify-end mt-8 mb-5">
      
        <button
          onClick={handleNextQuestion}
          className=" bg-white text-blue-950 cursor-pointer hover:text-lg font-bold py-2 px-4 rounded-full transition duration-300"
        >
          {currentQuestion + 1 === quizData.questions.length ? "Finish" : "Next Question"}
        </button>
        </div>
      )}
      <div className="flex justify-center">
      {showResult && (
        <div className={`text-center text-lg md:text-xl max-w-md px-5 py-2 font-bold mb-4 border-5 rounded-xl bg-white ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </div>
      )}
      </div>
      {showDetailedSolution && (
        <div className="bg-white p-4 rounded-lg mb-4">
          <h3 className="text-lg md:text-xl font-bold text-center underline mb-4 text-blue-950">Detailed Solution</h3>
          
          <ReactMarkdown 
            components={{
              h2: ({node, ...props}) => <h2 className="text-lg font-semibold text-blue-700 mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-800 space-y-1" {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              p: ({node, ...props}) => <p className="text-gray-800 leading-relaxed" {...props} />
            }}
          >
            {currentQuestionData.detailed_solution}
            </ReactMarkdown>
        </div>
      )}
      {/* {showDetailedSolution && (
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          {currentQuestion + 1 === quizData.questions.length ? "Finish" : "Next Question"}
        </button>
      )} */}
    </div>
  )
}

export default QuizScreen