
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
import { Curriculum, Batch, Chapter } from '../types';
import { MOCK_CURRICULUMS, MOCK_BATCHES } from '../constants';

export const CurriculumCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curriculums' | 'batches'>('curriculums');
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
  
  // Search & Filter States
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [batchSearch, setBatchSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState<'all' | 'assigned' | 'unassigned'>('all');

  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedCurriculum, setSelectedCurriculum] = useState<Curriculum | null>(null);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  // Form States for Batch
  const [batchForm, setBatchForm] = useState({ name: '', studentCount: 0 });

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
    return curriculums.filter(c => 
      c.name.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      c.type.toLowerCase().includes(curriculumSearch.toLowerCase())
    );
  }, [curriculums, curriculumSearch]);

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
    const id = `c${Date.now()}`;
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
      };
      setBatches(prev => [...prev, newBatch]);
    }
    setShowBatchModal(false);
    setEditingBatch(null);
    setBatchForm({ name: '', studentCount: 0 });
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
          ) : (
            <button 
              onClick={() => openBatchModal()}
              className="flex-1 sm:flex-none teal-gradient text-white px-4 sm:px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-900/10 hover:scale-[1.02] transition-all active:scale-[0.98] text-sm sm:text-base"
            >
              <Plus size={20} />
              New Batch
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
      </div>

      {activeTab === 'curriculums' ? (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {[
              { label: 'Active Curriculums', value: curriculums.length, icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Assigned Batches', value: batches.filter(b => b.curriculumId).length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Unassigned Batches', value: batches.filter(b => !b.curriculumId).length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={curriculumSearch}
                onChange={(e) => setCurriculumSearch(e.target.value)}
                placeholder="Search curriculums..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
              Filters
            </button>
          </div>

          {/* Curriculum List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCurriculums.map((curriculum) => (
              <div key={curriculum.id} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-teal-200 transition-all group shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">{curriculum.name}</h3>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {curriculum.type}
                          </span>
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                            curriculum.status === 'deployed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {curriculum.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mb-2 font-medium">Course: {curriculum.courseName} • Level: {curriculum.level}</p>
                      {curriculum.status === 'deployed' && (
                        <div className="flex items-center gap-2 mb-3 bg-slate-50 w-fit px-2 py-1 rounded border border-slate-100">
                          <LinkIcon size={12} className="text-slate-400" />
                          <code className="text-[10px] text-slate-500 font-mono">ID: {curriculum.id}</code>
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-slate-500 mb-3 max-w-2xl line-clamp-2">{curriculum.summary}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <BookOpen size={14} /> {curriculum.chapters.length} Chapters
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Globe size={14} /> {curriculum.languages.join(', ')}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> Updated {curriculum.lastUpdated}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} /> {curriculum.assignedBatches.length} Batches
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col justify-start sm:justify-end lg:justify-start gap-2">
                    {curriculum.status === 'deployed' ? (
                      <button 
                        onClick={() => {
                          setSelectedLink(`${window.location.origin}/?course=${curriculum.id}`);
                          setShowLinkModal(true);
                        }}
                        className="flex-1 lg:flex-none px-3 sm:px-4 py-2 bg-teal-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-teal-900/10"
                        title="View Shareable Link"
                      >
                        <Globe size={16} />
                        <span className="sm:inline">Share Link</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleDeploy(curriculum.id)}
                        className="flex-1 lg:flex-none px-3 sm:px-4 py-2 bg-amber-500 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-900/10"
                        title="Deploy Curriculum"
                      >
                        <Globe size={16} />
                        <span className="sm:inline">Deploy Now</span>
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setSelectedCurriculum(curriculum);
                        setShowAssignModal(true);
                      }}
                      className="flex-1 lg:flex-none px-3 sm:px-4 py-2 bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <LinkIcon size={16} />
                      <span className="sm:inline">Assign</span>
                    </button>
                  </div>
                </div>
                
                {curriculum.assignedBatches.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-50 flex flex-wrap gap-2">
                    {curriculum.assignedBatches.map((batch, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100 group/batch">
                        {batch}
                        <button 
                          onClick={() => unassignBatch(curriculum.id, batch)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
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

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Name</th>
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
                            <button 
                              onClick={() => {
                                setSelectedLink(`${window.location.origin}/?course=${assignedCurriculum.id}`);
                                setShowLinkModal(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors"
                              title="Share Course Link"
                            >
                              <Globe size={14} />
                            </button>
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
                {filteredBatches.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                      No batches found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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

              <div className="flex gap-4 mt-10">
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
    </div>
  );
};
