import React, { useState } from 'react';
import { BookOpen, Brain, Lightbulb, Loader2 } from 'lucide-react';

export default function BrainByte() {
  const [notes, setNotes] = useState('');
  const [studyMaterials, setStudyMaterials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState('flashcards');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const generateStudyMaterials = async () => {
    if (!notes.trim()) {
      alert('Please enter some notes first!');
      return;
    }

    setLoading(true);
    setStudyMaterials(null);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setQuizAnswers({});
    setShowResults(false);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are a study assistant. Analyze these notes and create study materials. Return ONLY valid JSON with no preamble, no markdown backticks, no explanations.

Notes:
${notes}

Create exactly this JSON structure:
{
  "flashcards": [
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."}
  ],
  "quiz": [
    {
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 0
    },
    {
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 1
    },
    {
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correct": 2
    }
  ]
}

Generate 3-5 flashcards and 3-4 quiz questions. The "correct" field is the index (0-3) of the correct option.`
            }
          ]
        })
      });

      const data = await response.json();
      const text = data.content
        .map(item => (item.type === 'text' ? item.text : ''))
        .join('\n')
        .trim();

      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      setStudyMaterials(parsed);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate study materials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < studyMaterials.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleQuizAnswer = (questionIndex, optionIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: optionIndex });
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    studyMaterials.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">BrainByte</h1>
          </div>
          <p className="text-gray-600">Transform your notes into flashcards and quizzes</p>
        </div>

        {/* Input Section */}
        {!studyMaterials && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste Your Study Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Example: The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <button
              onClick={generateStudyMaterials}
              disabled={loading}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Study Materials...
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5" />
                  Generate Study Materials
                </>
              )}
            </button>
          </div>
        )}

        {/* Study Materials */}
        {studyMaterials && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => {
                  setActiveTab('flashcards');
                  setShowResults(false);
                }}
                className={`pb-3 px-4 font-semibold transition-colors ${
                  activeTab === 'flashcards'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Flashcards ({studyMaterials.flashcards.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('quiz');
                  setShowResults(false);
                }}
                className={`pb-3 px-4 font-semibold transition-colors ${
                  activeTab === 'quiz'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Quiz ({studyMaterials.quiz.length})
              </button>
            </div>

            {/* Flashcards Tab */}
            {activeTab === 'flashcards' && (
              <div>
                <div className="mb-4 text-center text-sm text-gray-600">
                  Card {currentCardIndex + 1} of {studyMaterials.flashcards.length}
                </div>
                
                <div
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-8 min-h-64 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-sm font-semibold text-indigo-600 mb-4">
                      {showAnswer ? 'ANSWER' : 'QUESTION'}
                    </div>
                    <div className="text-xl text-gray-800">
                      {showAnswer
                        ? studyMaterials.flashcards[currentCardIndex].answer
                        : studyMaterials.flashcards[currentCardIndex].question}
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                      Click to {showAnswer ? 'see question' : 'reveal answer'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevCard}
                    disabled={currentCardIndex === 0}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextCard}
                    disabled={currentCardIndex === studyMaterials.flashcards.length - 1}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === 'quiz' && (
              <div>
                {!showResults ? (
                  <>
                    {studyMaterials.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 mb-3">
                          {qIdx + 1}. {q.question}
                        </div>
                        <div className="space-y-2">
                          {q.options.map((option, oIdx) => (
                            <label
                              key={oIdx}
                              className="flex items-center p-3 bg-white rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors"
                            >
                              <input
                                type="radio"
                                name={`question-${qIdx}`}
                                checked={quizAnswers[qIdx] === oIdx}
                                onChange={() => handleQuizAnswer(qIdx, oIdx)}
                                className="mr-3 w-4 h-4 text-indigo-600"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== studyMaterials.quiz.length}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Quiz
                    </button>
                  </>
                ) : (
                  <div>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-indigo-600 mb-2">
                        {calculateScore()} / {studyMaterials.quiz.length}
                      </div>
                      <div className="text-gray-600">
                        {Math.round((calculateScore() / studyMaterials.quiz.length) * 100)}% Correct
                      </div>
                    </div>
                    {studyMaterials.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 mb-2">
                          {qIdx + 1}. {q.question}
                        </div>
                        <div className="space-y-1">
                          {q.options.map((option, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded ${
                                oIdx === q.correct
                                  ? 'bg-green-100 text-green-800'
                                  : quizAnswers[qIdx] === oIdx
                                  ? 'bg-red-100 text-red-800'
                                  : 'text-gray-600'
                              }`}
                            >
                              {option}
                              {oIdx === q.correct && ' ✓'}
                              {quizAnswers[qIdx] === oIdx && oIdx !== q.correct && ' ✗'}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Start Over Button */}
            <button
              onClick={() => {
                setStudyMaterials(null);
                setNotes('');
              }}
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Start Over with New Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
