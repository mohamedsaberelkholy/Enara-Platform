
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Bot,
  Volume2,
  Minimize2,
  Send,
  Video,
  File,
  BarChart3,
  Layers,
  PanelLeft,
  PanelRight,
  Layout,
  Download,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTutorResponse, generateSpeech } from '../services/geminiService';
import { ChatMessage, Course, Module, Lesson } from '../types';

interface CoursePageProps {
  initialCourseId?: string | null;
  courses: Course[];
}

export const CoursePage: React.FC<CoursePageProps> = ({ initialCourseId, courses }) => {
  const [view, setView] = useState<'selection' | 'overview' | 'lesson'>('selection');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTutorMinimized, setIsTutorMinimized] = useState(false);
  
  // AI Tutor State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', text: "Hi! I'm your Enara Learning Assistant. How can I help you today?", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReadingId, setIsReadingId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (initialCourseId) {
      const mappedId = initialCourseId === 'c1' ? 'MATH101' : initialCourseId === 'c2' ? 'PHYS101' : initialCourseId;
      const course = courses.find(c => c.id === mappedId);
      if (course) {
        setSelectedCourse(course);
        setView('overview');
      }
    }
  }, [initialCourseId, courses]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [selectedLesson?.id]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const history = chatMessages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user' as const,
      parts: [{ text: m.text }]
    }));

    const lessonContext = selectedLesson 
      ? `Subject: ${selectedCourse?.subject}, Module: ${selectedModule?.title}, Lesson: ${selectedLesson.title}.`
      : `Subject: ${selectedCourse?.subject}.`;
      
    const response = await getTutorResponse(history, textToSend, lessonContext);
    
    setIsTyping(false);
    setChatMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: response || 'I encountered an issue processing your request.', timestamp: new Date() }]);
  };

  const handleReadAloud = async (message: ChatMessage) => {
    if (isReadingId === message.id) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsReadingId(null);
      return;
    }

    setIsReadingId(message.id);
    const audioData = await generateSpeech(message.text);
    
    if (audioData) {
      const decodedData = atob(audioData);
      const uint8Array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++) {
        uint8Array[i] = decodedData.charCodeAt(i);
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const ctx = audioContextRef.current;
      const dataInt16 = new Int16Array(uint8Array.buffer);
      const audioBuffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsReadingId(null);
      source.start();
    } else {
      setIsReadingId(null);
    }
  };

  const handleStartLesson = (module: Module, lesson: Lesson) => {
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setView('lesson');
    setIsSidebarOpen(false);
    setChatMessages([
      { id: '1', role: 'ai', text: `Welcome to **${lesson.title}**! I'm here to help you master this topic. What would you like to start with?`, timestamp: new Date() }
    ]);
  };

  const calculateOverallProgress = (course: Course) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessonsCount, 0);
    const completedLessons = course.modules.reduce((acc, m) => acc + m.completedLessons, 0);
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setView('overview');
  };

  if (view === 'selection') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Your Courses</h1>
            <p className="text-slate-500">Pick up where you left off or start something new.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => {
              const progress = calculateOverallProgress(course);
              return (
                <motion.div 
                  key={course.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => handleSelectCourse(course)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all">
                      <BookOpen size={28} />
                    </div>
                    <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {course.subject}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                      <span>Course Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-teal-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Layers size={14} />
                      <span>{course.modules.length} Modules</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-teal-600 transition-all">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedCourse) return null;

  const overallProgress = calculateOverallProgress(selectedCourse);

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-[#F8FAFC]">
      {/* Left Sidebar: Chapters & Lessons (Toggle Menu) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-white border-r border-slate-100 flex flex-col z-[70] shadow-2xl"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Layout size={18} className="text-teal-600" />
                  Course Content
                </h3>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedCourse.modules.map((module, mIdx) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chapter {mIdx + 1}</span>
                    </div>
                    <h4 className="px-2 text-sm font-bold text-slate-800 mb-2">{module.title}</h4>
                    <div className="space-y-1">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleStartLesson(module, lesson)}
                          disabled={lesson.status === 'locked'}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                            selectedLesson?.id === lesson.id
                              ? 'bg-teal-50 text-teal-700'
                              : lesson.status === 'locked'
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            selectedLesson?.id === lesson.id ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {lesson.status === 'completed' ? <CheckCircle size={14} /> : 
                             lesson.status === 'locked' ? <Lock size={14} /> : <Play size={14} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{lesson.title}</p>
                            <p className="text-[10px] text-slate-400">{lesson.duration}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Context Bar */}
        <div className="bg-white border-b border-slate-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all border border-slate-100 shadow-sm"
            >
              <Menu size={18} />
              <span className="text-xs font-bold">Course Content</span>
            </button>
            <button 
              onClick={() => setView('selection')}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                {selectedCourse.title}
              </h2>
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                {overallProgress}% Complete
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsTutorMinimized(!isTutorMinimized)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 lg:hidden"
            >
              <Bot size={20} />
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {view === 'overview' ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen size={40} />
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-4">Welcome to {selectedCourse.title}</h1>
                  <p className="text-slate-500 max-w-lg mx-auto mb-8">
                    Select a lesson from the sidebar to begin your learning journey. Your AI tutor is ready to assist you at any time.
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Modules</p>
                      <p className="text-xl font-bold text-slate-900">{selectedCourse.modules.length}</p>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Lessons</p>
                      <p className="text-xl font-bold text-slate-900">
                        {selectedCourse.modules.reduce((acc, m) => acc + m.lessonsCount, 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <FileText size={20} className="text-teal-600" />
                      Course Resources
                    </h3>
                    <div className="space-y-3">
                      {selectedCourse.modules[0].materials?.map((mat, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                          <File size={16} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{mat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <BarChart3 size={20} className="text-teal-600" />
                      Your Progress
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                        <span>Completion</span>
                        <span>{overallProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500" style={{ width: `${overallProgress}%` }} />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        You've completed {selectedCourse.modules.reduce((acc, m) => acc + m.completedLessons, 0)} out of {selectedCourse.modules.reduce((acc, m) => acc + m.lessonsCount, 0)} lessons.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">{selectedModule?.title}</span>
                    <span>•</span>
                    <span>Lesson {selectedLesson?.order}</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">
                    {selectedLesson?.title}
                  </h2>

                  {/* Video Player */}
                  {selectedLesson?.videoUrl && (
                    <div className="mb-12 space-y-4">
                      <div className="aspect-video w-full bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 group relative">
                        <iframe
                          src={selectedLesson.videoUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleSendMessage(`I'm watching the video for "${selectedLesson.title}". Can you explain the key takeaways?`)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-bold hover:bg-teal-100 transition-all"
                        >
                          <Bot size={14} /> Ask Tutor about this video
                        </button>
                      </div>
                    </div>
                  )}

                  <article className="prose prose-slate max-w-none mb-12">
                    <div className="text-slate-700 leading-relaxed space-y-6">
                      <p className="text-lg italic border-l-4 border-teal-500 pl-6 text-slate-500">
                        {selectedModule?.explanation}
                      </p>
                      <p>In this lesson, we dive deep into the core concepts of {selectedLesson?.title}. Use the AI tutor on the right if you need any clarification or extra practice problems.</p>
                      
                      {selectedLesson?.id === 'L003' && (
                        <div className="bg-slate-900 rounded-3xl p-8 text-white font-mono text-sm overflow-x-auto my-8">
                          <p className="text-teal-400 mb-2">// The Quadratic Formula</p>
                          <p className="text-2xl">x = (-b ± √(b² - 4ac)) / 2a</p>
                        </div>
                      )}
                    </div>
                  </article>

                  {/* Embedded Quiz */}
                  {selectedLesson?.quiz && (
                    <div className="mb-12 bg-slate-50 rounded-[2.5rem] p-8 sm:p-10 border border-slate-100">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
                          <HelpCircle size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Knowledge Check</h3>
                          <p className="text-xs text-slate-500 font-medium">Test your understanding of {selectedLesson.title}</p>
                        </div>
                      </div>

                      <div className="space-y-8">
                        {selectedLesson.quiz.questions.map((q, qIdx) => (
                          <div key={q.id} className="space-y-4">
                            <p className="text-sm font-bold text-slate-800 flex gap-3">
                              <span className="text-teal-600">0{qIdx + 1}.</span>
                              {q.text}
                            </p>
                            <div className="grid grid-cols-1 gap-3 pl-8">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = quizAnswers[q.id] === optIdx;
                                const isCorrect = q.correctAnswer === optIdx;
                                const showResult = quizSubmitted;

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={quizSubmitted}
                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                                      showResult
                                        ? isCorrect
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                          : isSelected
                                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                                            : 'bg-white border-slate-100 text-slate-400 opacity-60'
                                        : isSelected
                                          ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-sm'
                                          : 'bg-white border-slate-100 text-slate-600 hover:border-teal-200 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span className="text-xs font-semibold">{opt}</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                      showResult
                                        ? isCorrect
                                          ? 'border-emerald-500 bg-emerald-500 text-white'
                                          : isSelected
                                            ? 'border-rose-500 bg-rose-500 text-white'
                                            : 'border-slate-200'
                                        : isSelected
                                          ? 'border-teal-500 bg-teal-500 text-white'
                                          : 'border-slate-200 group-hover:border-teal-400'
                                    }`}>
                                      {showResult && isCorrect && <CheckCircle2 size={12} />}
                                      {showResult && isSelected && !isCorrect && <AlertCircle size={12} />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            {quizSubmitted && quizAnswers[q.id] !== undefined && (
                              <div className={`ml-8 p-4 rounded-2xl text-xs leading-relaxed ${
                                quizAnswers[q.id] === q.correctAnswer ? 'bg-emerald-100/50 text-emerald-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                <span className="font-bold mr-1">Explanation:</span>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {!quizSubmitted ? (
                        <button
                          onClick={() => {
                            setQuizSubmitted(true);
                            const correctCount = selectedLesson.quiz!.questions.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
                            handleSendMessage(`I just finished the quiz for "${selectedLesson.title}". I got ${correctCount} out of ${selectedLesson.quiz!.questions.length} correct. Can you help me review the parts I missed?`);
                          }}
                          disabled={Object.keys(quizAnswers).length < selectedLesson.quiz.questions.length}
                          className="mt-10 w-full py-4 rounded-2xl teal-gradient text-white font-bold shadow-lg shadow-teal-900/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                          Submit Quiz
                        </button>
                      ) : (
                        <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-lg">
                              {selectedLesson.quiz.questions.filter(q => quizAnswers[q.id] === q.correctAnswer).length}/{selectedLesson.quiz.questions.length}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Quiz Completed!</p>
                              <p className="text-xs text-slate-500">Your results have been shared with your AI tutor.</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              setQuizAnswers({});
                              setQuizSubmitted(false);
                            }}
                            className="text-xs font-bold text-teal-600 hover:underline"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Accessible Materials */}
                  {selectedLesson?.materials && selectedLesson.materials.length > 0 && (
                    <div className="mb-12">
                      <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Layers size={16} className="text-teal-600" />
                        Lesson Materials
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedLesson.materials.map((mat, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 group-hover:text-teal-600 shadow-sm">
                                {mat.endsWith('.mp4') ? <Video size={16} /> : <FileText size={16} />}
                              </div>
                              <span className="text-xs font-semibold text-slate-700">{mat}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-teal-600 transition-colors">
                                <Download size={14} />
                              </button>
                              <ArrowRight size={14} className="text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      onClick={() => setView('overview')}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    >
                      <ChevronLeft size={20} /> Overview
                    </button>
                    <button 
                      className="flex items-center gap-2 px-8 py-3 rounded-xl teal-gradient text-white font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Next Lesson <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Right Sidebar: AI Tutor */}
      <motion.aside
        animate={{ width: isTutorMinimized ? 80 : 384 }}
        className="bg-white border-l border-slate-100 flex flex-col overflow-hidden relative"
      >
        <div className={`p-4 border-b border-slate-50 flex items-center shrink-0 ${isTutorMinimized ? 'justify-center' : 'justify-between'}`}>
          {!isTutorMinimized ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <h4 className="text-sm font-bold text-slate-900">AI Tutor</h4>
              </div>
              <button 
                onClick={() => setIsTutorMinimized(true)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"
                title="Minimize Tutor"
              >
                <Minimize2 size={20} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsTutorMinimized(false)}
              className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-teal-500/20 group relative"
              title="Expand Tutor"
            >
              <Bot size={24} />
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            </button>
          )}
        </div>

        {!isTutorMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                    msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                    {msg.role === 'ai' && (
                      <div className="mt-3 flex items-center gap-2 pt-3 border-t border-slate-200/50">
                        <button 
                          onClick={() => handleReadAloud(msg)}
                          className={`p-1.5 rounded-lg transition-colors ${isReadingId === msg.id ? 'bg-teal-100 text-teal-600' : 'hover:bg-slate-200 text-slate-400'}`}
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-6 border-t border-slate-50 bg-white">
              <div className="relative">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Ask anything..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white focus:border-teal-500 transition-all resize-none h-24"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="absolute right-3 bottom-3 p-2 bg-slate-900 text-white rounded-xl hover:bg-teal-600 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.aside>
    </div>
  );
};
