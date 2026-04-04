
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  MessageSquare,
  Loader2,
  Mic,
  MicOff,
  History,
  Filter,
  Calendar,
  Search,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Student, Assessment } from '../types';

interface AIAssistantProps {
  students: Student[];
  assessments: Assessment[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ students, assessments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string; timestamp: Date; topic?: string }[]>([
    { 
      role: 'ai', 
      text: "Hello! I'm your Enara Data Assistant. I've analyzed your current cohort data. I noticed that 2 students are currently 'at risk' and might need immediate attention. How can I help you make data-driven decisions today?",
      timestamp: new Date(),
      topic: 'General'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [dateFilter, setDateFilter] = useState('All Time');
  const [topicFilter, setTopicFilter] = useState('All Topics');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: new Date(), topic: 'General' }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Prepare context for the AI
      const studentSummary = students.map(s => ({
        name: s.name,
        grade: s.grade,
        avgScore: s.avgScore,
        status: s.status,
        progress: s.progress,
        subjects: s.subjects.map(sub => `${sub.name}: ${sub.score}%`)
      }));

      const assessmentSummary = assessments.map(a => ({
        title: a.title,
        subject: a.subject,
        type: a.type,
        avgScore: a.avgScore
      }));

      const systemInstruction = `
        You are Enara AI, a high-level educational data analyst assistant for school administrators.
        Your goal is to help administrators make data-driven decisions based on live student and assessment data.
        
        Current Data Context:
        - Total Students: ${students.length}
        - Students at Risk: ${students.filter(s => s.status === 'at risk').length}
        - Students Excelling: ${students.filter(s => s.status === 'excelling').length}
        - Average Cohort Score: ${Math.round(students.reduce((acc, s) => acc + s.avgScore, 0) / students.length)}%
        
        Student Details: ${JSON.stringify(studentSummary)}
        Assessment Details: ${JSON.stringify(assessmentSummary)}

        Guidelines:
        1. Be professional, concise, and insightful.
        2. Identify patterns (e.g., "Math scores are dipping across Grade 10").
        3. Suggest interventions (e.g., "Student X needs extra support in Physics").
        4. Use Markdown for formatting.
        5. Always base your answers on the provided data.
        6. If asked about something not in the data, politely explain your limitations.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
        },
      });

      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: response.text || "I'm sorry, I couldn't process that request.",
        timestamp: new Date(),
        topic: 'General'
      }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I encountered an error while analyzing the data. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: <AlertCircle size={14} />, text: "Who is at risk?", prompt: "Identify all students currently 'at risk' and suggest immediate interventions for each based on their subject scores." },
    { icon: <TrendingUp size={14} />, text: "Performance trends", prompt: "Analyze the overall performance trends across all subjects. Which subjects are excelling and which need attention?" },
    { icon: <Lightbulb size={14} />, text: "Improvement ideas", prompt: "Based on the student progress data, what are 3 data-driven strategies we can implement this week to boost engagement?" },
  ];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed inset-0 lg:relative lg:inset-auto w-full lg:w-[400px] h-full bg-white border-l border-slate-200 flex flex-col overflow-hidden z-50 shadow-2xl lg:shadow-none"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white shrink-0">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Enara Data Agent</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Analyzing Live Data</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex px-6 border-t border-white/5">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-3 text-xs font-bold transition-all border-b-2 ${activeTab === 'chat' ? 'border-teal-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                Live Chat
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`px-4 py-3 text-xs font-bold transition-all border-b-2 ${activeTab === 'history' ? 'border-teal-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
              >
                History
              </button>
            </div>
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' 
                        : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                      <div className={`text-[8px] mt-2 font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-white/40' : 'text-slate-400'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.topic}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-3">
                      <Loader2 size={16} className="text-teal-500 animate-spin" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analyzing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-6 py-4 bg-white border-t border-slate-100 overflow-x-auto flex gap-2 shrink-0 no-scrollbar">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(action.prompt)}
                    className="whitespace-nowrap px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 hover:bg-teal-50 hover:border-teal-100 hover:text-teal-700 transition-all flex items-center gap-2"
                  >
                    {action.icon}
                    {action.text}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about performance..."
                    className="w-full pl-4 pr-24 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all text-sm font-medium"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {recognitionRef.current && (
                      <button 
                        onClick={toggleListening}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          isListening 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                        }`}
                        title={isListening ? "Stop listening" : "Start voice input"}
                      >
                        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                      </button>
                    )}
                    <button 
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <Sparkles size={10} className="text-teal-500" />
                  Powered by Enara Intelligence
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 bg-slate-50/50 flex flex-col">
              {/* History Filters */}
              <div className="p-6 bg-white border-b border-slate-100 space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search history..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 transition-colors">
                    <Filter size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={12} />
                    <select 
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 outline-none appearance-none"
                    >
                      <option>All Time</option>
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Last 7 Days</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={12} />
                    <select 
                      value={topicFilter}
                      onChange={(e) => setTopicFilter(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 outline-none appearance-none"
                    >
                      <option>All Topics</option>
                      <option>General</option>
                      <option>Algebra</option>
                      <option>Biology</option>
                      <option>Performance</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  </div>
                </div>
              </div>

              {/* History List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.filter(m => m.role === 'user').map((msg, i) => (
                  <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-teal-200 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 bg-teal-50 text-teal-600 text-[9px] font-black uppercase tracking-widest rounded-md">
                        {msg.topic}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {msg.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {msg.text}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                          AI
                        </div>
                        <span className="text-[10px] text-slate-400 italic">Response generated</span>
                      </div>
                      <ChevronDown size={14} className="text-slate-300 -rotate-90" />
                    </div>
                  </div>
                ))}
                {messages.filter(m => m.role === 'user').length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <History size={40} className="text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400">No chat history found</p>
                    <p className="text-xs text-slate-300 mt-1">Your interactions will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center group"
        >
          <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping group-hover:hidden" />
          <Bot size={28} />
          <div className="absolute -top-2 -right-2 bg-teal-500 text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">
            LIVE
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
