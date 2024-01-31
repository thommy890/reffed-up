import React, { useState, useEffect, useRef } from 'react';

const StepReviewer = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const topRef = useRef(null);
  const questionRefs = useRef([]);

  const mockQuestions = [
    {
      question: "Which planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Jupiter", "Earth", "Venus"]
    },
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"]
    },
    {
      question: "What is the largest mammal in the world?",
      correct_answer: "Blue Whale",
      incorrect_answers: ["Elephant", "Giraffe", "Hippopotamus"]
    },
    {
      question: "In what year did the Titanic sink?",
      correct_answer: "1912",
      incorrect_answers: ["1910", "1911", "1913"]
    },
    {
      question: "What is the smallest country in the world?",
      correct_answer: "Vatican City",
      incorrect_answers: ["Monaco", "Nauru", "San Marino"]
    }
  ];

  useEffect(() => {
    setQuestions(mockQuestions);
    questionRefs.current = mockQuestions.map((_, i) => questionRefs.current[i] || React.createRef());
  }, []);

  const handleAnswerSelect = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
    if (index < questions.length - 1) {
      questionRefs.current[index + 1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const calculateResults = () => {
    return Object.keys(answers).reduce((total, questionIndex) => {
      if (answers[questionIndex] === questions[questionIndex].correct_answer) {
        return total + 1;
      }
      return total;
    }, 0);
  };

  const showResultsAndScrollToTop = () => {
    setShowResults(true);
    topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-2xl px-4 py-5 bg-white shadow-lg rounded">
        <div ref={topRef} className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-10">Quiz</h2>
          {showResults && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">Results</p>
              <p>You got {calculateResults()} out of {questions.length} questions correct.</p>
            </div>
          )}
        </div>
        <div>
          {questions.map((question, index) => (
            <div
              ref={questionRefs.current[index]}
              key={index}
              className="mb-48 p-6 bg-white shadow-lg rounded-lg"
            >
              <h3 
                className="text-xl font-semibold mb-4"
                dangerouslySetInnerHTML={{ __html: question.question }} 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...question.incorrect_answers, question.correct_answer]
                  .sort(() => Math.random() - 0.5)
                  .map((answer, ansIndex) => (
                    <button
                      key={ansIndex}
                      onClick={() => handleAnswerSelect(index, answer)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                ))}
              </div>
            </div>
          ))}
        </div>
        {!showResults && (
          <div className="text-center mt-10">
            <button 
              onClick={showResultsAndScrollToTop} 
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepReviewer;
