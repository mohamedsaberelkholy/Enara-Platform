
import React from 'react';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Trophy, 
  Calendar, 
  Zap, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  AlertCircle, 
  Clock,
  History,
  ClipboardList
} from 'lucide-react';
import { Assessment, Student } from '../types';
import { MOCK_STUDENTS, MOCK_COURSES } from '../constants';

interface StudentDashboardProps {
  onStartAssessment: (id: string) => void;
  onNavigate: (page: string) => void;
  assessments: Assessment[];
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onStartAssessment, onNavigate, assessments }) => {
  const student = MOCK_STUDENTS[0];
  const activeCourse = MOCK_COURSES[0];
  const activeModule = activeCourse.modules.find(m => m.status === 'active');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
      {/* Left Column: Learning Path */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
          <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 sm:mb-6">Your Learning Path</h2>
          <div className="space-y-3 sm:space-y-4">
            {activeCourse.modules.map((mod, idx) => (
              <div key={mod.id} className="relative">
                {idx !== activeCourse.modules.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-10 bottom-0 w-0.5 bg-slate-100"></div>
                )}
                <div className={`flex gap-3 sm:gap-4 relative z-10 p-1.5 sm:p-2 rounded-xl transition-all ${mod.status === 'active' ? 'bg-teal-50/50' : ''}`}>
                  <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:xl flex items-center justify-center shrink-0 shadow-sm ${
                    mod.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    mod.status === 'active' ? 'teal-gradient text-white border border-teal-600 shadow-teal-900/10' :
                    'bg-slate-50 text-slate-300 border border-slate-100'
                  }`}>
                    {mod.status === 'completed' ? <CheckCircle size={16} sm:size={18} /> :
                     mod.status === 'active' ? <Zap size={16} sm:size={18} /> : <Lock size={16} sm:size={18} />}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-xs sm:text-sm font-bold truncate ${mod.status === 'locked' ? 'text-slate-400' : 'text-slate-900'}`}>{mod.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{mod.completedLessons}/{mod.lessonsCount} Lessons</p>
                    {mod.status === 'active' && (
                      <div className="mt-1.5 sm:mt-2 h-1 w-20 sm:w-24 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600" style={{ width: `${(mod.completedLessons / mod.lessonsCount) * 100}%` }}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-6 space-y-4 sm:space-y-8 order-1 lg:order-2">
        <section>
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900">Good morning, {student.name.split(' ')[0]}</h1>
            <p className="text-slate-500 flex items-center gap-2 mt-1 text-xs sm:text-sm">
              <Calendar size={12} sm:size={14} /> Monday, Oct 24, 2025
            </p>
          </div>
          
          <div className="bg-teal-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="min-w-0 pr-2 sm:pr-4">
                    <span className="text-[8px] sm:text-[10px] font-bold text-teal-300 uppercase tracking-widest">CONTINUE LEARNING</span>
                    <h3 className="text-lg sm:text-2xl font-bold mt-1 truncate">Quadratic Equations</h3>
                    <p className="text-teal-200 text-[10px] sm:text-sm mt-0.5 sm:mt-1">Mathematics • Module 2</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('courses')}
                    className="p-2.5 sm:p-4 bg-white text-teal-900 rounded-lg sm:rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95 shrink-0"
                  >
                    <Play size={18} sm:size={24} fill="currentColor" />
                  </button>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-[8px] sm:text-[10px] font-bold text-teal-200 uppercase">
                    <span>Lesson Progress</span>
                    <span>65% Complete</span>
                  </div>
                  <div className="h-1 sm:h-2 w-full bg-teal-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-[8px] sm:text-[10px] text-teal-300">Estimated time remaining: 12 minutes</p>
                </div>
              </div>
            </div>
            
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
              <History size={16} sm:size={18} className="text-teal-600" /> Recent Activity
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { title: 'Algebra Fundamentals', score: 95, date: 'Yesterday', type: 'quiz' },
                { title: 'Variables & Constants', score: 88, date: 'Oct 22', type: 'lesson' },
                { title: 'Basic Arithmetic Quiz', score: 100, date: 'Oct 20', type: 'quiz' }
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === 'quiz' ? 'bg-purple-50 text-purple-600' : 'bg-teal-50 text-teal-600'
                    }`}>
                      {activity.type === 'quiz' ? <ClipboardList size={14} sm:size={16} /> : <BookOpen size={14} sm:size={16} />}
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-[11px] sm:text-sm font-semibold text-slate-800 truncate">{activity.title}</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock size={8} sm:size={10} /> {activity.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1.5 sm:ml-2">
                    <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-bold ${
                      activity.score >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {activity.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base">
              <Calendar size={16} sm:size={18} className="text-teal-600" /> Upcoming Assessments
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {assessments.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm shrink-0">
                        <FileText size={14} sm:size={16} className="text-teal-600" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-[11px] sm:text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors truncate">{item.title}</h5>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-wider font-bold truncate">{item.subject}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500">
                      <AlertCircle size={10} sm:size={12} className="text-amber-500" />
                      <span className="text-[9px] sm:text-[10px] font-bold">Due: {item.dueDate}</span>
                    </div>
                    <button 
                      onClick={() => onStartAssessment(item.id)}
                      className="px-2.5 py-1 sm:px-4 sm:py-2 bg-slate-900 text-white rounded-lg sm:rounded-xl font-bold text-[9px] sm:text-[10px] hover:bg-teal-600 transition-all flex items-center gap-1 shadow-lg shadow-slate-900/10"
                    >
                      Start <ArrowRight size={10} sm:size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: Stats & Progress */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-3 lg:order-3">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 text-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                className="text-teal-600" 
                strokeDasharray={58 * 2 * Math.PI} 
                strokeDashoffset={58 * 2 * Math.PI * (1 - 0.78)} 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold text-teal-900">78%</span>
              <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider">Weekly Goal</span>
            </div>
          </div>
          <p className="text-[11px] sm:text-sm text-slate-600 mb-4 sm:mb-6 font-medium">You're doing great! Keep up the momentum.</p>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 text-left mb-6 sm:mb-8">
            <div className="p-2 sm:p-3 bg-slate-50 rounded-xl">
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase mb-0.5 sm:mb-1">Score Avg</p>
              <p className="text-sm sm:text-lg font-bold text-teal-900">{student.avgScore}%</p>
            </div>
            <div className="p-2 sm:p-3 bg-slate-50 rounded-xl">
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-bold uppercase mb-0.5 sm:mb-1">Streak</p>
              <p className="text-sm sm:text-lg font-bold text-teal-900">{student.streak}d 🔥</p>
            </div>
          </div>

          <div className="text-left space-y-3 sm:space-y-4">
            <h4 className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject Performance</h4>
            {student.subjects.map((sub, i) => (
              <div key={i} className="space-y-1 sm:space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-700">{sub.name}</span>
                  <span className="text-[8px] sm:text-[10px] font-bold text-teal-600">{sub.progress}%</span>
                </div>
                <div className="h-1 sm:h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full teal-gradient rounded-full transition-all duration-1000" 
                    style={{ width: `${sub.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
              <Trophy size={16} sm:size={18} className="text-amber-500" /> Achievements
            </h3>
            <button className="text-[10px] sm:text-xs text-teal-700 font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { emoji: '🎓', color: 'bg-teal-100', name: 'Scholar' },
              { emoji: '🔥', color: 'bg-orange-100', name: 'Active' },
              { emoji: '✨', color: 'bg-blue-100', name: 'Perfect' },
              { emoji: '🚀', color: 'bg-purple-100', name: 'Speed' },
              { emoji: '🧩', color: 'bg-emerald-100', name: 'Solver' },
              { emoji: '🤝', color: 'bg-indigo-100', name: 'Collaborator', locked: true }
            ].map((badge, i) => (
              <div key={i} className={`aspect-square rounded-lg sm:rounded-2xl flex items-center justify-center text-base sm:text-xl group relative cursor-help ${badge.locked ? 'bg-slate-50 opacity-40 grayscale' : badge.color}`}>
                {badge.emoji}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] sm:text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {badge.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
