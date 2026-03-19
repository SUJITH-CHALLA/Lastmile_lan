import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, PenLine, Paperclip, FileText, Bot, Sparkles, Check, Upload, Copy, CheckCircle2 } from "lucide-react"

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Helper Component for Fields - MOVED OUTSIDE to prevent re-render focus loss
const FieldItem = ({
    label,
    value,
    isPill = false,
    isAllEditable,
    isCurrentlyEditing,
    onStartEdit,
    onStopEdit,
    onChange
}: {
    label: string,
    value: string,
    isPill?: boolean,
    isAllEditable: boolean,
    isCurrentlyEditing: boolean,
    onStartEdit: () => void,
    onStopEdit: () => void,
    onChange: (val: string) => void
}) => {
    return (
        <div
            className={`relative group p-3 rounded-xl border transition-all ${isCurrentlyEditing ? 'border-lm-yellow bg-[#FFFEF5]' : 'border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200'}`}
        >
            <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</label>
                {!isAllEditable && (
                    <button
                        onClick={() => onStartEdit()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-lm-black rounded-md"
                    >
                        <PenLine className="w-3 h-3" />
                    </button>
                )}
            </div>

            {isCurrentlyEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => !isAllEditable && onStopEdit()}
                    className="w-full bg-white border border-lm-yellow rounded-md px-2 py-1 text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-lm-black"
                    autoFocus={!isAllEditable}
                />
            ) : (
                <div
                    className="text-[13px] font-bold text-gray-900 mt-0.5 min-h-[20px] cursor-text"
                    onClick={() => onStartEdit()}
                >
                    {isPill ? (
                        <span className="inline-flex px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[11px]">{value}</span>
                    ) : (
                        value
                    )}
                </div>
            )}
        </div>
    );
};

export function AutoFillPreviewModal({ isOpen, onClose }: PreviewModalProps) {
    // States
    const [isAllEditable, setIsAllEditable] = useState(false);
    const [editingField, setEditingField] = useState<string | null>(null);
    const [isDonePlaying, setIsDonePlaying] = useState(false);
    const [copiedCover, setCopiedCover] = useState(false);
    const [viewingDoc, setViewingDoc] = useState<'none' | 'resume' | 'coverLetter'>('none');

    // Resume upload state
    const [resumeFileName, setResumeFileName] = useState("Alex_Rivera_Resume_2026.pdf");
    const [resumeFileSize, setResumeFileSize] = useState("128 KB");
    const [resumeReplaced, setResumeReplaced] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // This would come from the scraped form — determines what the portal accepts
    const [portalCoverLetterType] = useState<'pdf' | 'text'>('text');

    // Mock Form Data
    const [formData, setFormData] = useState({
        personal: {
            fullName: "Alex Rivera",
            email: "alex.rivera@example.com",
            phone: "+1 (555) 019-2834",
            linkedin: "linkedin.com/in/arivera",
            portfolio: "alexrivera.dev"
        },
        role: {
            jobTitle: "Senior Frontend Engineer",
            experience: "6 Years",
            expectedSalary: "$120,000 - $140,000",
            startDate: "Immediate",
            workType: "Remote"
        },
        skills: {
            tags: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
            whyRole: "I have spent the last 4 years architecting scalable React applications and am deeply passionate about building accessible, component-driven design systems exactly like the one described in your job posting."
        },
        availability: {
            noticePeriod: "2 Weeks",
            relocate: "No"
        }
    });

    const coverLetterText = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.role.jobTitle} position at your company. With ${formData.role.experience} of experience building high-performance web applications, I bring a deep understanding of modern component architecture and user-centric design.

In my previous role, I spearheaded the migration of a legacy dashboard to a responsive, accessible React framework, improving load times by over 45%. I am particularly drawn to your team's commitment to scalability and believe my technical background aligns perfectly with your upcoming roadmap.

Thank you for reviewing my application. I look forward to the possibility of contributing to your engineering goals.

Sincerely,
${formData.personal.fullName}`;

    // Reset state when modal is toggled
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsAllEditable(false);
                setEditingField(null);
                setIsDonePlaying(false);
                setCopiedCover(false);
                setViewingDoc('none');
                setResumeFileName("Alex_Rivera_Resume_2026.pdf");
                setResumeFileSize("128 KB");
                setResumeReplaced(false);
            }, 300);
        }
    }, [isOpen]);

    // Handlers
    const handleDone = () => {
        setIsDonePlaying(true);
        setTimeout(() => {
            onClose();
        }, 1200);
    };

    const handleResumeReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFileName(file.name);
            const sizeKB = Math.round(file.size / 1024);
            setResumeFileSize(sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`);
            setResumeReplaced(true);
            setTimeout(() => setResumeReplaced(false), 2500);
        }
        // Reset input so the same file can be re-selected
        e.target.value = '';
    };

    const handleCopyCoverLetter = () => {
        navigator.clipboard.writeText(coverLetterText);
        setCopiedCover(true);
        setTimeout(() => setCopiedCover(false), 2000);
    };

    const handleFieldChange = (section: keyof typeof formData, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Removed in-component FieldItem definition to prevent focus loss

    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-white/40 backdrop-blur-sm sm:p-6 font-sans">
            <AnimatePresence>
                {isDonePlaying && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8 }}
                        className="absolute z-[110] flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-lm-black rounded-full p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                            <Check className="w-24 h-24 text-lm-yellow" strokeWidth={3} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: isDonePlaying ? 0 : 1, scale: isDonePlaying ? 0.9 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[680px] max-h-[85vh] h-full flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-lm-black rounded-xl flex items-center justify-center shadow-md">
                            <Bot className="w-5 h-5 text-lm-yellow" />
                        </div>
                        <div>
                            <h2 className="text-[16px] font-black text-gray-900 tracking-tight">Application Preview</h2>
                            <p className="text-[12px] text-gray-500 font-medium">Here&apos;s what our AI filled for you — review before submitting</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-900">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-[6px] relative shrink-0">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-lm-yellow relative"
                    >
                        <div className="absolute right-2 -top-[22px] text-[10px] font-black text-lm-black">FORM COMPLETION: 92%</div>
                    </motion.div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden relative bg-white">
                    {/* Main Scrollable Content */}
                    <div className="absolute inset-0 overflow-y-auto px-6 py-6 slim-scroll">

                        {/* Section 1 - Personal Info */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Personal Info</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FieldItem
                                    label="Full Name" value={formData.personal.fullName}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'fullName'}
                                    onStartEdit={() => setEditingField('fullName')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('personal', 'fullName', val)}
                                />
                                <FieldItem
                                    label="Email" value={formData.personal.email}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'email'}
                                    onStartEdit={() => setEditingField('email')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('personal', 'email', val)}
                                />
                                <FieldItem
                                    label="Phone Number" value={formData.personal.phone}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'phone'}
                                    onStartEdit={() => setEditingField('phone')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('personal', 'phone', val)}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                <FieldItem
                                    label="LinkedIn URL" value={formData.personal.linkedin}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'linkedin'}
                                    onStartEdit={() => setEditingField('linkedin')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('personal', 'linkedin', val)}
                                />
                                <FieldItem
                                    label="Portfolio URL" value={formData.personal.portfolio}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'portfolio'}
                                    onStartEdit={() => setEditingField('portfolio')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('personal', 'portfolio', val)}
                                />
                            </div>
                        </div>

                        {/* Section 2 - Role Details */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Role Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FieldItem
                                    label="Job Title Applying For" value={formData.role.jobTitle}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'jobTitle'}
                                    onStartEdit={() => setEditingField('jobTitle')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('role', 'jobTitle', val)}
                                />
                                <FieldItem
                                    label="Years of Experience" value={formData.role.experience}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'experience'}
                                    onStartEdit={() => setEditingField('experience')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('role', 'experience', val)}
                                />
                                <FieldItem
                                    label="Expected Salary" value={formData.role.expectedSalary}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'expectedSalary'}
                                    onStartEdit={() => setEditingField('expectedSalary')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('role', 'expectedSalary', val)}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                <FieldItem
                                    label="Start Date" value={formData.role.startDate}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'startDate'}
                                    onStartEdit={() => setEditingField('startDate')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('role', 'startDate', val)}
                                />
                                <div className="sm:col-span-1">
                                    <FieldItem
                                        label="Work Type" value={formData.role.workType} isPill={true}
                                        isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'workType'}
                                        onStartEdit={() => setEditingField('workType')} onStopEdit={() => setEditingField(null)}
                                        onChange={(val) => handleFieldChange('role', 'workType', val)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3 - Skills & Experience */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Skills & Experience</h3>

                            <div
                                className={`group p-4 rounded-xl border mb-3 transition-colors relative ${isAllEditable || editingField === 'skillsTags' ? 'border-lm-yellow bg-[#FFFEF5]' : 'border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200'}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Top Skills Matched</label>
                                    {!isAllEditable && (
                                        <button
                                            onClick={() => setEditingField('skillsTags')}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-lm-black rounded-md"
                                        >
                                            <PenLine className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>

                                {isAllEditable || editingField === 'skillsTags' ? (
                                    <input
                                        type="text"
                                        value={formData.skills.tags.join(', ')}
                                        onChange={(e) => {
                                            const newTags = e.target.value.split(',').map(s => s.trimStart());
                                            setFormData(prev => ({
                                                ...prev,
                                                skills: { ...prev.skills, tags: newTags }
                                            }));
                                        }}
                                        className="w-full bg-white border border-lm-yellow rounded-md px-3 py-2 text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-lm-black"
                                        autoFocus={!isAllEditable}
                                        onBlur={() => !isAllEditable && setEditingField(null)}
                                        placeholder="Type skills separated by commas..."
                                    />
                                ) : (
                                    <div
                                        className="flex flex-wrap gap-2 cursor-text min-h-[30px]"
                                        onClick={() => setEditingField('skillsTags')}
                                    >
                                        {formData.skills.tags.filter(t => t).map((tag, i) => (
                                            <div key={i} className="px-2.5 py-1 bg-white border border-gray-200 rounded-md text-[12px] font-bold text-gray-700 shadow-sm">{tag}</div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className={`p-4 rounded-xl border transition-colors ${isAllEditable ? 'border-lm-yellow bg-[#FFFEF5]' : 'border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Why this role? (AI Generated)</label>
                                    <Sparkles className="w-3.5 h-3.5 text-lm-yellow" />
                                </div>
                                {isAllEditable ? (
                                    <textarea
                                        className="w-full bg-white border border-lm-yellow rounded-md p-2 text-[13px] font-semibold text-gray-900 focus:outline-none focus:border-lm-black resize-none h-20"
                                        value={formData.skills.whyRole}
                                        onChange={(e) => handleFieldChange('skills', 'whyRole', e.target.value)}
                                    />
                                ) : (
                                    <p className="text-[13px] font-semibold text-gray-800 leading-relaxed">
                                        &ldquo;{formData.skills.whyRole}&rdquo;
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Section 4 - Availability */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Availability</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <FieldItem
                                    label="Notice Period" value={formData.availability.noticePeriod}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'noticePeriod'}
                                    onStartEdit={() => setEditingField('noticePeriod')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('availability', 'noticePeriod', val)}
                                />
                                <FieldItem
                                    label="Willing to Relocate" value={formData.availability.relocate} isPill={true}
                                    isAllEditable={isAllEditable} isCurrentlyEditing={isAllEditable || editingField === 'relocate'}
                                    onStartEdit={() => setEditingField('relocate')} onStopEdit={() => setEditingField(null)}
                                    onChange={(val) => handleFieldChange('availability', 'relocate', val)}
                                />
                            </div>
                        </div>

                        {/* Section 5 - Resume (Clickable PDF card → opens popup) */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Resume</h3>
                            <div className="p-4 rounded-xl border border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200 transition-colors">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attached Resume (PDF)</label>
                                </div>
                                <div
                                    onClick={() => setViewingDoc('resume')}
                                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-gray-300 hover:shadow-md transition-all group"
                                >
                                    <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-lm-black" strokeWidth={2} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-lm-black transition-colors">{resumeFileName}</p>
                                        <p className="text-[11px] text-gray-400 font-medium">{resumeFileSize} • Click to preview</p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeReplace}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                                        className={`px-3 py-1.5 border rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 ${resumeReplaced ? 'bg-[#E8F8EE] border-[#0A7B3E] text-[#0A7B3E]' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'}`}
                                    >
                                        {resumeReplaced ? <CheckCircle2 className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
                                        {resumeReplaced ? 'Replaced!' : 'Replace'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section 6 - Cover Letter (Determined by portal type) */}
                        <div className="mb-6">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-4">Cover Letter</h3>

                            {portalCoverLetterType === 'pdf' ? (
                                <div className="p-4 rounded-xl border border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200 transition-colors">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Attached Cover Letter (PDF)</label>
                                        <span className="px-2 py-0.5 bg-gray-100 text-lm-black border border-gray-200 rounded-full text-[9px] font-bold uppercase">Portal: PDF Upload</span>
                                    </div>
                                    <div
                                        onClick={() => setViewingDoc('coverLetter')}
                                        className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:border-gray-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-lm-black" strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[13px] font-bold text-gray-900 truncate group-hover:text-lm-black transition-colors">Alex_Rivera_CoverLetter.pdf</p>
                                            <p className="text-[11px] text-gray-400 font-medium">42 KB • Click to preview</p>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); }}
                                            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-[11px] font-bold text-gray-600 transition-colors flex items-center gap-1.5 shrink-0"
                                        >
                                            <Upload className="w-3 h-3" /> Replace
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={`p-4 rounded-xl border transition-colors ${isAllEditable ? 'border-lm-yellow bg-[#FFFEF5]' : 'border-transparent bg-[#F8F9FA] hover:bg-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cover Letter (Text Input)</label>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-[#FFF9DB] text-lm-black border border-lm-yellow rounded-full text-[9px] font-bold uppercase">Portal: Text Box</span>
                                            <button
                                                onClick={handleCopyCoverLetter}
                                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold border transition-all flex items-center gap-1.5 ${copiedCover ? 'bg-[#FFF9DB] border-lm-yellow text-lm-black' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                            >
                                                {copiedCover ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                {copiedCover ? 'Copied!' : 'Copy All'}
                                            </button>
                                        </div>
                                    </div>
                                    {isAllEditable ? (
                                        <textarea
                                            className="w-full bg-white border border-lm-yellow rounded-md p-3 text-[12px] font-medium text-gray-800 focus:outline-none focus:border-lm-black resize-none h-[180px] leading-relaxed"
                                            defaultValue={coverLetterText}
                                        />
                                    ) : (
                                        <div
                                            onClick={() => setViewingDoc('coverLetter')}
                                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-h-[120px] overflow-hidden relative cursor-pointer hover:border-gray-300 hover:shadow-md transition-all group"
                                        >
                                            <p className="text-[12px] text-gray-700 leading-relaxed whitespace-pre-line line-clamp-4">{coverLetterText}</p>
                                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-lm-black opacity-0 group-hover:opacity-100 transition-opacity">Click to read full letter</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* ===== CHILD POPUP: Resume Preview (2 pages, scrollable, compact) ===== */}
                    <AnimatePresence mode="wait">
                        {viewingDoc === 'resume' && (
                            <motion.div
                                key="resume-popup"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto slim-scroll"
                            >
                                <div className="max-w-[460px] mx-auto bg-white border border-gray-200 rounded-xl shadow-lg mt-1 mb-6 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-[#F8F9FA]">
                                        <h4 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-lm-black" /> {resumeFileName}
                                        </h4>
                                        <button onClick={() => setViewingDoc('none')} className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* PAGE 1 */}
                                    <div className="p-6 font-serif border-b-2 border-dashed border-gray-200">
                                        <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-3">Page 1 of 2</div>
                                        <div className="text-center mb-4">
                                            <h1 className="text-xl font-bold text-gray-900 mb-0.5">{formData.personal.fullName}</h1>
                                            <p className="text-[10px] text-gray-500">{formData.personal.email} • {formData.personal.phone}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{formData.personal.linkedin} • {formData.personal.portfolio}</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Professional Summary</h3>
                                            <p className="text-[11px] text-gray-700 leading-relaxed">Versatile and results-driven frontend engineer with 6+ years of experience building high-performance web applications. Proven ability to architect scalable React-based design systems and lead cross-functional teams in agile environments. Passionate about accessibility, performance optimization, and developer experience.</p>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Experience</h3>
                                            <div className="mb-3">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-[12px] font-bold text-gray-900">Lead Frontend Developer</h4>
                                                    <span className="text-[10px] text-gray-500 shrink-0">2021 - Present</span>
                                                </div>
                                                <p className="text-[11px] text-gray-600 font-medium mb-1">Tech Solutions Inc. • San Francisco, CA</p>
                                                <ul className="list-disc list-inside text-[11px] text-gray-700 gap-0.5 flex flex-col pl-1">
                                                    <li>Architected the core component library, reducing development time by 40%.</li>
                                                    <li>Led a team of 4 junior developers across multiple product pipelines.</li>
                                                    <li>Implemented CI/CD pipelines reducing deployment time from 45 to 8 minutes.</li>
                                                </ul>
                                            </div>
                                            <div className="mb-3">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-[12px] font-bold text-gray-900">Frontend Engineer</h4>
                                                    <span className="text-[10px] text-gray-500 shrink-0">2019 - 2021</span>
                                                </div>
                                                <p className="text-[11px] text-gray-600 font-medium mb-1">DataViz Corp. • Austin, TX</p>
                                                <ul className="list-disc list-inside text-[11px] text-gray-700 gap-0.5 flex flex-col pl-1">
                                                    <li>Built interactive data visualization dashboards used by 15,000+ monthly users.</li>
                                                    <li>Reduced bundle size by 35% through code splitting and tree shaking strategies.</li>
                                                    <li>Integrated real-time WebSocket data feeds into the charting pipeline.</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-[12px] font-bold text-gray-900">Junior Developer</h4>
                                                    <span className="text-[10px] text-gray-500 shrink-0">2017 - 2019</span>
                                                </div>
                                                <p className="text-[11px] text-gray-600 font-medium mb-1">Starter Labs • Remote</p>
                                                <ul className="list-disc list-inside text-[11px] text-gray-700 gap-0.5 flex flex-col pl-1">
                                                    <li>Developed responsive landing pages and marketing sites for 12+ clients.</li>
                                                    <li>Introduced automated unit testing, increasing code coverage to 85%.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PAGE 2 */}
                                    <div className="p-6 font-serif">
                                        <div className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-3">Page 2 of 2</div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Education</h3>
                                            <div className="mb-2">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-[12px] font-bold text-gray-900">B.S. Computer Science</h4>
                                                    <span className="text-[10px] text-gray-500 shrink-0">2013 - 2017</span>
                                                </div>
                                                <p className="text-[11px] text-gray-600 font-medium">University of Texas at Austin</p>
                                                <p className="text-[10px] text-gray-500 mt-0.5">GPA: 3.7/4.0 • Dean&apos;s List 6 Semesters</p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Technical Skills</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "GraphQL", "PostgreSQL", "Docker", "AWS", "Git", "Jest", "Framer Motion"].map((s, i) => (
                                                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Certifications</h3>
                                            <ul className="text-[11px] text-gray-700 gap-1 flex flex-col">
                                                <li>• AWS Certified Cloud Practitioner (2023)</li>
                                                <li>• Meta Frontend Developer Professional Certificate (2022)</li>
                                                <li>• Google UX Design Certificate (2021)</li>
                                            </ul>
                                        </div>
                                        <div className="mb-4">
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Projects</h3>
                                            <div className="mb-2">
                                                <h4 className="text-[12px] font-bold text-gray-900">Open Source Component Library</h4>
                                                <p className="text-[11px] text-gray-600 leading-relaxed">Built and maintained a 40+ component React UI kit with Storybook documentation, used by 200+ developers on GitHub.</p>
                                            </div>
                                            <div>
                                                <h4 className="text-[12px] font-bold text-gray-900">Real-Time Collaboration Tool</h4>
                                                <p className="text-[11px] text-gray-600 leading-relaxed">Developed a Figma-like whiteboard using WebSockets, Canvas API, and CRDT conflict resolution for multi-user sync.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wider text-gray-800">Languages</h3>
                                            <p className="text-[11px] text-gray-700">English (Native) • Spanish (Conversational)</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {viewingDoc === 'coverLetter' && (
                            <motion.div
                                key="cover-popup"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto slim-scroll"
                            >
                                <div className="max-w-[460px] mx-auto bg-white border border-gray-200 rounded-xl shadow-lg mt-1 mb-6 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-[#F8F9FA]">
                                        <h4 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-lm-black" /> Cover Letter
                                        </h4>
                                        <button onClick={() => setViewingDoc('none')} className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-6 font-serif">
                                        <p className="text-[12px] text-gray-700 leading-relaxed whitespace-pre-line">{coverLetterText}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Action Bar */}
                <div className="relative z-40 bg-white border-t border-gray-100 p-4 shrink-0 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                    <button
                        onClick={() => {
                            setIsAllEditable(!isAllEditable);
                            setEditingField(null);
                        }}
                        className={`px-5 py-2.5 rounded-xl border text-[13px] font-bold transition-colors flex items-center gap-2
                            ${isAllEditable ? 'bg-[#FFF9DB] border-lm-yellow text-lm-black' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <PenLine className="w-4 h-4" /> {isAllEditable ? 'Done Editing' : 'Modify'}
                    </button>

                    <button
                        onClick={handleDone}
                        disabled={isDonePlaying}
                        className="px-8 py-2.5 rounded-xl bg-lm-black hover:opacity-90 text-white text-[13px] font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        DONE <Sparkles className="w-4 h-4 text-lm-yellow" />
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
