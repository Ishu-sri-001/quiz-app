const ResultScreen = ({ score, totalQuestions, onRestart }) => {
    const percentage = Math.round((score / (totalQuestions * 4)) * 100)
  
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-2xl mb-4">
          Your Score: {score.toFixed(1)} / {totalQuestions * 4}
        </p>
        <p className="text-xl mb-6">Percentage: {percentage}%</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Restart Quiz
        </button>
      </div>
    )
  }
  
  export default ResultScreen
  
  