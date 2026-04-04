
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Sparkles, 
  Clock, 
  BookOpen, 
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  Users,
  X,
  Copy,
  Globe,
  ExternalLink,
  Upload,
  FileText
} from 'lucide-react';
import { MOCK_CURRICULUMS, MOCK_BATCHES, MOCK_STUDENTS, MOCK_INSTITUTIONS } from '../constants';
import { Assessment, Question, AssessmentRecommendation, Student } from '../types';
import { generateAssessment, getAssessmentRecommendations } from '../services/geminiService';

interface AssessmentCenterProps {
  assessments: Assessment[];
  setAssessments: React.Dispatch<React.SetStateAction<Assessment[]>>;
  isEnaraAdmin?: boolean;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({ assessments, setAssessments, isEnaraAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('All Subjects');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulties');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [partnerFilter, setPartnerFilter] = useState('All Partners');
  const [academicYearFilter, setAcademicYearFilter] = useState('All Years');
  const [batchFilter, setBatchFilter] = useState('All Batches');
  const [creationMode, setCreationMode] = useState<'ai' | 'manual' | 'upload'>('ai');
  
  // AI Generation Form State
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [objectives, setObjectives] = useState('');
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [instructions, setInstructions] = useState('');
  const [recommendation, setRecommendation] = useState<AssessmentRecommendation | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);
  const [previewAssessment, setPreviewAssessment] = useState<Assessment | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [resultsAssessment, setResultsAssessment] = useState<Assessment | null>(null);
  const [selectedStudentSubmission, setSelectedStudentSubmission] = useState<{student: Student, result: any} | null>(null);
  const [gradingState, setGradingState] = useState<{[key: string]: {score: number, feedback: string}}>({});
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Manual Creation State
  const [manualQuestions, setManualQuestions] = useState<Partial<Question & { modelAnswerMode: 'text' | 'upload', modelAnswerFile?: string }>[]>([{
    type: 'multiple-choice',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    modelAnswer: '',
    modelAnswerMode: 'text'
  }]);

  // Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopySuccess('Link copied to clipboard!');
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleDelete = (id: string) => {
    setAssessments(prev => prev.filter(a => a.id !== id));
  };

  const handleGetRecommendations = async () => {
    if (!selectedBatchId) {
      alert("Please select a batch first to get recommendations.");
      return;
    }
    
    setIsRecommending(true);
    try {
      const batchStudents = MOCK_STUDENTS.filter(s => s.batchId === selectedBatchId || !s.batchId);
      const data = {
        mistakes: batchStudents.flatMap(s => s.pastResults?.flatMap(r => r.answers.filter(a => !a.isCorrect).map(a => a.questionText)) || []),
        chatLogs: batchStudents.flatMap(s => s.chatLogs?.map(l => l.text) || [])
      };
      
      const rec = await getAssessmentRecommendations(data);
      setRecommendation(rec);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsRecommending(false);
    }
  };

  const applyRecommendation = () => {
    if (recommendation) {
      setTopic(recommendation.suggestedTopic);
      setDifficulty(recommendation.suggestedDifficulty);
      setObjectives(`Focus areas: ${recommendation.focusAreas.join(', ')}. Question types: ${recommendation.suggestedQuestionTypes.join(', ')}.`);
      setIsPersonalized(true);
    }
  };

  const handleEdit = (asm: Assessment) => {
    setEditingAssessment(asm);
    setTopic(asm.title);
    setDifficulty(asm.difficulty);
    setInstructions(asm.instructions || '');
    setSelectedCurriculumId(asm.curriculumId || '');
    setSelectedBatchId(asm.batchId || '');
    setIsModalOpen(true);
  };

  const handleUpdateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssessment) return;

    setAssessments(prev => prev.map(a => 
      a.id === editingAssessment.id 
        ? { 
            ...a, 
            title: topic, 
            difficulty, 
            instructions, 
            curriculumId: selectedCurriculumId, 
            batchId: selectedBatchId 
          } 
        : a
    ));
    
    setIsModalOpen(false);
    setEditingAssessment(null);
    setTopic('');
    setInstructions('');
    setSelectedCurriculumId('');
    setSelectedBatchId('');
  };

  const handleCreateWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      let personalization = undefined;
      
      if (isPersonalized && selectedBatchId) {
        // Gather data from all students in the selected batch
        const batchStudents = MOCK_STUDENTS.filter(s => s.batchId === selectedBatchId || !s.batchId); // Fallback for mock data
        
        personalization = {
          mistakes: batchStudents.flatMap(s => s.pastResults?.flatMap(r => r.answers.filter(a => !a.isCorrect).map(a => a.questionText)) || []),
          chatLogs: batchStudents.flatMap(s => s.chatLogs?.map(l => l.text) || [])
        };
      }

      const result = await generateAssessment({
        topic,
        difficulty,
        numQuestions,
        objectives,
        personalization
      });

      const batch = MOCK_BATCHES.find(b => b.id === selectedBatchId);
      const newAssessment: Assessment = {
        id: `ASM-${Date.now()}`,
        title: isPersonalized && batch ? `Batch Adaptive: ${topic} (${batch.name})` : topic,
        subject: MOCK_CURRICULUMS.find(c => c.id === selectedCurriculumId)?.name || 'General',
        duration: numQuestions * 2, // 2 mins per question
        status: 'upcoming',
        dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        difficulty,
        curriculumId: selectedCurriculumId,
        batchId: selectedBatchId,
        instructions: instructions || result.suggestedInstructions,
        questions: result.questions.map((q: any, i: number) => ({
          id: `Q-${Date.now()}-${i}`,
          type: q.type,
          text: q.question,
          options: q.options,
          correctAnswer: q.type === 'short-answer' ? q.correctAnswer : parseInt(q.correctAnswer),
          explanation: q.explanation
        }))
      };

      setPreviewAssessment(newAssessment);
    } catch (error) {
      console.error("Failed to generate assessment:", error);
      alert("Failed to generate assessment. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeploy = () => {
    if (previewAssessment) {
      const deployedId = previewAssessment.id;
      setAssessments(prev => [previewAssessment, ...prev]);
      setPreviewAssessment(null);
      setIsModalOpen(false);
      
      // Show share link modal for the newly created assessment
      setSelectedLink(`${window.location.origin}/?assessment=${deployedId}`);
      setShowLinkModal(true);

      // Reset form
      setTopic('');
      setObjectives('');
      setInstructions('');
      setSelectedCurriculumId('');
      setSelectedBatchId('');
      setIsPersonalized(false);
      setSelectedStudentId('');
      setRecommendation(null);
      setManualQuestions([{
        type: 'multiple-choice',
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        modelAnswer: '',
        modelAnswerMode: 'text'
      }]);
      setUploadedFile(null);
    }
  };

  const handleAddManualQuestion = () => {
    setManualQuestions([...manualQuestions, {
      type: 'multiple-choice',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      modelAnswer: '',
      modelAnswerMode: 'text'
    }]);
  };

  const handleManualQuestionChange = (index: number, field: keyof Question | 'modelAnswerMode' | 'modelAnswerFile', value: any) => {
    const newQuestions = [...manualQuestions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setManualQuestions(newQuestions);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssessment: Assessment = {
      id: `ASM-${Date.now()}`,
      title: topic,
      subject: MOCK_CURRICULUMS.find(c => c.id === selectedCurriculumId)?.name || 'General',
      duration: manualQuestions.length * 2,
      status: 'upcoming',
      dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      difficulty,
      curriculumId: selectedCurriculumId,
      batchId: selectedBatchId,
      instructions,
      questions: manualQuestions.map((q, i) => ({
        id: `Q-${Date.now()}-${i}`,
        type: q.type || 'multiple-choice',
        text: q.text || '',
        options: q.options,
        correctAnswer: q.correctAnswer || 0,
        explanation: q.explanation || '',
        modelAnswer: q.modelAnswerMode === 'upload' ? q.modelAnswerFile : q.modelAnswer
      })) as Question[]
    };
    setPreviewAssessment(newAssessment);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsUploading(true);
      // Mock parsing delay
      setTimeout(() => {
        setIsUploading(false);
        // Mock a generated assessment from the file
        const newAssessment: Assessment = {
          id: `ASM-${Date.now()}`,
          title: `Assessment from ${file.name.split('.')[0]}`,
          subject: MOCK_CURRICULUMS.find(c => c.id === selectedCurriculumId)?.name || 'General',
          duration: 10,
          status: 'upcoming',
          dueDate: new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          difficulty: 'Medium',
          curriculumId: selectedCurriculumId,
          batchId: selectedBatchId,
          instructions: 'This assessment was automatically parsed from your uploaded document.',
          questions: [
            {
              id: `Q-${Date.now()}-1`,
              type: 'multiple-choice',
              text: 'Sample question parsed from document?',
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 0,
              explanation: 'This is a mock explanation for the parsed question.'
            }
          ]
        };
        setPreviewAssessment(newAssessment);
      }, 2000);
    }
  };

  const handleSaveGrades = () => {
    if (!selectedStudentSubmission || !selectedStudentSubmission.result) return;

    const updatedAnswers = selectedStudentSubmission.result.answers.map((answer: any, idx: number) => {
      const grading = gradingState[idx];
      if (grading) {
        return {
          ...answer,
          manualScore: grading.score,
          manualFeedback: grading.feedback,
          isManuallyGraded: true,
          isCorrect: grading.score > 0 // Simple logic for correctness
        };
      }
      return answer;
    });

    // Calculate new total score if some were manually graded
    const totalPossible = updatedAnswers.length * 100;
    const totalEarned = updatedAnswers.reduce((acc: number, curr: any) => acc + (curr.manualScore !== undefined ? curr.manualScore : (curr.isCorrect ? 100 : 0)), 0);
    const newScore = Math.round((totalEarned / totalPossible) * 100);

    const updatedResult = {
      ...selectedStudentSubmission.result,
      answers: updatedAnswers,
      score: newScore,
      isManuallyGraded: true,
      manualTotalScore: newScore
    };

    // Update the student in MOCK_STUDENTS (in a real app, this would be an API call)
    // For this demo, we'll just update the local state if we had one, but since it's mock data
    // we'll just update the selectedStudentSubmission to reflect changes in UI
    setSelectedStudentSubmission({
      ...selectedStudentSubmission,
      result: updatedResult
    });

    alert('Grades saved successfully!');
    setGradingState({});
  };

  const filteredAssessments = assessments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All Subjects' || a.subject === subjectFilter;
    const matchesDifficulty = difficultyFilter === 'All Difficulties' || a.difficulty === difficultyFilter;
    const matchesStatus = statusFilter === 'All Status' || a.status === statusFilter.toLowerCase();
    const matchesPartner = partnerFilter === 'All Partners' || a.institutionId === partnerFilter;
    const matchesBatch = batchFilter === 'All Batches' || a.batchId === batchFilter;
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus && matchesPartner && matchesBatch;
  });

  return (
    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 sm:space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Go Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Assessment Center</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">Manage institutional evaluations and AI-generated tests.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setEditingAssessment(null);
            setTopic('');
            setInstructions('');
            setSelectedCurriculumId('');
            setSelectedBatchId('');
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl teal-gradient text-white font-bold shadow-lg shadow-teal-900/10 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
        >
          <Sparkles size={18} /> Create with AI
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Assessments</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{assessments.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Completion</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">84%</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Generated</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">12</h3>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all text-sm"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {isEnaraAdmin && (
            <select 
              value={partnerFilter}
              onChange={(e) => setPartnerFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm"
            >
              <option>All Partners</option>
              {MOCK_INSTITUTIONS.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.name}</option>
              ))}
            </select>
          )}
          <select 
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm"
          >
            <option>All Subjects</option>
            {Array.from(new Set(assessments.map(a => a.subject))).map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm"
          >
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${isEnaraAdmin ? '' : 'col-span-2 sm:col-span-1'} px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm`}
          >
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
          <select 
            value={academicYearFilter}
            onChange={(e) => setAcademicYearFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm"
          >
            <option>All Years</option>
            <option>2023-2024</option>
            <option>2024-2025</option>
          </select>
          <select 
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold outline-none focus:border-teal-500 bg-white text-sm"
          >
            <option>All Batches</option>
            {MOCK_BATCHES.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assessment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAssessments.map((asm) => {
          const curriculum = MOCK_CURRICULUMS.find(c => c.id === asm.curriculumId);
          const batch = MOCK_BATCHES.find(b => b.id === asm.batchId);
          
          return (
            <div key={asm.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-lg bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider">
                      {asm.subject}
                    </span>
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      asm.difficulty === 'Hard' ? 'bg-red-50 text-red-600' : 
                      asm.difficulty === 'Medium' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {asm.difficulty}
                    </span>
                  </div>
                  <div className="relative group/menu">
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10">
                      <button 
                        onClick={() => handleEdit(asm)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedLink(`${window.location.origin}/?assessment=${asm.id}`);
                          setShowLinkModal(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Globe size={14} /> Share Link
                      </button>
                      <button 
                        onClick={() => handleDelete(asm.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{asm.title}</h3>
                
                {asm.instructions && (
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 italic">
                    "{asm.instructions}"
                  </p>
                )}

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    <span className="flex items-center gap-1"><Clock size={14} /> {asm.duration} mins</span>
                    <span className="flex items-center gap-1"><BookOpen size={14} /> {asm.questions.length} Questions</span>
                  </div>
                  
                  {curriculum && (
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-400 uppercase tracking-tighter">Curriculum:</span>
                      <span className="truncate">{curriculum.name}</span>
                    </div>
                  )}
                  
                  {batch && (
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-400 uppercase tracking-tighter">Assigned To:</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-semibold">{batch.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Completion Rate</span>
                    <span>{asm.id === 'ASM001' ? '72%' : '0%'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600" style={{ width: asm.id === 'ASM001' ? '72%' : '0%' }}></div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 font-medium">Due: {asm.dueDate}</span>
                  <button 
                    onClick={() => {
                      setSelectedLink(`${window.location.origin}/?assessment=${asm.id}`);
                      setShowLinkModal(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-bold text-xs flex items-center gap-1"
                    title="Generate Shareable Link"
                  >
                    <Globe size={14} /> Share
                  </button>
                </div>
                <button 
                  onClick={() => setResultsAssessment(asm)}
                  className="text-teal-700 font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Results <ChevronRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Empty State */}
        {filteredAssessments.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No assessments found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

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
                  <h2 className="text-xl font-bold text-slate-900">Assessment Access Link</h2>
                </div>
                <button 
                  onClick={() => setShowLinkModal(false)} 
                  className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-slate-500 text-sm mb-6">
                Share this unique link with your students. They will be taken directly to the assessment interface after logging in.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 group relative">
                <div className="flex items-center justify-between gap-4">
                  <code className="text-sm text-indigo-600 font-mono break-all select-all">
                    {selectedLink}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(selectedLink)}
                    className="shrink-0 p-3 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 rounded-xl transition-all shadow-sm"
                    title="Copy to Clipboard"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {copySuccess && (
                  <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-emerald-600 animate-slide-in">
                    {copySuccess}
                  </p>
                )}
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
                  Open Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isGenerating && setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-slide-in flex flex-col h-full sm:h-auto sm:max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Create New Assessment</h2>
                  <p className="text-[10px] sm:text-xs text-slate-500">Choose your preferred creation method.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isGenerating || isUploading}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <X size={20} />
              </button>
            </div>

            {/* Creation Tabs */}
            <div className="flex border-b border-slate-100 px-6 sm:px-8 bg-slate-50/50">
              <button 
                onClick={() => setCreationMode('ai')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${creationMode === 'ai' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} /> AI Generator
                </div>
              </button>
              <button 
                onClick={() => setCreationMode('manual')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${creationMode === 'manual' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Edit size={14} /> Manual Entry
                </div>
              </button>
              <button 
                onClick={() => setCreationMode('upload')}
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${creationMode === 'upload' ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Plus size={14} /> Upload File
                </div>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {creationMode === 'ai' && (
                <form onSubmit={editingAssessment ? handleUpdateAssessment : handleCreateWithAI} className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Assessment Topic</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Advanced Trigonometry, Civil War History..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all text-sm"
                    />
                  </div>

                  {!editingAssessment && (
                    <div className="p-4 bg-slate-50 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">Personalized Assessment</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPersonalized(!isPersonalized)}
                          className={`w-12 h-6 rounded-full transition-all relative ${isPersonalized ? 'bg-teal-600' : 'bg-slate-300'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPersonalized ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                      
                      {isPersonalized && (
                        <div className="animate-slide-in">
                          <p className="text-[10px] text-teal-600 mt-2 flex items-center gap-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
                            <Sparkles size={10} /> AI will analyze collective mistakes and tutor logs from all students in the selected batch to create an adaptive assessment.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {!editingAssessment && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Smart Recommendations</label>
                        <button 
                          type="button"
                          onClick={handleGetRecommendations}
                          disabled={isRecommending || !selectedBatchId}
                          className="text-[10px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 disabled:opacity-30"
                        >
                          {isRecommending ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                          Get AI Recommendations
                        </button>
                      </div>

                      {recommendation && (
                        <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl space-y-3 animate-slide-in">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-teal-900">AI Recommendation</h4>
                            <button 
                              type="button"
                              onClick={applyRecommendation}
                              className="text-[10px] font-bold bg-teal-600 text-white px-2 py-1 rounded-lg hover:bg-teal-700 transition-all"
                            >
                              Apply
                            </button>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed italic">"{recommendation.reasoning}"</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white border border-teal-100 rounded-lg text-[10px] font-bold text-teal-700">
                              Topic: {recommendation.suggestedTopic}
                            </span>
                            <span className="px-2 py-1 bg-white border border-teal-100 rounded-lg text-[10px] font-bold text-teal-700">
                              Difficulty: {recommendation.suggestedDifficulty}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Focus Areas</p>
                            <div className="flex flex-wrap gap-1">
                              {recommendation.focusAreas.map((area, i) => (
                                <span key={i} className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">{area}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Curriculum</label>
                      <select 
                        required
                        value={selectedCurriculumId}
                        onChange={(e) => setSelectedCurriculumId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Curriculum</option>
                        {MOCK_CURRICULUMS.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Assign to Batch</label>
                      <select 
                        required
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Batch</option>
                        {MOCK_BATCHES.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty</label>
                      <select 
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Questions</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="20"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</label>
                      <input 
                        type="date" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  {!editingAssessment && (
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Learning Objectives (Optional)</label>
                      <textarea 
                        placeholder="e.g., Focus on sine and cosine rules, include one word problem..."
                        value={objectives}
                        onChange={(e) => setObjectives(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all h-24 resize-none text-sm"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Instructions for Students (Optional)</label>
                    <textarea 
                      placeholder="e.g., Please ensure you have a calculator ready. You have 30 minutes to complete this test."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all h-24 resize-none text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isGenerating}
                    className="w-full py-4 teal-gradient text-white rounded-2xl font-bold shadow-lg shadow-teal-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 text-sm sm:text-base"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        {editingAssessment ? <CheckCircle2 size={20} /> : <Sparkles size={20} />}
                        {editingAssessment ? 'Update Assessment' : 'Preview Assessment'}
                      </>
                    )}
                  </button>
                </form>
              )}

              {creationMode === 'manual' && (
                <form onSubmit={handleManualSubmit} className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Assessment Title</label>
                    <input 
                      type="text" 
                      required
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g., Mid-term Exam"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Curriculum</label>
                      <select 
                        required
                        value={selectedCurriculumId}
                        onChange={(e) => setSelectedCurriculumId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Curriculum</option>
                        {MOCK_CURRICULUMS.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Assign to Batch</label>
                      <select 
                        required
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Batch</option>
                        {MOCK_BATCHES.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Questions</h3>
                      <button 
                        type="button"
                        onClick={handleAddManualQuestion}
                        className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Question
                      </button>
                    </div>

                    {manualQuestions.map((q, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                          <select 
                            value={q.type}
                            onChange={(e) => handleManualQuestionChange(idx, 'type', e.target.value)}
                            className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1"
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="short-answer">Short Answer</option>
                          </select>
                        </div>
                        <input 
                          type="text"
                          required
                          value={q.text}
                          onChange={(e) => handleManualQuestionChange(idx, 'text', e.target.value)}
                          placeholder="Enter question text..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                        />
                        {q.type === 'multiple-choice' && q.options && (
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className="flex items-center gap-2">
                                <input 
                                  type="radio"
                                  name={`correct-${idx}`}
                                  checked={q.correctAnswer === oIdx}
                                  onChange={() => handleManualQuestionChange(idx, 'correctAnswer', oIdx)}
                                />
                                <input 
                                  type="text"
                                  required
                                  value={opt}
                                  onChange={(e) => {
                                    const newOpts = [...q.options!];
                                    newOpts[oIdx] = e.target.value;
                                    handleManualQuestionChange(idx, 'options', newOpts);
                                  }}
                                  placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                                  className="w-full px-2 py-1 rounded border border-slate-200 text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === 'short-answer' && (
                          <input 
                            type="text"
                            required
                            value={q.correctAnswer as string}
                            onChange={(e) => handleManualQuestionChange(idx, 'correctAnswer', e.target.value)}
                            placeholder="Correct Answer..."
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                          />
                        )}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Model Answer</label>
                            <div className="flex bg-slate-100 p-0.5 rounded-lg">
                              <button 
                                type="button"
                                onClick={() => handleManualQuestionChange(idx, 'modelAnswerMode', 'text')}
                                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${q.modelAnswerMode === 'text' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400'}`}
                              >
                                Text
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleManualQuestionChange(idx, 'modelAnswerMode', 'upload')}
                                className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${q.modelAnswerMode === 'upload' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-400'}`}
                              >
                                Upload
                              </button>
                            </div>
                          </div>
                          
                          {q.modelAnswerMode === 'text' ? (
                            <textarea 
                              value={q.modelAnswer}
                              onChange={(e) => handleManualQuestionChange(idx, 'modelAnswer', e.target.value)}
                              placeholder="Enter the model answer here..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs h-20 resize-none"
                            />
                          ) : (
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-teal-500 hover:bg-teal-50/10 transition-all cursor-pointer">
                              <input 
                                type="file"
                                accept=".pdf,.docx,.png,.jpg"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleManualQuestionChange(idx, 'modelAnswerFile', file.name);
                                  }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                              {q.modelAnswerFile ? (
                                <div className="flex items-center justify-center gap-2 text-teal-600 font-bold text-xs">
                                  <CheckCircle2 size={14} /> {q.modelAnswerFile}
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1">
                                  <Upload size={16} className="text-slate-400" />
                                  <span className="text-[10px] text-slate-500 font-medium">Click to upload model answer</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <textarea 
                          value={q.explanation}
                          onChange={(e) => handleManualQuestionChange(idx, 'explanation', e.target.value)}
                          placeholder="AI Explanation / Feedback (Optional)..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs h-16 resize-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Instructions for Students (Optional)</label>
                    <textarea 
                      placeholder="e.g., Please ensure you have a calculator ready. You have 30 minutes to complete this test."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all h-24 resize-none text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
                  >
                    Preview Assessment
                  </button>
                </form>
              )}

              {creationMode === 'upload' && (
                <div className="p-6 sm:p-8 space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Curriculum & Batch</label>
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        required
                        value={selectedCurriculumId}
                        onChange={(e) => setSelectedCurriculumId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Curriculum</option>
                        {MOCK_CURRICULUMS.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <select 
                        required
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all bg-white text-sm"
                      >
                        <option value="">Select Batch</option>
                        {MOCK_BATCHES.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Instructions for Students (Optional)</label>
                    <textarea 
                      placeholder="e.g., Please ensure you have a calculator ready. You have 30 minutes to complete this test."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none transition-all h-24 resize-none text-sm"
                    />
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center space-y-4 hover:border-teal-500 hover:bg-teal-50/10 transition-all cursor-pointer relative">
                    <input 
                      type="file" 
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Upload Assessment Document</h3>
                    <p className="text-sm text-slate-500">Support for PDF and DOCX files. AI will parse questions and model answers.</p>
                    {uploadedFile && (
                      <div className="mt-4 p-3 bg-teal-50 text-teal-700 rounded-xl font-bold text-sm inline-flex items-center gap-2">
                        <CheckCircle2 size={16} /> {uploadedFile.name}
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <Loader2 size={32} className="animate-spin text-teal-600" />
                      <p className="text-sm font-bold text-slate-600">AI is parsing your document...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewAssessment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isGenerating && setPreviewAssessment(null)}></div>
          <div className="relative bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden animate-slide-in flex flex-col h-full sm:h-auto sm:max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Preview Assessment</h2>
                  <p className="text-[10px] sm:text-xs text-slate-500">Review generated questions before deployment.</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewAssessment(null)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Title</p>
                  <p className="text-sm font-bold text-slate-900">{previewAssessment.title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Subject</p>
                  <p className="text-sm font-bold text-slate-900">{previewAssessment.subject}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Difficulty</p>
                  <p className="text-sm font-bold text-slate-900">{previewAssessment.difficulty}</p>
                </div>
              </div>

              <div className="space-y-6">
                {previewAssessment.questions.map((q, idx) => (
                  <div key={q.id} className="p-5 sm:p-6 border border-slate-100 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <p className="font-bold text-slate-800 text-sm sm:text-base">{q.text}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase shrink-0">
                        {q.type.replace('-', ' ')}
                      </span>
                    </div>

                    {q.type !== 'short-answer' && q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-9">
                        {q.options.map((opt, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`p-3 rounded-xl border text-sm ${
                              oIdx === q.correctAnswer 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium' 
                                : 'bg-white border-slate-100 text-slate-600'
                            }`}
                          >
                            <span className="mr-2 opacity-50">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === 'short-answer' && (
                      <div className="pl-0 sm:pl-9">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-medium">
                          <span className="text-[10px] text-emerald-600 uppercase block mb-1 font-bold">Correct Answer</span>
                          {q.correctAnswer}
                        </div>
                      </div>
                    )}

                    {q.modelAnswer && (
                      <div className="pl-0 sm:pl-9 p-3 bg-teal-50 border border-teal-100 rounded-xl text-xs text-teal-700">
                        <span className="font-bold text-teal-900 mr-1">Model Answer:</span>
                        {q.modelAnswer}
                      </div>
                    )}

                    <div className="pl-0 sm:pl-9 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 italic">
                      <span className="font-bold text-slate-700 not-italic mr-1">Explanation:</span>
                      {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 shrink-0">
              <button 
                onClick={(e) => {
                  setPreviewAssessment(null);
                  handleCreateWithAI(e as any);
                }}
                disabled={isGenerating}
                className="flex-1 py-4 border border-slate-200 bg-white text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <ChevronLeft size={18} />}
                Back & Regenerate
              </button>
              <button 
                onClick={handleDeploy}
                className="flex-[2] py-4 teal-gradient text-white rounded-2xl font-bold shadow-lg shadow-teal-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <CheckCircle2 size={20} /> Deploy Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {resultsAssessment && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setResultsAssessment(null)}></div>
          <div className="relative bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-slide-in flex flex-col h-full sm:h-auto sm:max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Assessment Results</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] sm:text-xs text-slate-500">{resultsAssessment.title} • {resultsAssessment.subject}</p>
                    <button 
                      onClick={() => {
                        setSelectedLink(`${window.location.origin}/?assessment=${resultsAssessment.id}`);
                        setShowLinkModal(true);
                      }}
                      className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <Globe size={12} /> Share Link
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setResultsAssessment(null)}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Students</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">
                    {MOCK_BATCHES.find(b => b.id === resultsAssessment.batchId)?.studentCount || 0}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Submitted</p>
                  <p className="text-lg sm:text-xl font-bold text-teal-600">
                    {resultsAssessment.id === 'ASM001' ? '32' : '0'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Average Score</p>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">
                    {resultsAssessment.id === 'ASM001' ? '84%' : '-'}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                  <p className="text-lg sm:text-xl font-bold text-amber-600">Active</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Student Performance</h4>
                <div className="border border-slate-100 rounded-2xl overflow-hidden overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Student</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Batch / Class</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Score</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_STUDENTS.filter(s => !resultsAssessment.batchId || s.batchId === resultsAssessment.batchId || s.id === 'STU001').map(student => {
                        const result = student.pastResults?.find(r => r.assessmentId === resultsAssessment.id) || (resultsAssessment.id === 'ASM001' ? student.pastResults?.[0] : null);
                        const isSubmitted = !!result;
                        const isManuallyGraded = result?.isManuallyGraded;
                        const score = result?.score;
                        const studentBatch = MOCK_BATCHES.find(b => b.id === student.batchId);

                        return (
                          <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                                  {student.avatar}
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                                  <p className="text-[10px] text-slate-500 truncate">{student.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{studentBatch?.name || 'Unassigned'}</span>
                                <span className="text-[9px] text-slate-400 uppercase font-bold">{studentBatch?.academicYear || 'N/A'}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold w-fit ${
                                  isSubmitted 
                                    ? 'bg-emerald-50 text-emerald-600' 
                                    : 'bg-slate-100 text-slate-400'
                                }`}>
                                  {isSubmitted ? 'SUBMITTED' : 'PENDING'}
                                </span>
                                {isManuallyGraded && (
                                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-bold w-fit">
                                    MANUALLY GRADED
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm font-bold text-slate-900">
                                {isSubmitted ? `${score}%` : '-'}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => {
                                  setSelectedStudentSubmission({ student, result });
                                }}
                                className="text-teal-600 text-xs font-bold hover:underline disabled:opacity-30"
                                disabled={!isSubmitted}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end shrink-0">
              <button 
                onClick={() => setResultsAssessment(null)}
                className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Submission Detail Modal */}
      {selectedStudentSubmission && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStudentSubmission(null)}></div>
          <div className="relative bg-white rounded-none sm:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden animate-slide-in flex flex-col h-full sm:h-auto sm:max-h-[90vh]">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedStudentSubmission(null)}
                  className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all"
                  title="Back to Results"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold shrink-0">
                  {selectedStudentSubmission.student.avatar}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{selectedStudentSubmission.student.name}'s Submission</h2>
                  <p className="text-[10px] sm:text-xs text-slate-500 truncate">{selectedStudentSubmission.result?.assessmentTitle || 'Assessment Details'}</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedStudentSubmission(null);
                  setResultsAssessment(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600"
                title="Close All"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 p-6 bg-slate-50 rounded-2xl gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Final Score</p>
                  <p className="text-3xl sm:text-4xl font-black text-teal-600">{selectedStudentSubmission.result?.score || 0}%</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Submission Date</p>
                  <p className="font-bold text-slate-700 text-sm sm:text-base">{selectedStudentSubmission.result?.date || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Detailed Review</h4>
                {selectedStudentSubmission.result?.answers?.map((answer: any, idx: number) => (
                  <div key={idx} className={`p-5 sm:p-6 rounded-2xl border-2 ${answer.isCorrect ? 'border-emerald-100' : 'border-red-100'} space-y-4`}>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${answer.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                          {idx + 1}
                        </span>
                        <p className="font-bold text-slate-800 text-sm sm:text-base">{answer.questionText}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${answer.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {answer.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="pl-0 sm:pl-9 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Student Answer</p>
                          <p className={`text-sm font-bold ${answer.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                            {answer.studentAnswer}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Correct Answer</p>
                          <p className="text-sm font-bold text-emerald-700">
                            {answer.correctAnswer}
                          </p>
                        </div>
                      </div>

                      {/* Manual Grading Section */}
                      <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold text-indigo-600 uppercase flex items-center gap-1">
                            <Edit size={10} /> Manual Grading & Feedback
                          </p>
                          {answer.isManuallyGraded && (
                            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded">
                              Manually Graded
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-32">
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Score (0-100)</label>
                            <input 
                              type="number"
                              min="0"
                              max="100"
                              value={gradingState[idx]?.score ?? (answer.manualScore !== undefined ? answer.manualScore : (answer.isCorrect ? 100 : 0))}
                              onChange={(e) => setGradingState({
                                ...gradingState,
                                [idx]: { 
                                  score: parseInt(e.target.value) || 0, 
                                  feedback: gradingState[idx]?.feedback ?? (answer.manualFeedback || '') 
                                }
                              })}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 outline-none"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Feedback to Student</label>
                            <textarea 
                              value={gradingState[idx]?.feedback ?? (answer.manualFeedback || '')}
                              onChange={(e) => setGradingState({
                                ...gradingState,
                                [idx]: { 
                                  score: gradingState[idx]?.score ?? (answer.manualScore !== undefined ? answer.manualScore : (answer.isCorrect ? 100 : 0)), 
                                  feedback: e.target.value 
                                }
                              })}
                              placeholder="Provide specific feedback on this answer..."
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm h-20 resize-none focus:border-indigo-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl">
                        <p className="text-[10px] font-bold text-teal-600 uppercase mb-2 flex items-center gap-1">
                          <Sparkles size={10} /> AI Model Answer & Feedback
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {answer.modelAnswer || answer.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <div className="text-xs text-slate-500 italic">
                {Object.keys(gradingState).length > 0 && (
                  <span className="text-indigo-600 font-bold flex items-center gap-1">
                    <Sparkles size={12} /> You have unsaved grading changes
                  </span>
                )}
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                {Object.keys(gradingState).length > 0 && (
                  <button 
                    onClick={handleSaveGrades}
                    className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-900/10 hover:bg-indigo-700 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} /> Save Grades
                  </button>
                )}
                <button 
                  onClick={() => setSelectedStudentSubmission(null)}
                  className="flex-1 sm:flex-none px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base"
                >
                  Close Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
