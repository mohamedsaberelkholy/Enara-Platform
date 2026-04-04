
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Upload, 
  Link as LinkIcon, 
  MoreVertical, 
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileText,
  Users,
  Trash2,
  Edit2,
  X,
  Globe,
  Layers,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft
} from 'lucide-react';
import { Curriculum, Batch, Chapter, CourseInstance, Student } from '../types';
import { MOCK_CURRICULUMS, MOCK_BATCHES, MOCK_INSTITUTIONS, MOCK_COURSE_INSTANCES, MOCK_STUDENTS } from '../constants';

export const CurriculumCenter: React.FC<{ isEnaraAdmin?: boolean }> = ({ isEnaraAdmin }) => {
  const [activeTab, setActiveTab] = useState<'curriculums' | 'batches' | 'instances'>('curriculums');
  const [curriculums, setCurriculums] = useState<Curriculum[]>(() => {
    const saved = localStorage.getItem('enara_curriculums');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse curriculums from localStorage', e);
      }
    }
    return MOCK_CURRICULUMS;
  });

  useEffect(() => {
    localStorage.setItem('enara_curriculums', JSON.stringify(curriculums));
  }, [curriculums]);
  const [batches, setBatches] = useState<Batch[]>(MOCK_BATCHES);
  const [courseInstances, setCourseInstances] = useState<CourseInstance[]>(MOCK_COURSE_INSTANCES);
  const [students] = useState<Student[]>(MOCK_STUDENTS);
  
  // Search & Filter States
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [curriculumTypeFilter, setCurriculumTypeFilter] = useState('All Types');
  const [curriculumStatusFilter, setCurriculumStatusFilter] = useState('All Status');
  const [partnerFilter, setPartnerFilter] = useState('All Partners');
  const [batchSearch, setBatchSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');
  
  const [instanceSearch, setInstanceSearch] = useState('');
  const [instanceYearFilter, setInstanceYearFilter] = useState('All Years');
  const [instanceBatchFilter, setInstanceBatchFilter] = useState('All Batches');

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showInstanceModal, setShowInstanceModal] = useState(false);
  const [showAssignStudentModal, setShowAssignStudentModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [selectedInstance, setSelectedInstance] = useState<CourseInstance | null>(null);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  // Form States for Batch
  const [batchForm, setBatchForm] = useState({ name: '', studentCount: 0, academicYear: '2023-2024', groupId: '' });

  // Form States for Instance
  const [instanceForm, setInstanceForm] = useState({
    courseId: '',
    courseName: '',
    academicYear: '2023-2024',
    batchId: '',
    curriculumId: '',
    groupId: ''
  });

  // Form States for Curriculum
  const [curriculumForm, setCurriculumForm] = useState({
    name: '',
    courseName: '',
    type: 'National',
    level: 'Grade 10',
    languages: ['English'],
    summary: '',
    description: ''
  });
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const filteredCurriculums = useMemo(() => {
    return curriculums.filter(c => {
      const searchLower = curriculumSearch.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(searchLower) ||
                           c.id.toLowerCase().includes(searchLower) ||
                           c.courseName.toLowerCase().includes(searchLower) ||
                           c.type.toLowerCase().includes(searchLower);
      const matchesType = curriculumTypeFilter === 'All Types' || c.type === curriculumTypeFilter;
      const matchesStatus = curriculumStatusFilter === 'All Status' || c.status === curriculumStatusFilter.toLowerCase();
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [curriculums, curriculumSearch, curriculumTypeFilter, curriculumStatusFilter]);

  const filteredBatches = useMemo(() => {
    return batches.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(batchSearch.toLowerCase());
      const matchesFilter = 
        batchFilter === 'all' ? true :
        batchFilter === 'assigned' ? !!b.curriculumId :
        !b.curriculumId;
      return matchesSearch && matchesFilter;
    });
  }, [batches, batchSearch, batchFilter]);

  const filteredInstances = useMemo(() => {
    return courseInstances.filter(inst => {
      const matchesSearch = inst.courseName.toLowerCase().includes(instanceSearch.toLowerCase()) ||
                           inst.courseId.toLowerCase().includes(instanceSearch.toLowerCase());
      const matchesYear = instanceYearFilter === 'All Years' || inst.academicYear === instanceYearFilter;
      const matchesBatch = instanceBatchFilter === 'All Batches' || inst.batchId === instanceBatchFilter;
      
      return matchesSearch && matchesYear && matchesBatch;
    });
  }, [courseInstances, instanceSearch, instanceYearFilter, instanceBatchFilter]);

  const handleAssign = (batchId: string) => {
    if (!selectedCurriculum) return;
    
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return;

    setBatches(prev => prev.map(b => 
      b.id === batchId ? { ...b, curriculumId: selectedCurriculum.id } : b
    ));
    
    setCurriculums(prev => prev.map(c => 
      c.id === selectedCurriculum.id 
        ? { ...c, assignedBatches: [...new Set([...c.assignedBatches, batch.name])] } 
        : c
    ));
    
    setShowAssignModal(false);
  };

  const handleCreateCurriculum = (status: 'draft' | 'deployed') => {
    const id = `CUR-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newCurriculum: Curriculum = {
      id,
      name: curriculumForm.name,
      courseName: curriculumForm.courseName,
      type: curriculumForm.type,
      level: curriculumForm.level,
      languages: curriculumForm.languages,
      summary: curriculumForm.summary,
      description: curriculumForm.description,
      lastUpdated: new Date().toISOString().split('T')[0],
      subjectsCount: chapters.length,
      assignedBatches: [],
      chapters: chapters,
      status: status,
      deploymentLink: status === 'deployed' ? `${window.location.origin}/?course=${id}` : undefined
    };

    setCurriculums(prev => [newCurriculum, ...prev]);
    setShowUploadModal(false);
    resetCurriculumForm();
  };

  const resetCurriculumForm = () => {
    setCurriculumForm({
      name: '',
      courseName: '',
      type: 'National',
      level: 'Grade 10',
      languages: ['English'],
      summary: '',
      description: ''
    });
    setChapters([]);
    setExpandedChapters([]);
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch${Date.now()}`,
      title: '',
      uploads: [],
      description: ''
    };
    setChapters(prev => [...prev, newChapter]);
    setExpandedChapters(prev => [...prev, newChapter.id]);
  };

  const updateChapter = (id: string, updates: Partial<Chapter>) => {
    setChapters(prev => prev.map(ch => ch.id === id ? { ...ch, ...updates } : ch));
  };

  const removeChapter = (id: string) => {
    setChapters(prev => prev.filter(ch => ch.id !== id));
  };

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (chapterId: string, fileName: string) => {
    setChapters(prev => prev.map(ch => 
      ch.id === chapterId ? { ...ch, uploads: [...ch.uploads, fileName] } : ch
    ));
  };

  const removeUpload = (chapterId: string, fileName: string) => {
    setChapters(prev => prev.map(ch => 
      ch.id === chapterId ? { ...ch, uploads: ch.uploads.filter(u => u !== fileName) } : ch
    ));
  };

  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const copyDeploymentLink = async (link: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
        setCopySuccess('Link copied to clipboard!');
      } else {
        // Fallback for iframes or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopySuccess('Link copied to clipboard!');
        } catch (error) {
          console.error(error);
          setCopySuccess('Failed to copy. Please copy manually: ' + link);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed to copy. Please copy manually: ' + link);
    }
    
    setTimeout(() => setCopySuccess(null), 5000);
  };

  const handleDeploy = (curriculumId: string) => {
    setCurriculums(prev => prev.map(c => 
      c.id === curriculumId ? { ...c, status: 'deployed' } : c
    ));
    setCopySuccess('Curriculum deployed successfully!');
    setTimeout(() => setCopySuccess(null), 3000);
  };

  const unassignBatch = (curriculumId: string, batchName: string) => {
    setCurriculums(prev => prev.map(c => 
      c.id === curriculumId 
        ? { ...c, assignedBatches: c.assignedBatches.filter(b => b !== batchName) } 
        : c
    ));
    setBatches(prev => prev.map(b => 
      b.name === batchName ? { ...b, curriculumId: undefined } : b
    ));
  };

  const handleSaveBatch = () => {
    if (editingBatch) {
      setBatches(prev => prev.map(b => 
        b.id === editingBatch.id ? { ...b, ...batchForm } : b
      ));
      // Update curriculum assigned batches names if name changed
      if (editingBatch.name !== batchForm.name) {
        setCurriculums(prev => prev.map(c => ({
          ...c,
          assignedBatches: c.assignedBatches.map(name => name === editingBatch.name ? batchForm.name : name)
        })));
      }
    } else {
      const newBatch: Batch = {
        id: `b${Date.now()}`,
        name: batchForm.name,
        studentCount: batchForm.studentCount,
        academicYear: batchForm.academicYear,
        groupId: batchForm.groupId
      };
      setBatches(prev => [...prev, newBatch]);
    }
    setShowBatchModal(false);
    setEditingBatch(null);
    setBatchForm({ name: '', studentCount: 0, academicYear: '2023-2024', groupId: '' });
  };

  const handleSaveInstance = () => {
    const newInstance: CourseInstance = {
      id: `inst-${Date.now()}`,
      ...instanceForm,
      studentIds: []
    };
    setCourseInstances(prev => [newInstance, ...prev]);
    setShowInstanceModal(false);
    setInstanceForm({
      courseId: '',
      courseName: '',
      academicYear: '2023-2024',
      batchId: '',
      curriculumId: '',
      groupId: ''
    });
  };

  const handleAssignStudent = (studentId: string) => {
    if (!selectedInstance) return;
    setCourseInstances(prev => prev.map(inst => 
      inst.id === selectedInstance.id 
        ? { ...inst, studentIds: [...new Set([...inst.studentIds, studentId])] } 
        : inst
    ));
    setShowAssignStudentModal(false);
  };

  const removeStudentFromInstance = (instanceId: string, studentId: string) => {
    setCourseInstances(prev => prev.map(inst => 
      inst.id === instanceId 
        ? { ...inst, studentIds: inst.studentIds.filter(id => id !== studentId) } 
        : inst
    ));
  };

  const handleDeleteBatch = (id: string) => {
    const batch = batches.find(b => b.id === id);
    if (!batch) return;

    setBatches(prev => prev.filter(b => b.id !== id));
    // Remove from curriculum assigned list
    setCurriculums(prev => prev.map(c => ({
      ...c,
      assignedBatches: c.assignedBatches.filter(name => name !== batch.name)
    })));
  };

  const openBatchModal = (batch?: Batch) => {
    if (batch) {
      setEditingBatch(batch);
      setBatchForm({ name: batch.name, studentCount: batch.studentCount });
    } else {
      setEditingBatch(null);
      setBatchForm({ name: '', studentCount: 0 });
    }
    setShowBatchModal(true);
  };

  const handleOpenMaterial = (fileName: string) => {
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const isVideo = fileName.toLowerCase().endsWith('.mp4');
    
    if (isPdf) {
      window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
    } else if (isVideo) {
      window.open('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', '_blank');
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(fileName)}`, '_blank');
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto animate-slide-in relative">
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-in flex items-center gap-3 max-w-[calc(100vw-2rem)]">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
          <span className="font-medium text-sm sm:text-base truncate">{copySuccess}</span>
          <button onClick={() => setCopySuccess(null)} className="ml-4 text-slate-400 hover:text-white shrink-0">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Go Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-crimson">Curriculum Center</h1>
            <p className="text-slate-500 mt-1 text-xs sm:text-sm">Manage educational frameworks and batch assignments.</p>
          </div>
        </div>
        <div className="flex gap-3">
          {activeTab === 'curriculums' ? (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="flex-1 sm:flex-none teal-gradient text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all active:scale-[0.98] text-sm sm:text-base"
            >
              <Plus size={20} />
              Upload Curriculum
            </button>
          ) : activeTab === 'batches' ? (
            <button 
              onClick={() => openBatchModal()}
              className="flex-1 sm:flex-none teal-gradient text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all active:scale-[0.98] text-sm sm:text-base"
            >
              <Plus size={20} />
              New Batch
            </button>
          ) : (
            <button 
              onClick={() => setShowInstanceModal(true)}
              className="flex-1 sm:flex-none teal-gradient text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all active:scale-[0.98] text-sm sm:text-base"
            >
              <Plus size={20} />
              New Instance
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 sm:gap-8 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('curriculums')}
          className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'curriculums' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Curriculums
          {activeTab === 'curriculums' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('batches')}
          className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'batches' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Batches
          {activeTab === 'batches' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('instances')}
          className={`pb-4 text-sm font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'instances' ? 'text-teal-600' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Course Instances
          {activeTab === 'instances' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />}
        </button>
      </div>

      {activeTab === 'curriculums' ? (
        <>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search curriculums by name, ID, or type..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={curriculumTypeFilter}
                  onChange={(e) => setCurriculumTypeFilter(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                >
                  <option>All Types</option>
                  <option>National</option>
                  <option>IGCSE</option>
                  <option>IB</option>
                  <option>American</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select 
                  value={curriculumStatusFilter}
                  onChange={(e) => setCurriculumStatusFilter(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Draft</option>
                  <option>Deployed</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCurriculums.map((curr) => (
              <div key={curr.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-teal-200 transition-all shadow-sm hover:shadow-xl hover:shadow-teal-900/5 group relative overflow-hidden flex flex-col">
                {/* Status Badge */}
                <div className="absolute top-0 right-0">
                  <div className={`px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-[0.2em] ${
                    curr.status === 'deployed' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'
                  }`}>
                    {curr.status}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-mono font-bold rounded uppercase tracking-wider">
                      {curr.id}
                    </span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded uppercase tracking-wider">
                      {curr.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">{curr.name}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{curr.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Subjects</p>
                    <p className="text-lg font-bold text-slate-900">{curr.subjectsCount}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-wider">Batches</p>
                    <p className="text-lg font-bold text-slate-900">{curr.assignedBatches.length}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {curr.assignedBatches.length > 0 ? (
                    curr.assignedBatches.slice(0, 2).map((batch, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full border border-teal-100">
                        {batch}
                        <button onClick={() => unassignBatch(curr.id, batch)} className="hover:text-red-600">
                          <X size={10} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 font-bold italic">No batches assigned</span>
                  )}
                  {curr.assignedBatches.length > 2 && (
                    <span className="text-[10px] text-slate-400 font-bold">+{curr.assignedBatches.length - 2} more</span>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSelectedCurriculum(curr);
                        setShowAssignModal(true);
                      }}
                      className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                      title="Assign to Batch"
                    >
                      <LinkIcon size={18} />
                    </button>
                    {curr.status === 'deployed' && (
                      <button 
                        onClick={() => {
                          setSelectedLink(curr.deploymentLink || '');
                          setShowLinkModal(true);
                        }}
                        className="p-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-all border border-teal-100"
                        title="View Deployment Link"
                      >
                        <Globe size={18} />
                      </button>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Updated</p>
                    <p className="text-xs font-bold text-slate-600">{curr.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTab === 'batches' ? (
        <>
          {/* Batch View */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={batchSearch}
                onChange={(e) => setBatchSearch(e.target.value)}
                placeholder="Search batches..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {(['all', 'assigned', 'unassigned'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBatchFilter(filter)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all whitespace-nowrap ${
                    batchFilter === filter 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Year / Group</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Curriculum</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.map((batch) => {
                  const assignedCurriculum = curriculums.find(c => c.id === batch.curriculumId);
                  return (
                    <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                            {batch.name.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{batch.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{batch.academicYear}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-bold">{batch.groupId || 'No Group'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 flex items-center gap-1.5">
                          <Users size={14} className="text-slate-400" />
                          {batch.studentCount} Students
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {assignedCurriculum ? (
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-100">
                              {assignedCurriculum.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No curriculum assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openBatchModal(batch)}
                            className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Course Instances View */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={instanceSearch}
                onChange={(e) => setInstanceSearch(e.target.value)}
                placeholder="Search instances by course name or ID..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select 
                value={instanceYearFilter}
                onChange={(e) => setInstanceYearFilter(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              >
                <option>All Years</option>
                <option>2023-2024</option>
                <option>2024-2025</option>
              </select>
              <select 
                value={instanceBatchFilter}
                onChange={(e) => setInstanceBatchFilter(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              >
                <option value="All Batches">All Batches</option>
                {batches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstances.map((inst) => {
              const batch = batches.find(b => b.id === inst.batchId);
              const curriculum = curriculums.find(c => c.id === inst.curriculumId);
              return (
                <div key={inst.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-teal-200 transition-all shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{inst.courseName}</h3>
                      <p className="text-xs text-slate-400 font-mono uppercase">{inst.courseId}</p>
                    </div>
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                      {inst.academicYear}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Layers size={16} className="text-slate-400" />
                      <span>Batch: <span className="font-semibold">{batch?.name || 'Unknown'}</span></span>
                    </div>
                    {curriculum && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BookOpen size={16} className="text-slate-400" />
                        <span>Curriculum: <span className="font-semibold text-teal-600">{curriculum.name}</span> <span className="text-[10px] text-slate-400 font-mono ml-1">({curriculum.id})</span></span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={16} className="text-slate-400" />
                      <span>Students: <span className="font-semibold">{inst.studentIds.length}</span></span>
                    </div>
                    {inst.groupId && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users size={16} className="text-slate-400" />
                        <span>Group: <span className="font-semibold">{inst.groupId}</span></span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {inst.studentIds.slice(0, 3).map(id => {
                      const student = students.find(s => s.id === id);
                      return (
                        <div key={id} className="flex items-center gap-1.5 px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full border border-teal-100">
                          {student?.name || id}
                          <button onClick={() => removeStudentFromInstance(inst.id, id)} className="hover:text-red-600">
                            <X size={10} />
                          </button>
                        </div>
                      );
                    })}
                    {inst.studentIds.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-bold">+{inst.studentIds.length - 3} more</span>
                    )}
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedInstance(inst);
                      setShowAssignStudentModal(true);
                    }}
                    className="w-full py-2.5 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl hover:bg-teal-50 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Assign Students
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Assign Modal */}
      {showAssignModal && selectedCurriculum && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-in overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assign Curriculum</h2>
                <p className="text-sm text-slate-500 mt-1">Assigning: {selectedCurriculum.name}</p>
              </div>
              <button onClick={() => setShowAssignModal(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
              {batches.map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => handleAssign(batch.id)}
                  disabled={batch.curriculumId === selectedCurriculum.id}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    batch.curriculumId === selectedCurriculum.id
                      ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed'
                      : 'border-slate-200 hover:border-teal-500 hover:bg-teal-50/30'
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-900">{batch.name}</p>
                    <p className="text-xs text-slate-500">{batch.studentCount} Students</p>
                  </div>
                  {batch.curriculumId === selectedCurriculum.id ? (
                    <CheckCircle2 className="text-emerald-500" size={20} />
                  ) : (
                    <Plus className="text-slate-300 group-hover:text-teal-500" size={20} />
                  )}
                </button>
              ))}
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowAssignModal(false)}
                className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Preview Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl animate-slide-in overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Course Access Link</h2>
                </div>
                <button 
                  onClick={() => setShowLinkModal(false)} 
                  className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-slate-500 text-sm mb-6">
                Share this unique link with your students. They will be taken directly to the course content after logging in.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 group relative">
                <div className="flex items-center justify-between gap-4">
                  <code className="text-sm text-indigo-600 font-mono break-all select-all">
                    {selectedLink}
                  </code>
                  <button 
                    onClick={() => copyDeploymentLink(selectedLink)}
                    className="shrink-0 p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all shadow-sm"
                    title="Copy to Clipboard"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowLinkModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => window.open(selectedLink, '_blank')}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/10 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  Open Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Batch Modal (Create/Edit) */}
      {showBatchModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{editingBatch ? 'Edit Batch' : 'New Batch'}</h2>
                <button onClick={() => setShowBatchModal(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Batch Name</label>
                  <input 
                    type="text" 
                    value={batchForm.name}
                    onChange={(e) => setBatchForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="e.g. Batch E - 2024" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year</label>
                    <select 
                      value={batchForm.academicYear}
                      onChange={(e) => setBatchForm(prev => ({ ...prev, academicYear: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option>2023-2024</option>
                      <option>2024-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Group ID</label>
                    <input 
                      type="text" 
                      value={batchForm.groupId}
                      onChange={(e) => setBatchForm(prev => ({ ...prev, groupId: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                      placeholder="e.g. Group A" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Student Count</label>
                  <input 
                    type="number" 
                    value={batchForm.studentCount}
                    onChange={(e) => setBatchForm(prev => ({ ...prev, studentCount: parseInt(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => setShowBatchModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveBatch}
                  disabled={!batchForm.name}
                  className="flex-1 px-6 py-3 teal-gradient text-white rounded-xl font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  {editingBatch ? 'Save Changes' : 'Create Batch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-slide-in max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-slate-900">Create Curriculum</h2>
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    resetCurriculumForm();
                  }} 
                  className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-slate-500 mb-8">Define your educational framework and structure.</p>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Curriculum Name</label>
                    <input 
                      type="text" 
                      value={curriculumForm.name}
                      onChange={(e) => setCurriculumForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                      placeholder="e.g. British Council - Year 11" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Course Name</label>
                    <input 
                      type="text" 
                      value={curriculumForm.courseName}
                      onChange={(e) => setCurriculumForm(prev => ({ ...prev, courseName: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                      placeholder="e.g. Secondary Mathematics" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                    <select 
                      value={curriculumForm.type}
                      onChange={(e) => setCurriculumForm(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option>National</option>
                      <option>IGCSE</option>
                      <option>IB</option>
                      <option>American</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Level (AI Context)</label>
                    <input 
                      type="text" 
                      value={curriculumForm.level}
                      onChange={(e) => setCurriculumForm(prev => ({ ...prev, level: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                      placeholder="e.g. Grade 10 / Advanced" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Languages (Multiple)</label>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    {['English', 'Arabic', 'French', 'Spanish', 'German'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => {
                          const langs = curriculumForm.languages.includes(lang)
                            ? curriculumForm.languages.filter(l => l !== lang)
                            : [...curriculumForm.languages, lang];
                          setCurriculumForm(prev => ({ ...prev, languages: langs }));
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          curriculumForm.languages.includes(lang)
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Curriculum Summary (Mandatory for AI)</label>
                  <textarea 
                    value={curriculumForm.summary}
                    onChange={(e) => setCurriculumForm(prev => ({ ...prev, summary: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 resize-none" 
                    placeholder="Provide a high-level summary for AI context..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700">Chapter Structure</label>
                    <button 
                      onClick={addChapter}
                      className="text-teal-600 text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      <Plus size={14} /> Add Chapter
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {chapters.map((chapter, idx) => (
                      <div key={chapter.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                        <div 
                          className="p-4 bg-slate-50 flex items-center justify-between cursor-pointer"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                              {idx + 1}
                            </span>
                            <input 
                              type="text"
                              value={chapter.title}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
                              placeholder="Chapter Title"
                              className="bg-transparent font-bold text-slate-900 border-none focus:ring-0 p-0 placeholder:text-slate-400"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeChapter(chapter.id);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                            {expandedChapters.includes(chapter.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>
                        
                        {expandedChapters.includes(chapter.id) && (
                          <div className="p-4 bg-white space-y-4 animate-slide-in">
                            <textarea 
                              value={chapter.description}
                              onChange={(e) => updateChapter(chapter.id, { description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:ring-2 focus:ring-teal-500/20 resize-none" 
                              placeholder="Chapter description..."
                            />
                            
                            <div className="space-y-2">
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Multi-Uploads</p>
                              <div className="flex flex-wrap gap-2">
                                  {chapter.uploads.map((file, fIdx) => (
                                    <div 
                                      key={fIdx} 
                                      onClick={() => handleOpenMaterial(file)}
                                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 cursor-pointer hover:bg-white hover:border-teal-200 transition-all"
                                    >
                                      <FileText size={12} />
                                      {file}
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeUpload(chapter.id, file);
                                        }} 
                                        className="hover:text-red-500 ml-1"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                <label className="px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg border border-teal-100 cursor-pointer hover:bg-teal-100 flex items-center gap-1">
                                  <Upload size={12} />
                                  Upload
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFileUpload(chapter.id, file.name);
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {chapters.length === 0 && (
                      <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                        <p className="text-sm text-slate-400 italic">No chapters added yet. Click "Add Chapter" to start building the structure.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button 
                  onClick={() => handleCreateCurriculum('draft')}
                  disabled={!curriculumForm.name || !curriculumForm.summary}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Save as Draft
                </button>
                <button 
                  onClick={() => handleCreateCurriculum('deployed')}
                  disabled={!curriculumForm.name || !curriculumForm.summary || chapters.length === 0}
                  className="flex-1 px-6 py-3 teal-gradient text-white rounded-xl font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Final Deployment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Instance Modal (Create) */}
      {showInstanceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">New Course Instance</h2>
                <button onClick={() => setShowInstanceModal(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Course ID</label>
                  <input 
                    type="text" 
                    value={instanceForm.courseId}
                    onChange={(e) => setInstanceForm(prev => ({ ...prev, courseId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="e.g. MATH101" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Course Name</label>
                  <input 
                    type="text" 
                    value={instanceForm.courseName}
                    onChange={(e) => setInstanceForm(prev => ({ ...prev, courseName: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="e.g. Algebra Fundamentals" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year</label>
                    <select 
                      value={instanceForm.academicYear}
                      onChange={(e) => setInstanceForm(prev => ({ ...prev, academicYear: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option>2023-2024</option>
                      <option>2024-2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Batch</label>
                    <select 
                      value={instanceForm.batchId}
                      onChange={(e) => setInstanceForm(prev => ({ ...prev, batchId: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">Select Batch</option>
                      {batches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Linked Curriculum (Optional)</label>
                  <select 
                    value={instanceForm.curriculumId}
                    onChange={(e) => setInstanceForm(prev => ({ ...prev, curriculumId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="">Select Curriculum</option>
                    {curriculums.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Group ID (Optional)</label>
                  <input 
                    type="text" 
                    value={instanceForm.groupId}
                    onChange={(e) => setInstanceForm(prev => ({ ...prev, groupId: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20" 
                    placeholder="e.g. Group A" 
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button 
                  onClick={() => setShowInstanceModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveInstance}
                  disabled={!instanceForm.courseId || !instanceForm.courseName || !instanceForm.batchId}
                  className="flex-1 px-6 py-3 teal-gradient text-white rounded-xl font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
                >
                  Create Instance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Student Modal */}
      {showAssignStudentModal && selectedInstance && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-slide-in overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Assign Students</h2>
                <p className="text-sm text-slate-500 mt-1">Instance: {selectedInstance.courseName}</p>
              </div>
              <button onClick={() => setShowAssignStudentModal(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
              {students.filter(s => !selectedInstance.studentIds.includes(s.id)).map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleAssignStudent(student.id)}
                  className="w-full p-4 rounded-2xl border border-slate-200 text-left transition-all flex items-center justify-between group hover:border-teal-500 hover:bg-teal-50/30"
                >
                  <div>
                    <p className="font-bold text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.id} • {student.grade}</p>
                  </div>
                  <Plus className="text-slate-300 group-hover:text-teal-500" size={20} />
                </button>
              ))}
              {students.filter(s => !selectedInstance.studentIds.includes(s.id)).length === 0 && (
                <p className="text-center text-slate-400 py-8 italic">All students are already assigned to this instance.</p>
              )}
            </div>
            <div className="p-6 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowAssignStudentModal(false)}
                className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
