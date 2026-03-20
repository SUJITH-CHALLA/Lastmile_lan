"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, ListFilter, LayoutDashboard, Bookmark } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Sidebar } from "@/components/dashboard/Sidebar"
import TopNav from "@/components/dashboard/TopNav"
import { JobCard, Job } from "@/components/dashboard/JobCard"
import JobDetailsPanel from "@/components/dashboard/JobDetailsPanel"
import { SkeletonJobCard } from "@/components/dashboard/SkeletonLoader"
import { DropdownFilter } from "@/components/dashboard/DropdownFilter"
import { FilterModal, FilterState } from "@/components/dashboard/FilterModal"
import { ApplicationsTracker } from "@/components/dashboard/ApplicationsTracker"
import { ResumeVault } from "@/components/dashboard/ResumeVault"
import { PortfolioVault } from "@/components/dashboard/PortfolioVault"
import { ProfileSection, loadProfile, ProfileData } from "@/components/dashboard/ProfileSection"

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Google · Core Systems",
    logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    logoBg: "#ffffff",
    match: 92,
    salary: "₹24L – ₹35L",
    tags: ["Bangalore", "Full-time", "Entry Level", "Software Dev", "Onsite"],
    time: "Actively Interviewing"
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "Accenture · Digital Web",
    logo: "https://www.google.com/s2/favicons?domain=accenture.com&sz=128",
    logoBg: "#ffffff",
    match: 85,
    salary: "₹12L – ₹18L",
    tags: ["Pune", "Full-time", "0+ yrs", "Software Dev"],
    time: "High Response Rate"
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Figma · Design Systems",
    logo: "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
    logoBg: "#ffffff",
    match: 96,
    salary: "₹18L – ₹28L",
    tags: ["Remote", "India", "Delhi NCR", "UI/UX Design", "Contract", "3-5 yrs"],
    time: "Early Applicant Advantage"
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "IBM · Cloud & AI",
    logo: "https://www.google.com/s2/favicons?domain=ibm.com&sz=128",
    logoBg: "#ffffff",
    match: 78,
    salary: "₹15L – ₹22L",
    tags: ["Bangalore", "Office", "Data Science", "Full-time"],
    time: "Fast Hiring Track"
  },
  {
    id: "5",
    title: "Cloud Architect",
    company: "Airbnb · Core Infrastructure",
    logo: "https://www.google.com/s2/favicons?domain=airbnb.com&sz=128",
    logoBg: "#ffffff",
    match: 88,
    salary: "₹20L – ₹30L",
    tags: ["Mumbai", "Full-time", "Software Dev", "Remote"],
    time: "Urgently Hiring"
  },
  {
    id: "6",
    title: "React Engineer",
    company: "Vercel · Frontend Frameworks",
    logo: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    logoBg: "#ffffff",
    match: 94,
    salary: "₹25L – ₹40L",
    tags: ["Remote", "India", "Software Dev", "Full-time"],
    time: "Early Applicant Advantage"
  },
  {
    id: "7",
    title: "Product Marketing Manager",
    company: "Spotify · Creator Studio",
    logo: "https://www.google.com/s2/favicons?domain=spotify.com&sz=128",
    logoBg: "#ffffff",
    match: 71,
    salary: "₹18L – ₹26L",
    tags: ["Mumbai", "Full-time", "Marketing", "Hybrid"],
    time: "Actively Interviewing"
  },
  {
    id: "8",
    title: "Backend Engineer",
    company: "Stripe · Payments Core",
    logo: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128",
    logoBg: "#ffffff",
    match: 83,
    salary: "₹20L – ₹32L",
    tags: ["Bangalore", "Full-time", "Software Dev"],
    time: "High Response Rate"
  },
  {
    id: "9",
    title: "Technical Product Manager",
    company: "Microsoft · Azure",
    logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
    logoBg: "#ffffff",
    match: 89,
    salary: "₹28L – ₹45L",
    tags: ["Hyderabad", "Product Manager", "Full-time", "Office"],
    time: "Fast Hiring Track"
  },
  {
    id: "10",
    title: "Supply Chain Analyst",
    company: "Meta · Reality Labs",
    logo: "https://www.google.com/s2/favicons?domain=meta.com&sz=128",
    logoBg: "#ffffff",
    match: 65,
    salary: "₹10L – ₹16L",
    tags: ["Bangalore", "Data Science", "Full-time"],
    time: "Reviewing Applications"
  },
  { id: "11", title: "Machine Learning Engineer", company: "OpenAI · Core AI", logo: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", logoBg: "#ffffff", match: 98, salary: "₹40L – ₹65L", tags: ["Remote", "Software Dev", "Machine Learning"], time: "Actively Interviewing" },
  { id: "12", title: "Full Stack Developer", company: "Netflix · Enterprise", logo: "https://www.google.com/s2/favicons?domain=netflix.com&sz=128", logoBg: "#ffffff", match: 88, salary: "₹25L – ₹40L", tags: ["Remote", "Software Dev", "Full-time"], time: "Fast Hiring Track" },
  { id: "13", title: "iOS Developer", company: "Apple · App Store", logo: "https://www.google.com/s2/favicons?domain=apple.com&sz=128", logoBg: "#ffffff", match: 74, salary: "₹22L – ₹35L", tags: ["Bangalore", "Software Dev", "Mobile"], time: "High Response Rate" },
  { id: "14", title: "Site Reliability Engineer", company: "Amazon · AWS", logo: "https://www.google.com/s2/favicons?domain=amazon.com&sz=128", logoBg: "#ffffff", match: 91, salary: "₹20L – ₹30L", tags: ["Hyderabad", "Software Dev", "Office"], time: "Urgently Hiring" },
  { id: "15", title: "Systems Engineer", company: "NVIDIA · Core Tech", logo: "https://www.google.com/s2/favicons?domain=nvidia.com&sz=128", logoBg: "#ffffff", match: 86, salary: "₹28L – ₹42L", tags: ["Pune", "Software Dev", "Hardware"], time: "Actively Interviewing" },
  { id: "16", title: "Security Analyst", company: "Zoom · Trust & Safety", logo: "https://www.google.com/s2/favicons?domain=zoom.us&sz=128", logoBg: "#ffffff", match: 79, salary: "₹15L – ₹24L", tags: ["Remote", "Cybersecurity", "Full-time"], time: "Reviewing Applications" },
  { id: "17", title: "Go Developer", company: "Uber · Mobility", logo: "https://www.google.com/s2/favicons?domain=uber.com&sz=128", logoBg: "#ffffff", match: 93, salary: "₹26L – ₹38L", tags: ["Bangalore", "Software Dev", "Backend"], time: "Early Applicant Advantage" },
  { id: "18", title: "Frontend Lead", company: "Slack · Web Apps", logo: "https://www.google.com/s2/favicons?domain=slack.com&sz=128", logoBg: "#ffffff", match: 84, salary: "₹30L – ₹45L", tags: ["Remote", "Software Dev", "Leadership"], time: "High Response Rate" },
  { id: "19", title: "Developer Advocate", company: "GitHub · DevRel", logo: "https://www.google.com/s2/favicons?domain=github.com&sz=128", logoBg: "#ffffff", match: 97, salary: "₹24L – ₹36L", tags: ["Remote", "DevRel", "Marketing"], time: "Actively Interviewing" },
  { id: "20", title: "Data Engineer", company: "LinkedIn · Growth", logo: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128", logoBg: "#ffffff", match: 81, salary: "₹18L – ₹28L", tags: ["Bangalore", "Data Science", "Full-time"], time: "Reviewing Applications" },
  { id: "21", title: "AI Researcher", company: "Anthropic · Alignment", logo: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", logoBg: "#ffffff", match: 95, salary: "₹45L – ₹70L", tags: ["Remote", "Data Science", "AI"], time: "Fast Hiring Track" },
  { id: "22", title: "Cloud Infrastructure Engineer", company: "Databricks · Platform", logo: "https://www.google.com/s2/favicons?domain=databricks.com&sz=128", logoBg: "#ffffff", match: 88, salary: "₹32L – ₹50L", tags: ["Bangalore", "Software Dev", "Full-time"], time: "Urgently Hiring" },
  { id: "23", title: "Fintech Product Designer", company: "Stripe · Consumer Apps", logo: "https://www.google.com/s2/favicons?domain=stripe.com&sz=128", logoBg: "#ffffff", match: 90, salary: "₹22L – ₹34L", tags: ["Remote", "UI/UX Design", "Finance"], time: "Early Applicant Advantage" },
  { id: "24", title: "Workspace Architect", company: "Notion · Enterprise", logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=128", logoBg: "#ffffff", match: 76, salary: "₹20L – ₹32L", tags: ["Remote", "Software Dev", "Consulting"], time: "High Response Rate" },
  { id: "25", title: "Motion Designer", company: "Canva · Creative", logo: "https://www.google.com/s2/favicons?domain=canva.com&sz=128", logoBg: "#ffffff", match: 89, salary: "₹16L – ₹26L", tags: ["Remote", "Design", "Contract"], time: "Actively Interviewing" },
  { id: "26", title: "Integrations Engineer", company: "Plaid · API", logo: "https://www.google.com/s2/favicons?domain=plaid.com&sz=128", logoBg: "#ffffff", match: 85, salary: "₹25L – ₹38L", tags: ["Bangalore", "Software Dev", "Finance"], time: "Fast Hiring Track" },
  { id: "27", title: "Storage Systems Engineer", company: "Dropbox · Core", logo: "https://www.google.com/s2/favicons?domain=dropbox.com&sz=128", logoBg: "#ffffff", match: 82, salary: "₹28L – ₹40L", tags: ["Remote", "Software Dev", "Backend"], time: "Reviewing Applications" },
  { id: "28", title: "Visual Search ML Engineer", company: "Pinterest · Discovery", logo: "https://www.google.com/s2/favicons?domain=pinterest.com&sz=128", logoBg: "#ffffff", match: 92, salary: "₹26L – ₹45L", tags: ["Remote", "Data Science", "Machine Learning"], time: "Urgently Hiring" },
  { id: "29", title: "AR Software Developer", company: "Snap · Spectacles", logo: "https://www.google.com/s2/favicons?domain=snapchat.com&sz=128", logoBg: "#ffffff", match: 87, salary: "₹30L – ₹48L", tags: ["Bangalore", "Software Dev", "AR/VR"], time: "Actively Interviewing" },
  { id: "30", title: "Growth Marketing Manager", company: "Reddit · Communities", logo: "https://www.google.com/s2/favicons?domain=reddit.com&sz=128", logoBg: "#ffffff", match: 73, salary: "₹14L – ₹24L", tags: ["Remote", "Marketing", "Full-time"], time: "Early Applicant Advantage" }
]

// Container staggered animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
}


export default function DashboardPage() {
  const [activeView, setActiveView] = useState("home")


  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedJobId, setSelectedJobId] = useState<string>("3")
  const [savedJobIds, setSavedJobIds] = useState<string[]>([])
  const [hiddenJobIds, setHiddenJobIds] = useState<string[]>([])

  // Filter States unified using FilterState
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    locations: [],
    roles: [],
    jobTypes: [],
    experience: [],
    workModes: [],
    datePosted: "Any Time"
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filterJobs = (allJobs: Job[]) => {
    return allJobs.filter(job => {
      // If "India" is selected as the ONLY location, don't filter out jobs by explicit Indian cities. 
      // Otherwise, checking specific tags for match.
      const hasLocation = activeFilters.locations.length === 0 || activeFilters.locations.includes("India") || activeFilters.locations.some(l => job.tags.includes(l))
      const hasRole = activeFilters.roles.length === 0 || activeFilters.roles.some(r => job.tags.includes(r))
      const hasType = activeFilters.jobTypes.length === 0 || activeFilters.jobTypes.some(t => job.tags.includes(t))
      const hasExp = activeFilters.experience.length === 0 || activeFilters.experience.some(e => job.tags.includes(e))
      const hasMode = activeFilters.workModes.length === 0 || activeFilters.workModes.some(m => job.tags.includes(m))

      let hasDate = true;
      if (activeFilters.datePosted !== "Any Time" && job.time) {
        // simple literal match for mock data purposes
        hasDate = job.time.includes(activeFilters.datePosted) || activeFilters.datePosted.includes("Any Time")
      }

      const isHidden = hiddenJobIds.includes(job.id);
      const isSaved = savedJobIds.includes(job.id);

      // In Saved view, ONLY show saved jobs
      if (activeView === 'saved') {
        return isSaved && hasLocation && hasRole && hasType && hasExp && hasMode && hasDate;
      }

      // Normal Jobs view: hide discarded jobs
      return !isHidden && hasLocation && hasRole && hasType && hasExp && hasMode && hasDate;
    })
  }

  // Watch for filter changes and re-run filter with animation
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setJobs(filterJobs(initialJobs))
      setIsLoading(false)
    }, 600) // Shorter timeout for snappier filter application
    return () => clearTimeout(timer)
  }, [activeFilters, activeView, savedJobIds, hiddenJobIds])

  const handleRefresh = () => {
    // IMPORTANT: Do NOT call setJobs([]) here — that makes selectedJob null
    // which causes JobDetailsPanel to render with job=null and breaks Rules of Hooks.
    // Instead, only set the loading state and swap jobs atomically after the timeout.
    setIsLoading(true)
    setTimeout(() => {
      // Randomize id and slightly adjust match scores for that "refresh" feeling
      const refreshed = initialJobs.map(j => ({
        ...j,
        id: j.id + "-" + Math.random(),
        match: Math.floor(Math.random() * 30) + 70
      }))
      const refreshedFiltered = filterJobs(refreshed)
      setJobs(refreshedFiltered)
      // Keep selectedJobId pointing at the first refreshed job so panel never gets null
      if (refreshedFiltered.length > 0) {
        setSelectedJobId(refreshedFiltered[0].id)
      }
      setIsLoading(false)
    }, 800)
  }

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0] || null

  const handleSaveJob = (id: string) => {
    setSavedJobIds(prev =>
      prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
    )
  }

  const handleHideJob = (id: string) => {
    setHiddenJobIds(prev => [...prev, id])
    // Auto-select the next available job if you hide the currently viewed one
    const availableJobs = filterJobs(initialJobs).filter(j => j.id !== id)
    if (availableJobs.length > 0) {
      setSelectedJobId(availableJobs[0].id)
    }
  }


  return (
    <div className="flex w-full h-screen overflow-hidden bg-lm-content text-lm-text-primary text-[13px] font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentFilters={activeFilters}
        onApply={(filters) => {
          setActiveFilters(filters)
        }}
      />

      <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        <TopNav activeView={activeView} />

        {activeView === 'jobs' || activeView === 'saved' ? (
          <div className="flex-1 min-h-0 grid grid-cols-[300px_1fr] grid-rows-[minmax(0,1fr)] overflow-hidden">
            {/* Left Column - List */}
            <section className="bg-white border-r border-lm-border flex flex-col relative z-10">
              {/* Filters Row — sits OUTSIDE overflow-hidden so dropdowns float freely */}
              <div className="p-3 border-b border-lm-border flex flex-wrap gap-2 shrink-0 z-20 bg-white relative">
                <DropdownFilter
                  label="Location"
                  options={["India", "Bangalore", "Mumbai", "Pune", "Delhi NCR", "Remote"]}
                  selectedValues={activeFilters.locations}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, locations: val }))}
                  singleSelect={true}
                />
                <DropdownFilter
                  label="Role"
                  options={["Software Dev", "UI/UX Design", "Product Manager", "Data Science", "Marketing"]}
                  selectedValues={activeFilters.roles}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, roles: val }))}
                />
                <DropdownFilter
                  label="Job Type"
                  options={["Full-time", "Part-time", "Contract", "Internship"]}
                  selectedValues={activeFilters.jobTypes}
                  onChange={(val) => setActiveFilters(prev => ({ ...prev, jobTypes: val }))}
                />

                <div
                  className="flex items-center gap-[3px] px-[9px] py-1 border border-lm-yellow rounded-full text-[11px] font-bold text-lm-black bg-lm-yellow cursor-pointer hover:bg-[#e0b200]"
                  onClick={handleRefresh}
                  title="Click to refresh jobs"
                >
                  ✦ AI Matches Only
                </div>

                <div
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-[3px] px-[9px] py-1 text-[11px] font-medium text-lm-text-secondary cursor-pointer hover:text-lm-text-primary transition-colors"
                  title="Open detailed filters"
                >
                  All Filters <ListFilter className="w-3 h-3 ml-0.5" />
                </div>
              </div>

              {/* List scrollable area — this container clips its children */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 slim-scroll">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="skeletons"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      className="flex flex-col gap-2"
                    >
                      <SkeletonJobCard />
                      <SkeletonJobCard />
                      <SkeletonJobCard />
                      <SkeletonJobCard />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="cards"
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="flex flex-col gap-0"
                    >
                      {jobs.map((job) => (
                        <motion.div variants={item} key={job.id}>
                          <JobCard
                            job={{ ...job, selected: job.id === selectedJobId }}
                            onClick={() => setSelectedJobId(job.id)}
                            isSaved={savedJobIds.includes(job.id)}
                            onSave={(e) => {
                              e.stopPropagation();
                              handleSaveJob(job.id);
                            }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {!isLoading && jobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 text-center h-full">
                      <Bookmark className="w-10 h-10 text-gray-300 mb-3" />
                      <div className="text-[13px] font-bold text-lm-black">No jobs found</div>
                      <div className="text-[11px] font-medium text-gray-500 mt-1 max-w-[200px]">
                        {activeView === 'saved' ? "You haven't saved any jobs yet." : "No jobs match your current filters."}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Right Column - Detail Panel */}
            <section className="flex flex-col bg-lm-content overflow-hidden relative z-0 min-h-0 max-h-full">
              <JobDetailsPanel
                job={selectedJob}
                isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
                onSave={() => selectedJob && handleSaveJob(selectedJob.id)}
                onHide={() => selectedJob && handleHideJob(selectedJob.id)}
              />
            </section>
          </div>
        ) : activeView === 'track' || activeView === 'home' ? (
          <ApplicationsTracker />
        ) : activeView === 'resume' ? (
          <ResumeVault />
        ) : activeView === 'portfolio' ? (
          <PortfolioVault />
        ) : activeView === 'profile' ? (
          <ProfileSection />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-lm-text-secondary">
            <LayoutDashboard className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-bold text-lm-black">Section in Development</p>
            <p className="text-sm mt-1">This module is currently being built.</p>
          </div>
        )}
      </main>
    </div>
  )
}
