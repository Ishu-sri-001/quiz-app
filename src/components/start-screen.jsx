import React from 'react';

const StartScreen = ({ quizData, onStart }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white w-full h-full">
        <div className="text-center p-8 rounded-lg shadow-lg max-w-xs lg:max-w-xl w-full border border-blue-800 bg-blue-950">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{quizData.title}</h1>
          <p className="text-base md:text-xl mb-4 text-white">Duration: <span className='text-gray-300'> {quizData.duration} minutes</span></p>
          <p className="text-xl md:text-2xl mb-2 text-white font-semibold">Topic: {quizData.topic}</p>
          <p className="text-sm md:text-lg mb-6 text-gray-300">Total Questions: {quizData.questions_count}</p>
          <button
            onClick={onStart}
            className="bg-white text-blue-950 font-bold py-2 px-4 rounded-full hover:font-bold cursor-pointer hover:text-xl"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
}
  
export default StartScreen;