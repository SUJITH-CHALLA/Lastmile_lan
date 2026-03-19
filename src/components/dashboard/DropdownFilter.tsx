"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"

interface DropdownFilterProps {
    label: string;
    options: string[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    singleSelect?: boolean;
}

export function DropdownFilter({ label, options, selectedValues, onChange, singleSelect = false }: DropdownFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleOption = (opt: string) => {
        if (singleSelect) {
            onChange([opt])
            setIsOpen(false)
        } else {
            if (selectedValues.includes(opt)) {
                onChange(selectedValues.filter(v => v !== opt))
            } else {
                onChange([...selectedValues, opt])
            }
        }
    }

    // Determine what to display inside the chip
    const displayLabel = singleSelect && selectedValues.length > 0
        ? selectedValues[0]
        : (!singleSelect && selectedValues.length > 0)
            ? `${label} +${selectedValues.length}`
            : label;

    return (
        <div className="relative inline-flex" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-[4px] px-[10px] py-[4px] border rounded-full text-[11px] font-medium transition-colors bg-white
          ${isOpen || selectedValues.length > 0
                        ? 'border-lm-black text-lm-black'
                        : 'border-lm-border text-lm-text-secondary hover:border-[#999] hover:text-lm-text-primary'
                    }
        `}
            >
                {displayLabel}
                <ChevronDown
                    className={`w-[10px] h-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2.5}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-[calc(100%+6px)] left-0 bg-white border border-lm-border rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] min-w-[160px] overflow-hidden z-[200] max-h-[250px] overflow-y-auto slim-scroll"
                    >
                        <div className="p-1">
                            {options.map((opt) => {
                                const isSelected = selectedValues.includes(opt)
                                return (
                                    <div
                                        key={opt}
                                        onClick={() => toggleOption(opt)}
                                        className="flex items-center justify-between px-3 py-2 text-xs font-medium cursor-pointer transition-colors rounded-md hover:bg-lm-content text-lm-text-primary group"
                                    >
                                        <span>{opt}</span>
                                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors
                      ${isSelected ? 'bg-lm-yellow border-lm-yellow' : 'border-lm-border group-hover:border-[#999]'}
                      ${singleSelect && !isSelected ? 'rounded-full' : 'rounded-[4px]'}
                    `}>
                                            {isSelected && <Check className="w-2.5 h-2.5 text-lm-black" strokeWidth={4} />}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
