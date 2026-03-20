"use client"

interface TopNavProps {
    activeView: string;
}

export default function TopNav({ activeView }: TopNavProps) {
    return <nav data-view={activeView} />
}
