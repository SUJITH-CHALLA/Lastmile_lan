"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Circle } from "lucide-react"

export interface FilterState {
    locations: string[]
    roles: string[]
    jobTypes: string[]
    experience: string[]
    workModes: string[]
    datePosted: string
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
    currentFilters: FilterState;
}

const allLocations = ["India", "Bangalore", "Mumbai", "Pune", "Delhi NCR", "Chennai", "Hyderabad"]
const allRoles = ["Software Dev", "UI/UX Design", "Product Manager", "Data Science", "Marketing", "HR", "Sales"]
const allJobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"]
const allExperience = ["Fresher", "Entry Level", "1-3 yrs", "3-5 yrs", "5+ yrs", "Leadership"]
const allWorkModes = ["Onsite", "Remote", "Hybrid"]
const allDatePosted = ["Any Time", "Past 24 hours", "Past Week", "Past Month"]

export function FilterModal({ isOpen, onClose, onApply, currentFilters }: FilterModalProps) {
    const [filters, setFilters] = useState<FilterState>(currentFilters)

    useEffect(() => {
        if (isOpen) {
            setFilters(currentFilters)
        }
    }, [isOpen, currentFilters])

    const toggleItem = (item: string, key: keyof FilterState) => {
        if (key === "datePosted") {
            setFilters({ ...filters, [key]: item })
        } else {
            const list = filters[key] as string[]
            if (list.includes(item)) {
                setFilters({ ...filters, [key]: list.filter(i => i !== item) })
            } else {
                setFilters({ ...filters, [key]: [...list, item] })
            }
        }
    }

    const handleApply = () => {
        onApply(filters)
        onClose()
    }

    const handleClear = () => {
        setFilters({
            locations: ["India"],
            roles: [],
            jobTypes: [],
            experience: [],
            workModes: [],
            datePosted: "Any Time"
        })
    }

    const renderSection = (title: string, items: string[], key: keyof FilterState, isSingle = false) => (
        <div>
            <h3 className="text-[13px] font-bold text-lm-black mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => {
                    const isSelected = isSingle ? filters[key] === item : (filters[key] as string[]).includes(item)
                    return (
                        <button
                            key={item}
                            onClick={() => toggleItem(item, key)}
                            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors flex items-center gap-1.5 border
                ${isSelected ? 'bg-lm-yellow text-lm-black border-lm-yellow shadow-sm' : 'bg-white text-lm-text-secondary border-lm-border hover:border-[#aaa]'}
              `}
                        >
                            {isSelected && (
                                isSingle
                                    ? <Circle className="w-2.5 h-2.5 fill-lm-black text-lm-black" strokeWidth={1} />
                                    : <Check className="w-3 h-3" strokeWidth={3} />
                            )}
                            {item}
                        </button>
                    )
                })}
            </div>
        </div>
    )

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center py-6 px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-lm-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, type: "spring", bounce: 0.3 }}
                        className="relative bg-white w-full max-w-[640px] max-h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-lm-border z-10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-lm-border shrink-0">
                            <div>
                                <h2 className="text-lg font-bold text-lm-black font-display tracking-wide uppercase leading-tight">All Filters</h2>
                                <p className="text-[11px] text-lm-text-secondary">Refine your job matches further.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-lm-content transition-colors"
                                title="Close"
                            >
                                <X className="w-5 h-5 text-lm-text-secondary" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6 slim-scroll bg-lm-content/30">
                            <div className="flex flex-col gap-8">
                                {renderSection("Location", allLocations, "locations")}
                                {renderSection("Role", allRoles, "roles")}
                                {renderSection("Experience Level", allExperience, "experience")}
                                {renderSection("Job Type", allJobTypes, "jobTypes")}
                                {renderSection("Work Mode", allWorkModes, "workModes")}
                                {renderSection("Date Posted", allDatePosted, "datePosted", true)}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-lm-border flex items-center justify-between bg-white shrink-0">
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 text-xs font-bold text-lm-text-secondary hover:text-lm-black transition-colors"
                            >
                                Clear All
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2 rounded-xl text-xs font-bold text-lm-black border border-lm-border hover:bg-lm-content transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApply}
                                    className="px-6 py-2 rounded-xl text-xs font-bold bg-lm-black text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                                >
                                    Show Matching Jobs
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
