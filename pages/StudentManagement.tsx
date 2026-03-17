
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Mail, Award, ArrowUpRight, ChevronLeft, X, Send, CheckCircle2 } from 'lucide-react';
import { MOCK_STUDENTS } from '../constants';
import { Student } from '../types';

export const StudentManagement: React.FC = () => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setIsSending(true);
    // Mock sending
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setIsMessageModalOpen(false);
        setMessage('');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Go Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Student Directory</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">Manage and track enrollment across all departments</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex flex-1 sm:flex-none">
            <button 
              onClick={() => setView('grid')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'grid' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Grid
            </button>
            <button 
              onClick={() => setView('table')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'table' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Table
            </button>
          </div>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl teal-gradient text-white text-sm font-bold shadow-lg shadow-teal-900/10">
            Import Students
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center">
        <div className="relative flex-1 min-w-0 sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by name, email or ID..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-teal-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">
            <Filter size={18} /> Filters
          </button>
          <select className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold outline-none focus:border-teal-500">
            <option>All Grades</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
          </select>
          <select className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold outline-none focus:border-teal-500">
            <option>Sort by: Recently Active</option>
            <option>Sort by: Name A-Z</option>
            <option>Sort by: Highest Score</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...MOCK_STUDENTS, ...MOCK_STUDENTS, ...MOCK_STUDENTS].map((s, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 card-hover relative group">
            <button className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical size={18} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-3xl teal-gradient flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                  {s.avatar}
                </div>
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-4 border-white flex items-center justify-center ${
                  s.status === 'excelling' ? 'bg-emerald-500' : s.status === 'on track' ? 'bg-blue-500' : 'bg-red-500'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">{s.name}</h3>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{s.grade} • ID:{s.id}</p>
              
              <div className="w-full mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Course Progress</span>
                    <span className="text-teal-700">{s.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600" style={{ width: `${s.progress}%` }}></div>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  {s.subjects.slice(0, 3).map((sub, idx) => (
                    <div key={idx} className="px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600">
                      {sub.score}%
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => {
                      setSelectedStudent(s as any);
                      setIsMessageModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <Mail size={14} /> Message
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 rounded-xl border border-teal-100 text-teal-700 text-xs font-bold hover:bg-teal-50 transition-colors">
                    <Eye size={14} /> Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Messaging Modal */}
      {isMessageModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSending && setIsMessageModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                  <Mail size={20} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-bold">Message Student</h3>
                  <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">To: {selectedStudent.name}</p>
                </div>
              </div>
              <button onClick={() => setIsMessageModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {sendSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
                  <p className="text-slate-500">Your message has been delivered to {selectedStudent.name}.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Message</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isSending}
                    className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg hover:bg-teal-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
