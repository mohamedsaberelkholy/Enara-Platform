
import React, { useState } from 'react';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { CoursePage } from './pages/CoursePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CurriculumCenter } from './pages/CurriculumCenter';
import { StudentLayout, AdminSidebar, Header } from './components/Layout';
import { StudentManagement } from './pages/StudentManagement';
import { StudentProfile } from './pages/StudentProfile';
import { AIAssistant } from './components/AIAssistant';
import { ResearchInsights } from './pages/ResearchInsights';
import { AssessmentInterface } from './pages/AssessmentInterface';
import { AssessmentCenter } from './pages/AssessmentCenter';
import { ManagementDashboard } from './pages/ManagementDashboard';
import { AICredits } from './pages/AICredits';
import { EnaraAdminDashboard } from './pages/EnaraAdminDashboard';
import { PartnerCredits } from './pages/PartnerCredits';
import { TestResults } from './pages/TestResults';
import { RevenueGrowth } from './components/enara/RevenueGrowth';
import { InstitutionCRM } from './components/enara/InstitutionCRM';
import { ContractManagement } from './components/enara/ContractManagement';
import { PlatformHealth } from './components/enara/PlatformHealth';
import { AuditCompliance } from './components/enara/AuditCompliance';
import { ROIMetrics } from './components/enara/ROIMetrics';
import { Financials } from './components/enara/Financials';
import { InstitutionAnalytics } from './pages/InstitutionAnalytics';
import { CourseTeacherAnalytics } from './pages/CourseTeacherAnalytics';
import { StudentDeepAnalytics } from './pages/StudentDeepAnalytics';
import { Integrations } from '@/pages/Integrations';
import { MOCK_ASSESSMENTS, MOCK_COURSES, MOCK_STUDENTS } from './constants';
import { Assessment, Student } from './types';
import { CheckCircle2 } from 'lucide-react';

type AppState = {
  role: 'student' | 'admin' | 'enara-admin' | null;
  page: string;
  activeAssessment: Assessment | null;
  selectedStudent: Student | null;
  sharedCourseId?: string | null;
  sharedAssessmentId?: string | null;
  completedAssessmentIds: Set<string>;
};

const App: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>(MOCK_ASSESSMENTS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [state, setState] = useState<AppState>(() => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course');
    const assessmentId = params.get('assessment');
    
    // Clear the URL parameters so they don't persist on refresh or navigation
    if (courseId || assessmentId) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    return {
      role: null,
      page: 'courses',
      activeAssessment: null,
      selectedStudent: null,
      sharedCourseId: courseId,
      sharedAssessmentId: assessmentId,
      completedAssessmentIds: new Set<string>()
    };
  });

  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (role: 'student' | 'admin' | 'enara-admin') => {
    let page = role === 'student' ? 'courses' : 'dashboard';
    let activeAssessment = null;

    // If student and has a shared assessment, go directly to it
    if (role === 'student' && state.sharedAssessmentId) {
      if (state.completedAssessmentIds.has(state.sharedAssessmentId)) {
        alert('You have already completed this assessment. Shared assessments can only be opened once.');
      } else {
        const assessment = assessments.find(a => a.id === state.sharedAssessmentId);
        if (assessment) {
          page = 'taking-assessment';
          activeAssessment = assessment;
        }
      }
    }

    setState(prev => ({ ...prev, role, page, activeAssessment }));
    if (role === 'enara-admin') {
      setUserName('Enara Executive');
    } else {
      setUserName(role === 'student' ? 'Sarah Ahmed' : 'Director Khalid');
    }
  };

  const handleLogout = () => {
    setState({ role: null, page: 'courses', activeAssessment: null });
  };

  const navigate = (page: string) => {
    setState(prev => ({ ...prev, page, activeAssessment: null, selectedStudent: null, sharedCourseId: null }));
  };

  const viewStudentProfile = (student: Student) => {
    setState(prev => ({ ...prev, page: 'student-profile', selectedStudent: student }));
  };

  const viewStudentDeepAnalytics = (student: Student) => {
    setState(prev => ({ ...prev, page: 'student-analytics', selectedStudent: student }));
  };

  const startAssessment = (assessmentId: string) => {
    if (state.completedAssessmentIds.has(assessmentId)) {
      alert('You have already completed this assessment. Shared assessments can only be opened once.');
      return;
    }
    const assessment = assessments.find(a => a.id === assessmentId);
    if (assessment) {
      setState(prev => ({ ...prev, page: 'taking-assessment', activeAssessment: assessment }));
    }
  };

  const completeAssessment = (score: number) => {
    if (state.activeAssessment) {
      const id = state.activeAssessment.id;
      setState(prev => {
        const newCompleted = new Set(prev.completedAssessmentIds);
        newCompleted.add(id);
        return { ...prev, page: 'dashboard', activeAssessment: null, completedAssessmentIds: newCompleted };
      });
    } else {
      setState(prev => ({ ...prev, page: 'dashboard', activeAssessment: null }));
    }
  };

  if (!state.role) {
    return (
      <Login 
        onLogin={handleLogin} 
        isSharedCourse={!!state.sharedCourseId} 
        isSharedAssessment={!!state.sharedAssessmentId}
      />
    );
  }

    if (state.role === 'student') {
    if (state.page === 'taking-assessment' && state.activeAssessment) {
      return (
        <div className="min-h-screen bg-slate-50">
          <AssessmentInterface 
            assessment={state.activeAssessment} 
            onComplete={completeAssessment}
            onCancel={() => {
              if (state.sharedAssessmentId) {
                handleLogout();
              } else {
                navigate('dashboard');
              }
            }}
          />
        </div>
      );
    }

    // If it's a shared assessment link, we don't show the full layout with sidebar/tabs
    if (state.sharedAssessmentId && state.page === 'dashboard') {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 text-center">
            <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Assessment Completed</h2>
            <p className="text-slate-500 mb-8">Thank you for completing the assessment. Your results have been recorded.</p>
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
            >
              Close and Logout
            </button>
          </div>
        </div>
      );
    }

    return (
      <StudentLayout 
        activeTab={state.page} 
        onNavigate={navigate} 
        userName={userName} 
        onLogout={handleLogout}
        onBack={state.page !== 'dashboard' ? () => navigate('dashboard') : undefined}
      >
        {state.page === 'dashboard' && state.role !== 'student' && <StudentDashboard onStartAssessment={startAssessment} onNavigate={navigate} assessments={assessments} />}
        {state.page === 'courses' && <CoursePage initialCourseId={state.sharedCourseId} courses={MOCK_COURSES} />}
        {state.page === 'results' && <TestResults completedIds={state.completedAssessmentIds} />}
        {state.page === 'assessments' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Assessments</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assessments.map(asm => (
                <div key={asm.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 rounded-lg bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider">
                      {asm.subject}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{asm.title}</h3>
                  <p className="text-xs text-slate-500 mb-6">{asm.questions.length} Questions • {asm.duration} mins</p>
                  <button 
                    onClick={() => startAssessment(asm.id)}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                  >
                    Start Assessment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </StudentLayout>
    );
  }

  if (state.role === 'enara-admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header 
          role="enara-admin" 
          userName={userName} 
          onLogout={handleLogout} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onBack={state.page !== 'dashboard' ? () => navigate('dashboard') : undefined}
        />
        <div className="flex-1 flex overflow-hidden relative">
          <AdminSidebar 
            activeTab={state.page} 
            onNavigate={navigate} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isEnaraAdmin={true}
            role="enara-admin"
          />
          <main className="flex-1 overflow-y-auto p-8">
            {state.page === 'dashboard' && <EnaraAdminDashboard onNavigate={navigate} />}
            {state.page === 'revenue' && <RevenueGrowth />}
            {state.page === 'institutions' && <InstitutionCRM onNavigate={navigate} />}
            {state.page === 'contracts' && <ContractManagement />}
            {state.page === 'health' && <PlatformHealth />}
            {state.page === 'roi' && <ROIMetrics />}
            {state.page === 'financials' && <Financials />}
            {state.page === 'audit' && <AuditCompliance />}
            {state.page === 'integrations' && <Integrations />}
            {state.page === 'settings' && <div className="p-20 text-center text-slate-400">Platform Global Settings</div>}
          </main>
          <AIAssistant students={students} assessments={assessments} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header 
        role="admin" 
        userName={userName} 
        onLogout={handleLogout} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onBack={state.page !== 'dashboard' ? () => navigate('dashboard') : undefined}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <AdminSidebar 
          activeTab={state.page} 
          onNavigate={navigate} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          role="admin"
        />
        <main className="flex-1 overflow-y-auto">
          {state.page === 'dashboard' && <AdminDashboard onNavigate={navigate} students={students} setStudents={setStudents} onViewStudent={viewStudentProfile} />}
          {state.page === 'course-intelligence' && <CourseTeacherAnalytics onViewStudent={viewStudentDeepAnalytics} />}
          {state.page === 'institution-analytics' && <InstitutionAnalytics />}
          {state.page === 'student-analytics' && state.selectedStudent && (
            <StudentDeepAnalytics student={state.selectedStudent} onBack={() => navigate('dashboard')} />
          )}
          {state.page === 'partners' && <div className="p-20 text-center text-slate-400">Partner Management & CRM</div>}
          {state.page === 'programmes' && <div className="p-20 text-center text-slate-400">Programmes & Cohort Management</div>}
          {state.page === 'students' && (
            <StudentManagement 
              students={students} 
              setStudents={setStudents} 
              onViewStudent={viewStudentProfile} 
              onViewDeepAnalytics={viewStudentDeepAnalytics}
            />
          )}
          {(state.page === 'engagement' || state.page === 'analytics') && <ResearchInsights />}
          {state.page === 'outcomes' && <div className="p-20 text-center text-slate-400">Learning Outcomes & Success Metrics</div>}
          {state.page === 'operations' && <div className="p-20 text-center text-slate-400">Operational Efficiency & Resource Management</div>}
          {state.page === 'integrations' && <Integrations />}
          {state.page === 'governance' && <div className="p-20 text-center text-slate-400">Platform Governance & Security</div>}
          {state.page === 'compliance' && <div className="p-20 text-center text-slate-400">Accessibility & Compliance Audits</div>}
          {state.page === 'curriculum' && <CurriculumCenter />}
          {state.page === 'assignments' && <AssessmentCenter assessments={assessments} setAssessments={setAssessments} />}
          {state.page === 'credits' && <AICredits />}
          {state.page === 'settings' && <div className="p-20 text-center text-slate-400">Institution Configuration</div>}
          {state.page === 'student-profile' && state.selectedStudent && (
            <StudentProfile 
              student={state.selectedStudent} 
              onBack={() => navigate('students')} 
              onViewDeepAnalytics={() => viewStudentDeepAnalytics(state.selectedStudent!)}
            />
          )}
        </main>
        <AIAssistant students={students} assessments={assessments} />
      </div>
    </div>
  );
};

export default App;
