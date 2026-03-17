
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardCheck, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Users,
  PieChart,
  MessageSquare,
  Share2,
  Check,
  Copy,
  Menu,
  X,
  ChevronLeft,
  Building2
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

export const Header: React.FC<{ 
  role: string; 
  userName: string; 
  onLogout: () => void; 
  onToggleSidebar?: () => void;
  onBack?: () => void;
}> = ({ role, userName, onLogout, onToggleSidebar, onBack }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShareApp = async () => {
    const url = window.location.origin;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div className="flex items-center gap-1.5 sm:gap-4">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={18} />
          </button>
        )}
        
        {onBack && (
          <button 
            onClick={onBack}
            className="p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline text-sm font-medium">Back</span>
          </button>
        )}

        <div className="flex items-center gap-1.5 sm:gap-2 ml-0.5 sm:ml-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:xl bg-teal-400/20 flex items-center justify-center border border-teal-400/30">
            <span className="text-xl sm:text-2xl font-bold text-white">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold text-teal-900 leading-none">Enara</span>
            <span className="text-[6px] sm:text-[8px] font-bold text-teal-600 uppercase tracking-widest mt-0.5">Intelligence you can learn from.</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-6">
        <button 
          onClick={handleShareApp}
          className="flex items-center gap-2 px-2 sm:px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-all text-xs sm:text-sm font-medium border border-slate-200"
        >
          <Share2 size={14} />
          <span className="hidden md:inline">Share App</span>
        </button>

        {showShareToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium z-[100] flex items-center gap-2 animate-slide-in">
            <Check size={14} className="text-emerald-400" />
            App link copied!
          </div>
        )}

        <button className="relative p-1.5 sm:p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 sm:gap-3 pl-1.5 sm:pl-2 pr-1 py-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-xs sm:text-sm font-semibold text-slate-800">{userName}</span>
              <span className="text-[10px] sm:text-xs text-slate-500 capitalize">{role}</span>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full teal-gradient flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden z-50">
              <button className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <Settings size={16} /> Settings
              </button>
              <button 
                onClick={onLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-50"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export const AdminSidebar: React.FC<{ 
  activeTab: string; 
  onNavigate: (t: string) => void; 
  isOpen?: boolean; 
  onClose?: () => void;
  isEnaraAdmin?: boolean;
}> = ({ activeTab, onNavigate, isOpen, onClose, isEnaraAdmin }) => {
  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const enaraMenuItems = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'institutions', label: 'Institutions', icon: Building2 },
    { id: 'analytics', label: 'Global Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const menuItems = isEnaraAdmin ? enaraMenuItems : adminMenuItems;

  const handleNavigate = (id: string) => {
    onNavigate(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:sticky top-0 lg:top-[65px] sm:lg:top-[73px] left-0 z-[70] lg:z-40
        w-64 border-r border-gray-200 bg-white h-screen lg:h-[calc(100vh-65px)] sm:lg:h-[calc(100vh-73px)] 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        py-6 flex flex-col
      `}>
        <div className="lg:hidden px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center text-white font-bold">E</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-teal-900 leading-none">Enara</span>
              <span className="text-[6px] font-bold text-teal-600 uppercase tracking-widest">Intelligence you can learn from.</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? 'bg-teal-50 text-teal-700 font-semibold' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-teal-600' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="bg-slate-50 rounded-2xl p-4 text-center">
            <PieChart size={24} className="mx-auto text-teal-600 mb-2" />
            <p className="text-xs font-semibold text-slate-900">Weekly Goal</p>
            <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600" style={{ width: '75%' }}></div>
            </div>
            <p className="mt-2 text-[10px] text-slate-500">75% Institutional Progress</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export const StudentLayout: React.FC<{ 
  children: React.ReactNode; 
  activeTab: string; 
  onNavigate: (t: string) => void; 
  userName: string; 
  onLogout: () => void;
  onBack?: () => void;
}> = ({ 
  children, activeTab, onNavigate, userName, onLogout, onBack 
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header role="student" userName={userName} onLogout={onLogout} onBack={onBack} />
      <div className="max-w-[1600px] mx-auto flex flex-col">
        {/* Sub Navigation */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-2 overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="flex gap-4 sm:gap-8">
            {['courses', 'assessments'].map((tab) => (
              <button
                key={tab}
                onClick={() => onNavigate(tab)}
                className={`py-3 px-1 text-sm font-semibold transition-all border-b-2 capitalize ${
                  activeTab === tab 
                  ? 'border-teal-600 text-teal-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
