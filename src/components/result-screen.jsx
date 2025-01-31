 
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const ResultScreen = ({ score, totalQuestions, onRestart }) => {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);

  const detectSize = () => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener('resize', detectSize);
      clearTimeout(timer);
    };
  }, [setWindowDimension]); // Added setWindowDimension to dependencies

  const percentage = Math.round((score / (totalQuestions * 4)) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent! 🏆 You're a true expert!";
    if (percentage >= 75) return "Great job! 🎓 You're really knowledgeable.";
    if (percentage >= 60) return "Good work! 👏 You're on the right track.";
    if (percentage >= 40) return "Not bad. 📕 Keep practicing!";
    return "Need more study. 📚 Don't give up!";
  };

  return (
    <div className="text-center text-white">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <h2 className="text-2xl md:text-3xl font-bold mb-8">🎉 Quiz Completed! 🎉</h2>
      <p className="text-xl md:text-2xl mb-4">
        Your Score: {score.toFixed(1)} / {totalQuestions * 4}
      </p>
      <p className="text-xl mb-6">Percentage: {percentage}%</p>
      <p className="text-xl mb-6">{getPerformanceMessage()}</p>
      <button
        onClick={onRestart}
        className="bg-white hover:text-lg cursor-pointer text-blue-950 font-bold py-2 px-4 rounded-full transition duration-300"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultScreen;

// const ResultScreen = ({ score, totalQuestions, onRestart }) => {
//     const percentage = Math.round((score / (totalQuestions * 4)) * 100)
  
//     return (
//       <div className="text-center text-white">
//         <h2 className="text-2xl md:text-3xl font-bold mb-8">Quiz Completed!</h2>
//         <p className="text-xl md:text-2xl mb-4">
//           Your Score: {score.toFixed(1)} / {totalQuestions * 4}
//         </p>
//         <p className="text-xl mb-6">Percentage: {percentage}%</p>
//         <button
//           onClick={onRestart}
//           className="bg-white hover:text-lg cursor-pointer text-blue-950 font-bold py-2 px-4 rounded-full transition duration-300"
//         >
//           Restart Quiz
//         </button>
//       </div>
//     )
//   }
  
//   export default ResultScreen