"use client"

import { Job } from "./JobCard"

interface JobDetailsPanelProps {
    job: Job | null;
    isSaved?: boolean;
    onSave?: () => void;
    onHide?: () => void;
}

export default function JobDetailsPanel({ job }: JobDetailsPanelProps) {
    if (!job) return <div />
    return <div>{job.title}</div>
}
