
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, AlertCircle, CheckCircle2, Send, Sparkles, MessageSquare, Bot, X, Loader2 } from 'lucide-react';
import { Assessment, Question } from '../types';
import { getTutorResponse } from '../services/geminiService';

interface AssessmentInterfaceProps {
  assessment: Assessment;
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export const AssessmentInterface: React.FC<AssessmentInterfaceProps> = ({ assessment, onComplete, onCancel }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.duration * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // AI Tutor State
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<{ question: string; studentAnswer: string; correctAnswer: string; explanation: string } | null>(null);
  const [tutorMessages, setTutorMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([]);
  const [tutorInput, setTutorInput] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);

  const handleAskTutor = (q: Question, studentAnswer: any) => {
    const context = {
      question: q.text,
      studentAnswer: q.type === 'short-answer' ? (studentAnswer || '(No Answer)') : (q.options?.[studentAnswer as number] || '(No Answer)'),
      correctAnswer: q.type === 'short-answer' ? (q.correctAnswer as string) : (q.options?.[q.correctAnswer as number] || ''),
      explanation: q.explanation
    };
    setTutorContext(context);
    setTutorMessages([
      { 
        role: 'ai', 
        text: `Hi! I'm your AI Tutor. I see you had some trouble with the question: "${context.question}". You answered "${context.studentAnswer}", but the correct answer was "${context.correctAnswer}". ${context.explanation} Would you like me to explain this concept in more detail?` 
      }
    ]);
    setIsTutorOpen(true);
  };

  const sendMessageToTutor = async () => {
    if (!tutorInput.trim() || isTutorLoading) return;

    const userMsg = tutorInput.trim();
    setTutorInput('');
    setTutorMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTutorLoading(true);

    try {
      const history = tutorMessages.map(m => ({
        role: m.role === 'ai' ? 'model' : 'user' as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

      const context = `
        The student is reviewing an assessment mistake.
        Question: ${tutorContext?.question}
        Student's Answer: ${tutorContext?.studentAnswer}
        Correct Answer: ${tutorContext?.correctAnswer}
        Original Explanation: ${tutorContext?.explanation}
      `;

      const response = await getTutorResponse(history, userMsg, context);
      setTutorMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setTutorMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsTutorLoading(false);
    }
  };

  useEffect(() => {
    if (!hasStarted || isSubmitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, hasStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !hasStarted) {
        setHasStarted(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [assessment.questions[currentQuestionIndex].id]: optionIndex
    });
  };

  const handleShortAnswerChange = (text: string) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [assessment.questions[currentQuestionIndex].id]: text
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    // In a real app, we'd send this to the backend
  };

  const calculateScore = () => {
    let correct = 0;
    assessment.questions.forEach((q) => {
      const answer = answers[q.id];
      if (q.type === 'short-answer') {
        if (typeof answer === 'string' && typeof q.correctAnswer === 'string' && answer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      } else {
        if (answer === q.correctAnswer) {
          correct++;
        }
      }
    });
    return Math.round((correct / assessment.questions.length) * 100);
  };

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        {!showDetails ? (
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Assessment Completed!</h2>
            <p className="text-slate-500 mb-8">Great job finishing the {assessment.title}.</p>
            
            <div className="bg-slate-50 rounded-2xl p-8 mb-8 inline-block min-w-[240px]">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">YOUR SCORE</p>
              <p className="text-6xl font-black text-teal-600">{score}%</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl text-left">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status</p>
                <p className="font-bold text-emerald-600">Passed</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl text-left">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Time Spent</p>
                <p className="font-bold text-slate-700">{formatTime(assessment.duration * 60 - timeLeft)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowDetails(true)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
              >
                View Detailed Feedback
              </button>
              <button 
                onClick={() => onComplete(score)}
                className="w-full py-4 text-teal-700 font-bold hover:bg-teal-50 rounded-2xl transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-in">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setShowDetails(false)}
                className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-700"
              >
                <ChevronLeft size={20} /> Back to Summary
              </button>
              <div className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl font-bold">
                Score: {score}%
              </div>
            </div>

            <div className="space-y-6">
              {assessment.questions.map((q, idx) => {
                const studentAnswer = answers[q.id];
                let isCorrect = false;
                if (q.type === 'short-answer') {
                  isCorrect = typeof studentAnswer === 'string' && typeof q.correctAnswer === 'string' && studentAnswer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
                } else {
                  isCorrect = studentAnswer === q.correctAnswer;
                }

                return (
                  <div key={q.id} className={`p-8 rounded-3xl border-2 ${isCorrect ? 'border-emerald-100 bg-white' : 'border-red-100 bg-white'} shadow-sm space-y-4`}>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-800">{q.text}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="pl-9 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Your Answer</p>
                          <p className={`text-sm font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                            {q.type === 'short-answer' ? (studentAnswer || '(No Answer)') : (q.options?.[studentAnswer as number] || '(No Answer)')}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Correct Answer</p>
                          <p className="text-sm font-bold text-emerald-700">
                            {q.type === 'short-answer' ? q.correctAnswer : q.options?.[q.correctAnswer as number]}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] font-bold text-teal-600 uppercase mb-2 flex items-center gap-1">
                            <Sparkles size={10} /> AI Model Answer & Feedback
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                        {!isCorrect && (
                          <button 
                            onClick={() => handleAskTutor(q, studentAnswer)}
                            className="shrink-0 p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-md flex items-center gap-2 text-xs font-bold"
                          >
                            <Bot size={16} />
                            Ask Tutor
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => onComplete(score)}
              className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg hover:bg-teal-700 transition-all"
            >
              Finish & Return to Dashboard
            </button>
          </div>
        )}

        {/* AI Tutor Chat Overlay */}
        {isTutorOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsTutorOpen(false)} />
            <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-slide-up h-[600px] max-h-[80vh]">
              {/* Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                    <Bot size={24} className="text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Tutor Standby</h3>
                    <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Explaining your mistakes</p>
                  </div>
                </div>
                <button onClick={() => setIsTutorOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                {tutorMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'ai' 
                        ? 'bg-white text-slate-700 shadow-sm border border-slate-100' 
                        : 'bg-teal-600 text-white shadow-md'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTutorLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                      <Loader2 size={16} className="animate-spin text-teal-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="relative">
                  <input 
                    type="text"
                    value={tutorInput}
                    onChange={(e) => setTutorInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessageToTutor()}
                    placeholder="Ask me anything about this question..."
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                  <button 
                    onClick={sendMessageToTutor}
                    disabled={!tutorInput.trim() || isTutorLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-all"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 text-center animate-slide-in">
          <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Sparkles size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{assessment.title}</h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {assessment.subject}
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {assessment.duration} Minutes
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {assessment.questions.length} Questions
            </span>
          </div>

          {assessment.instructions && (
            <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertCircle size={14} /> Instructions from Admin
              </h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {assessment.instructions}
              </p>
            </div>
          )}

          <div className="space-y-6">
            <button 
              onClick={() => setHasStarted(true)}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-lg flex items-center justify-center gap-3"
            >
              Start Assessment
              <span className="px-2 py-0.5 bg-white/20 rounded text-[10px] font-mono">ENTER</span>
            </button>
            <p className="text-slate-400 text-sm font-medium">
              Press <span className="text-slate-900 font-bold">Enter</span> or click the button to begin.
            </p>
            <button 
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 font-bold text-sm transition-colors"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{assessment.title}</h1>
          <p className="text-slate-500 text-xs sm:text-sm">{assessment.subject} • {assessment.questions.length} Questions</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm sm:text-base ${
          timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
        }`}>
          <Clock size={18} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2">
          <span>Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-600 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-8">
        <div className="flex justify-between items-start mb-4">
          <span className="px-2 py-1 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            {currentQuestion.type.replace('-', ' ')}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 sm:mb-8 leading-relaxed">
          {currentQuestion.text}
        </h3>

        {currentQuestion.type !== 'short-answer' && currentQuestion.options && (
          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl text-left border-2 transition-all flex items-center justify-between group ${
                    isSelected 
                      ? 'border-teal-600 bg-teal-50/50' 
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm ${
                      isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-teal-900' : 'text-slate-700'}`}>
                      {option}
                    </span>
                  </div>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-teal-600"></div>}
                </button>
              );
            })}
          </div>
        )}

        {currentQuestion.type === 'short-answer' && (
          <div className="space-y-4">
            <textarea
              value={(answers[currentQuestion.id] as string) || ''}
              onChange={(e) => handleShortAnswerChange(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-5 rounded-2xl border-2 border-slate-100 focus:border-teal-600 focus:bg-teal-50/10 outline-none transition-all h-32 resize-none text-slate-700 font-medium"
            />
            <p className="text-xs text-slate-400 italic">Answers are case-insensitive and whitespace is trimmed.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        <button
          onClick={onCancel}
          className="order-2 sm:order-1 px-6 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors text-sm sm:text-base"
        >
          Quit Assessment
        </button>

        <div className="order-1 sm:order-2 flex gap-4 w-full sm:w-auto">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex-1 sm:flex-none p-4 rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < assessment.questions.length}
              className="flex-[2] sm:flex-none px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-900/20 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              Submit <span className="hidden sm:inline">Assessment</span> <Send size={18} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(assessment.questions.length - 1, prev + 1))}
              className="flex-1 sm:flex-none p-4 rounded-2xl bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* AI Assistant Hint (Optional) */}
      <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-900 mb-1">AI Proctored Session</h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Your progress is being monitored to provide personalized feedback after the session. 
            Focus on accuracy and take your time with each question.
          </p>
        </div>
      </div>
    </div>
  );
};
