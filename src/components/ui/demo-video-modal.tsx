"use client"
import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"

export function DemoVideoModal({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play()
    } else if (!open && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [open])

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center 
          bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl border-2 border-black 
            shadow-neo-lg bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 
              bg-primary border-2 border-black shadow-neo flex 
              items-center justify-center hover:bg-yellow-400 
              transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              ref={videoRef}
              src="https://framerusercontent.com/assets/P3kE70K5e0C6J9T9J9a8z.mp4"
              controls
              playsInline
              className="w-full aspect-video"
            />
          </div>
        </div>
      )}
    </>
  )
}
