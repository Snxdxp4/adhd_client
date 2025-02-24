import { useState } from "react";
import Api from "../api/axios";
import { useNavigate } from "react-router";

const ADHDAssessment = () => {
  const questions = [
    { id: 1, text: "Trouble wrapping up final details" },
    { id: 2, text: "Difficulty getting things in order" },
    { id: 3, text: "Problems remembering appointments" },
    { id: 4, text: "Avoiding or delaying difficult tasks" },
    { id: 5, text: "Fidgeting when sitting for long" },
    { id: 6, text: "Feeling overly active" },
    { id: 7, text: "Making careless mistakes" },
    { id: 8, text: "Difficulty keeping attention" },
    { id: 9, text: "Difficulty concentrating on speech" },
    { id: 10, text: "Misplacing or losing things" },
    { id: 11, text: "Distracted by activity or noise" },
    { id: 12, text: "Leaving seat in meetings" },
    { id: 13, text: "Feeling restless or fidgety" },
    { id: 14, text: "Talking too much in social situations" },
    { id: 15, text: "Finishing others' sentences" },
    { id: 16, text: "Interrupting others" },
    { id: 17, text: "Difficulty unwinding and relaxing" },
    { id: 18, text: "Difficulty waiting turn" },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(null);
  const handleAnswerChange = (questionText, value) => {
    setAnswers((prev) => {
      const updated = {
        ...prev,
        [questionText]: value,
      };
      const total = Object.values(updated).reduce((acu, val) => acu + val, 0);
      setTotalScore(total);
      return updated;
    });
  };

  const handleNext = () => {
    if (questions[currentIndex + 1]) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert("Please login before submit the assessment");
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    }
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
      localStorage.setItem("AdhdScore", totalScore);
      try {
        const resp = await Api.post("/predict", answers, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResult(resp.data);
        console.log("API Response:", resp);
      } catch (error) {
        console.error("Error submitting the assessment:", error);
      }
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        ADHD Assessment Questionnaire
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Rate how often you have experienced these symptoms over the past 6
        months
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="space-y-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm border">
          <p className="text-gray-800 font-medium">
            {currentIndex + 1}. {questions[currentIndex].text}
          </p>
          <div className="flex  flex-col gap-2 mt-2">
            {[1, 2, 3, 4].map((value) => (
              <label
                key={value}
                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer
                  transition-colors duration-200 min-w-[120px]
                  ${
                    answers[questions[currentIndex].text] === value
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
              >
                <input
                  type="radio"
                  name={`question-${questions[currentIndex].id}`}
                  value={value}
                  checked={answers[questions[currentIndex].text] === value}
                  onChange={() =>
                    handleAnswerChange(questions[currentIndex].text, value)
                  }
                  className="hidden"
                />
                <div className="flex gap-2 items-center w-full">
                  <span className="text-lg font-bold">{value}.</span>
                  <span className="text-sm font-medium">
                    {["Never", "Sometimes", "Often", "Very Often"][value - 1]}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between p-6">
        <button
          onClick={handlePrevious}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-200"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          disabled={currentIndex >= questions.length - 1}
        >
          Next
        </button>
      </div>

      <div className="flex justify-center p-6">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 
                   transition-colors duration-200 font-medium text-lg disabled:opacity-50"
          disabled={Object.keys(answers).length !== questions.length}
        >
          Submit Assessment
        </button>
      </div>

      {submitted && (
        <div className="p-4 bg-green-100 text-green-700 text-center rounded-lg mt-4">
          <p className="font-medium">
            Your assessment has been submitted successfully!
          </p>
          <p className="mt-2">
            {result && result.prediction ? (
              <span className="opacity-80 transition-opacity ease-in duration-300 font-bold">
                <strong>Result:</strong>{" "}
                {result.prediction === 1 ? "Positive" : "Negative"}
              </span>
            ) : null}
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            {totalScore && (
              <span className="opacity-80 transition-opacity  duration-300 ease-in font-bold mt-2">
                Your Total Score : {totalScore}
              </span>
            )}
            {alert && (
              <span className="opacity-80 transition-opacity ease-in duration-300 font-bold mt-2">
                {alert}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ADHDAssessment;
