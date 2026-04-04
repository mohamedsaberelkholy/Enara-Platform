
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Mail, Award, ArrowUpRight, ChevronLeft, X, Send, CheckCircle2, Plus, GraduationCap, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Student } from '../types';

interface StudentManagementProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onViewStudent: (student: Student) => void;
  onViewDeepAnalytics?: (student: Student) => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({ students, setStudents, onViewStudent, onViewDeepAnalytics }) => {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    grade: 'Grade 10',
    currentModule: 'Introduction to Algebra'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const studentToAdd: Student = {
        id: `STU${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: newStudent.name,
        email: newStudent.email,
        grade: newStudent.grade,
        avatar: newStudent.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        progress: 0,
        avgScore: 0,
        studyTime: "0h/week",
        streak: 0,
        status: "on track",
        currentModule: newStudent.currentModule,
        subjects: [
          { name: "Mathematics", progress: 0, score: 0 },
          { name: "Physics", progress: 0, score: 0 },
          { name: "English", progress: 0, score: 0 }
        ]
      };

      setStudents([studentToAdd, ...students]);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setIsAddStudentModalOpen(false);
        setShowSuccess(false);
        setNewStudent({
          name: '',
          email: '',
          grade: 'Grade 10',
          currentModule: 'Introduction to Algebra'
        });
      }, 2000);
    }, 1000);
  };

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
          <button 
            onClick={() => setIsAddStudentModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl teal-gradient text-white text-sm font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={18} /> Add Student
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">
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

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {students.map((s, i) => (
            <div 
              key={i} 
              onClick={() => onViewStudent(s)}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 card-hover relative group cursor-pointer"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle more options
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
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
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl teal-gradient flex items-center justify-center text-sm font-bold text-white">
                          {s.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{s.name}</p>
                          <p className="text-[10px] text-slate-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600">{s.grade}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-600" style={{ width: `${s.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-amber-500" />
                        <span className="text-sm font-bold text-slate-700">{s.avgScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        s.status === 'excelling' ? 'bg-emerald-50 text-emerald-600' : 
                        s.status === 'on track' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onViewStudent(s)}
                          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => onViewDeepAnalytics?.(s)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Deep Analytics"
                        >
                          <TrendingUp size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedStudent(s as any);
                            setIsMessageModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsAddStudentModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                {showSuccess ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Student Added!</h2>
                    <p className="text-slate-500">
                      {newStudent.name} has been successfully enrolled and notified via email.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Add New Student</h2>
                        <p className="text-slate-500 mt-1">Enroll a new student into the institutional platform.</p>
                      </div>
                      <button 
                        onClick={() => setIsAddStudentModalOpen(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleAddStudent} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            required
                            type="text"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                            placeholder="e.g. Sarah Ahmed"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input 
                            required
                            type="email"
                            value={newStudent.email}
                            onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                            placeholder="student@school.edu"
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Grade Level</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select 
                              value={newStudent.grade}
                              onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all appearance-none"
                            >
                              <option>Grade 9</option>
                              <option>Grade 10</option>
                              <option>Grade 11</option>
                              <option>Grade 12</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <button 
                          type="button"
                          onClick={() => setIsAddStudentModalOpen(false)}
                          className="flex-1 py-4 text-slate-500 font-bold hover:text-slate-700 transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Enroll Student'
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
