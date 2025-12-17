"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    Scissors,
    Copy,
    Trash2,
    Download,
    Undo2,
    Redo2,
    ZoomIn,
    ZoomOut,
    Film,
    Music,
    Type,
    Image as ImageIcon,
    Sparkles,
    Wand2,
    Layers,
    Settings,
    ChevronDown,
    Plus,
    Pencil,
    Video,
    FileVideo,
    Clock,
    Maximize2,
    MousePointer2,
    Split,
    LayoutTemplate,
    Monitor,
    Zap,
    MoveHorizontal,
    ChevronRight,
    AlignLeft,
    BoxSelect,
    PanelLeftClose
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Page() {
    const [title, setTitle] = useState("Untitled Project")
    const [isEditing, setIsEditing] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration] = useState("00:30:00")
    const [activeView, setActiveView] = useState("media") // media, audio, text, effects, transitions
    const [zoom, setZoom] = useState(50)
    const [selectedClip, setSelectedClip] = useState<number | null>(null)

    // Playhead State
    const [playheadX, setPlayheadX] = useState(300)
    const [playingAudioId, setPlayingAudioId] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragConstraints = useRef({ left: 0, width: 0 })

    // Timeline Resize State
    const [timelineHeight, setTimelineHeight] = useState(250)
    const [isResizingTimeline, setIsResizingTimeline] = useState(false)
    const resizeStartRef = useRef({ y: 0, h: 0 })

    const inputRef = useRef<HTMLInputElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    // Derived time (10px = 1s for simple demo)
    const currentTime = new Date(playheadX * 100).toISOString().substr(11, 8)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    // Playhead Dragging Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const { left, width } = dragConstraints.current
                const x = e.clientX - left
                // Clamp position
                const newX = Math.max(0, Math.min(x, width))
                setPlayheadX(newX)
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging])

    // Timeline Resize Logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizingTimeline) {
                const deltaY = resizeStartRef.current.y - e.clientY
                const newHeight = Math.max(250, Math.min(350, resizeStartRef.current.h + deltaY))
                setTimelineHeight(newHeight)
            }
        }

        const handleMouseUp = () => {
            setIsResizingTimeline(false)
            document.body.style.cursor = 'default'
        }

        if (isResizingTimeline) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = 'ns-resize'
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isResizingTimeline])

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault()
        resizeStartRef.current = { y: e.clientY, h: timelineHeight }
        setIsResizingTimeline(true)
    }

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault()
        if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect()
            dragConstraints.current = { left: rect.left, width: rect.width }
            setIsDragging(true)
        }
    }

    const handleTimestampClick = (e: React.MouseEvent) => {
        if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            setPlayheadX(Math.max(0, Math.min(x, rect.width)))
        }
    }

    const finishEditing = () => {
        if (!title.trim()) setTitle("Untitled Project")
        setIsEditing(false)
    }

    return (
        <div className="flex flex-col h-full w-full bg-[#000000] text-white overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Header */}
            <header className="flex-none h-14 border-b border-white/[0.05] bg-[#000000] flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="text-zinc-500 hover:text-white transition-colors" />
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex flex-col justify-center">
                        {isEditing ? (
                            <Input
                                ref={inputRef}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={finishEditing}
                                onKeyDown={(e) => e.key === "Enter" && finishEditing()}
                                className="h-6 text-sm font-medium text-white bg-transparent border-none p-0 focus-visible:ring-0 w-[200px]"
                            />
                        ) : (
                            <div
                                className="group flex items-center gap-2 cursor-pointer"
                                onClick={() => setIsEditing(true)}
                            >
                                <span className="text-sm font-medium text-white/90">{title}</span>
                                <Pencil className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-medium">
                            <span>1920x1080</span>
                            <span>•</span>
                            <span>30fps</span>
                            <span>•</span>
                            <span className="text-zinc-500">Auto Saved</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600 mr-3 font-mono tracking-wide hidden sm:block">
                        00:00:15 <span className="text-zinc-800">/</span> 00:30:00
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                        <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                        <Redo2 className="h-4 w-4" />
                    </Button>
                    <Button className="h-8 rounded-md bg-white text-black hover:bg-zinc-200 text-xs font-semibold px-4 ml-2 transition-all">
                        <Download className="h-3.5 w-3.5 mr-2" />
                        Export
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* 1. Activity Bar (Ultra-slim left rail) */}
                <div className="w-[68px] flex-none flex flex-col items-center py-6 gap-2 border-r border-white/[0.05] bg-[#050505] z-20">
                    <ActivityIcon icon={ImageIcon} label="Media" active={activeView === "media"} onClick={() => setActiveView("media")} />
                    <ActivityIcon icon={Music} label="Audio" active={activeView === "audio"} onClick={() => setActiveView("audio")} />
                    <ActivityIcon icon={Type} label="Text" active={activeView === "text"} onClick={() => setActiveView("text")} />
                    <ActivityIcon icon={Sparkles} label="Effects" active={activeView === "effects"} onClick={() => setActiveView("effects")} />
                    <ActivityIcon icon={MoveHorizontal} label="Trans" active={activeView === "transitions"} onClick={() => setActiveView("transitions")} />
                    <ActivityIcon icon={LayoutTemplate} label="Filters" active={activeView === "filters"} onClick={() => setActiveView("filters")} />
                </div>

                {/* 2. Library Panel (Expandable Drawer) */}
                <div className="w-[320px] flex-none border-r border-white/[0.05] bg-[#09090b] flex flex-col z-10 hidden md:flex">
                    <div className="h-14 px-5 border-b border-white/[0.05] flex items-center justify-between bg-[#09090b]">
                        <h2 className="font-semibold text-sm text-white/90 capitalize tracking-wide">{activeView} Library</h2>
                        {activeView === 'media' && (
                            <Button size="sm" className="h-7 text-xs bg-white/5 hover:bg-white/10 text-white px-3 rounded-md border border-white/5 transition-colors">
                                <Plus className="h-3 w-3 mr-1.5" />
                                Import
                            </Button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-[#09090b]">
                        {activeView === 'media' && (
                            <div className="space-y-5">
                                <div className="p-8 rounded-xl border border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-pointer group text-center">
                                    <div className="h-10 w-10 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        <FileVideo className="h-5 w-5" />
                                    </div>
                                    <p className="text-xs font-medium text-zinc-500 group-hover:text-zinc-400">Drag & Drop Media</p>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold text-zinc-600 mb-3 px-1 uppercase tracking-widest">Recents</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="aspect-video bg-black rounded-lg border border-white/[0.08] overflow-hidden relative group cursor-pointer hover:border-white/20 transition-all">
                                                <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs font-medium group-hover:text-zinc-600 transition-colors">IMG_{i}92.MOV</div>
                                                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-sm bg-black/90 text-[9px] font-mono text-zinc-400">00:12</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeView === 'audio' && (
                            <div className="space-y-1">
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer group transition-colors border border-transparent",
                                            playingAudioId === i ? "bg-white/[0.03] border-white/[0.02]" : "hover:bg-white/[0.03] hover:border-white/[0.02]"
                                        )}
                                    >
                                        <div className="h-8 w-8 rounded bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                                            <Music className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium text-zinc-300 truncate group-hover:text-white transition-colors">Cosmic Journey {i + 1}</div>
                                            <div className="text-[10px] text-zinc-600 group-hover:text-zinc-500">02:45 • Chill • 120BPM</div>
                                        </div>
                                        <div className={cn(
                                            "flex items-center gap-1 transition-opacity",
                                            playingAudioId === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                        )}>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 bg-white/10 hover:bg-white/20 rounded-full text-zinc-400 hover:text-white"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setPlayingAudioId(playingAudioId === i ? null : i)
                                                }}
                                            >
                                                {playingAudioId === i ? (
                                                    <Pause className="h-3 w-3 fill-current" />
                                                ) : (
                                                    <Play className="h-3 w-3 fill-current" />
                                                )}
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-6 w-6 bg-white/10 hover:bg-white/20 rounded-full text-zinc-400 hover:text-white">
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeView === 'text' && (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 bg-[#121214] border border-white/5 rounded-xl text-center cursor-pointer hover:border-white/20 hover:bg-[#18181a] transition-all">
                                    <span className="text-xl font-bold text-white">Title</span>
                                </div>
                                <div className="p-4 bg-[#121214] border border-white/5 rounded-xl text-center cursor-pointer hover:border-white/20 hover:bg-[#18181a] transition-all">
                                    <span className="text-sm font-medium text-zinc-300">Subtitle</span>
                                </div>
                                <div className="p-4 bg-[#121214] border border-white/5 rounded-xl text-center cursor-pointer hover:border-white/20 hover:bg-[#18181a] transition-all col-span-2">
                                    <span className="text-2xl font-black text-white px-3 py-1 bg-red-600 -skew-x-12 inline-block">VLOG</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Center Stage */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">

                    {/* Top: Player / Preview */}
                    <div className="flex-1 min-h-[40%] bg-[#000000] relative flex flex-col items-center justify-center">
                        {/* Dot Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        {/* Toolbar overlapping preview */}
                        <div className="absolute top-6 flex items-center gap-2 p-1.5 rounded-full bg-[#121214] border border-white/10 z-20 shadow-2xl opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-medium text-zinc-500 px-3 border-r border-white/5">PREVIEW</span>
                            <span className="text-[10px] font-mono text-zinc-300 px-2">100%</span>
                        </div>

                        {/* Video Canvas */}
                        <div className="aspect-video w-[90%] max-h-[90%] max-w-5xl bg-[#050505] rounded-lg shadow-2xl shadow-black relative border border-white/[0.05] group overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-zinc-800 font-medium text-xs tracking-widest uppercase flex items-center gap-3">
                                    <Video className="h-4 w-4 opacity-40" />
                                    No Source Selected
                                </div>
                            </div>
                            {/* Playhead line in preview */}
                            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/30 hidden" />
                        </div>
                    </div>

                    {/* Control Bar 1: Playback & Timecode */}
                    <div className="h-15 border-t border-white/[0.05] bg-[#09090b] flex items-center justify-between px-4 z-20 relative">
                        {/* Resize Handle */}
                        <div
                            className="absolute -top-1 left-0 right-0 h-3 cursor-grab active:cursor-grabbing z-50 group flex items-center justify-center -translate-y-1/2"
                            onMouseDown={handleResizeStart}
                        >
                            <div className="w-12 h-1 bg-white/80 relative top-1 rounded-full group-hover:bg-white/40 transition-colors shadow-sm" />
                        </div>



                        <div className="flex-1" />

                        <div className="flex items-center gap-4 justify-center flex-1">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                                <SkipBack className="h-4 w-4 fill-current" />
                            </Button>
                            <Button
                                className="h-10 w-10 rounded-full bg-white text-black hover:bg-zinc-200 flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                                <SkipForward className="h-4 w-4 fill-current" />
                            </Button>
                        </div>

                        <div className="flex-1 flex justify-end">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 bg-white/[0.02] px-3 py-1.5 rounded-md border border-white/[0.05]">
                                <span className="text-zinc-300">{currentTime}</span>
                                <span className="text-zinc-700">/</span>
                                <span>{duration[0]}</span>
                            </div>
                        </div>
                    </div>

                    {/* Control Bar 2: Tools & Zoom (The "next line") */}
                    <div className="h-10 border-t border-white/[0.05] bg-[#09090b] flex items-center justify-between px-4 z-20">
                        <div className="flex items-center gap-1">
                            <TimelineToolButton icon={MousePointer2} label="Select" active />
                            <TimelineToolButton icon={Split} label="Blade" shortcut="B" />
                            <TimelineToolButton icon={Scissors} label="Cut" />
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <TimelineToolButton icon={Trash2} label="Delete" />
                        </div>

                        <div className="flex items-center gap-3">
                            <ZoomOut className="h-3 w-3 text-zinc-600" />
                            <SliderControl value={zoom} min={0} max={100} width="w-24" />
                            <ZoomIn className="h-3 w-3 text-zinc-600" />
                        </div>
                    </div>

                    {/* Bottom: Timeline */}
                    <div
                        className={cn(
                            "flex-none bg-[#050505] flex flex-col relative border-t border-black",
                            !isResizingTimeline && "transition-[height] duration-300 ease-out"
                        )}
                        style={{ height: timelineHeight }}
                        ref={timelineRef}
                    >
                        {/* Time Ruler */}
                        <div
                            className="h-8 border-b border-white/[0.05] bg-[#09090b] relative overflow-hidden flex-none cursor-pointer hover:bg-white/[0.02] transition-colors"
                            onClick={handleTimestampClick}
                        >
                            <div className="absolute inset-0 flex text-[9px] text-zinc-600 font-mono items-end pb-1 select-none pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="flex-1 border-l border-white/[0.05] pl-1 h-full flex items-end pb-1 relative">
                                        <span className="ml-1 opacity-50">00:0{i}:00</span>
                                        {/* Ticks */}
                                        <div className="absolute bottom-0 left-[25%] h-1.5 w-[1px] bg-white/[0.03]" />
                                        <div className="absolute bottom-0 left-[50%] h-2.5 w-[1px] bg-white/[0.05]" />
                                        <div className="absolute bottom-0 left-[75%] h-1.5 w-[1px] bg-white/[0.03]" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tracks Area */}
                        <div className="flex-1 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-[#000000]">
                            {/* Playhead Line */}
                            <div
                                className={cn(
                                    "absolute top-0 bottom-0 w-[1px] bg-white z-50 drop-shadow-[0_0_4px_rgba(255,255,255,0.3)] cursor-ew-resize hover:w-[2px] group",
                                    !isDragging && "transition-all duration-200"
                                )}
                                style={{ left: playheadX }}
                                onMouseDown={handleDragStart}
                            >
                                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white transform rotate-45 shadow-sm group-hover:scale-125 transition-transform" />
                            </div>

                            <TimelineTrack label="V1" type="video" icon={Video}>
                                <TrackClip
                                    name="IMG_4822.MOV"
                                    duration={250}
                                    start={50}
                                    color="bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800/60"
                                    active={selectedClip === 1}
                                    onClick={() => setSelectedClip(1)}
                                    thumb
                                />
                                <TrackClip
                                    name="IMG_4825.MOV"
                                    duration={180}
                                    start={310}
                                    color="bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-800/60"
                                    active={selectedClip === 2}
                                    onClick={() => setSelectedClip(2)}
                                    thumb
                                />
                            </TimelineTrack>

                            <TimelineTrack label="A1" type="audio" icon={Music}>
                                <TrackClip
                                    name="Lo-Fi Beat.mp3"
                                    duration={600}
                                    start={0}
                                    color="bg-emerald-900/30 border-emerald-800/30 hover:bg-emerald-900/40"
                                    type="audio"
                                    wave
                                />
                            </TimelineTrack>

                            <TimelineTrack label="FX" type="effect" icon={Sparkles}>
                                <TrackClip
                                    name="Glitch"
                                    duration={100}
                                    start={200}
                                    color="bg-violet-900/30 border-violet-800/30 hover:bg-violet-900/40"
                                    type="effect"
                                />
                            </TimelineTrack>
                        </div>
                    </div>
                </div>

                {/* 4. Properties Panel (Right Sidebar) */}
                <div className="w-[320px] flex-none border-l border-white/[0.05] bg-[#09090b] flex flex-col z-10 hidden xl:flex">
                    {selectedClip ? (
                        <>
                            <div className="h-14 flex items-center px-4 border-b border-white/[0.05] gap-2">
                                <span className="text-sm font-semibold text-white/90">Inspector</span>
                                <div className="ml-auto flex bg-white/5 rounded-lg p-0.5">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-white"><Video className="h-3 w-3" /></Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-zinc-500 hover:text-white"><Music className="h-3 w-3" /></Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-zinc-500 hover:text-white"><Sparkles className="h-3 w-3" /></Button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-8">
                                <PropertySection title="Transform" icon={Maximize2}>
                                    <div className="space-y-5 bg-[#000000]/40 rounded-xl p-4 border border-white/[0.05]">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-medium text-zinc-500">Scale</label>
                                                <span className="text-xs font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded">100%</span>
                                            </div>
                                            <SliderControl value={50} />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-medium text-zinc-500">Position</label>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="bg-white/5 rounded-lg p-2 border border-white/[0.05] flex items-center justify-between">
                                                    <span className="text-[10px] text-zinc-600">X</span>
                                                    <span className="text-xs font-mono text-zinc-300">960</span>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-2 border border-white/[0.05] flex items-center justify-between">
                                                    <span className="text-[10px] text-zinc-600">Y</span>
                                                    <span className="text-xs font-mono text-zinc-300">540</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PropertySection>

                                <PropertySection title="Opacity" icon={Layers}>
                                    <div className="bg-[#000000]/40 rounded-xl p-4 border border-white/[0.05]">
                                        <SliderControl value={100} />
                                    </div>
                                </PropertySection>

                                <PropertySection title="Blend Mode" icon={Sparkles}>
                                    <div className="bg-[#000000]/40 rounded-xl p-1 border border-white/[0.05]">
                                        <select className="w-full bg-transparent text-xs text-zinc-300 p-2.5 outline-none cursor-pointer">
                                            <option className="bg-[#09090b]">Normal</option>
                                            <option className="bg-[#09090b]">Screen</option>
                                            <option className="bg-[#09090b]">Multiply</option>
                                            <option className="bg-[#09090b]">Overlay</option>
                                        </select>
                                    </div>
                                </PropertySection>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-zinc-500">
                            <div className="h-14 w-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-4 border border-white/[0.02]">
                                <BoxSelect className="h-6 w-6 opacity-20" />
                            </div>
                            <h3 className="text-sm font-medium text-zinc-400 mb-1">No Selection</h3>
                            <p className="text-[11px] text-zinc-600 px-8 leading-relaxed">Select a clip in the timeline to view and edit its properties.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function ActivityIcon({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={cn(
                "w-10 h-10 mb-2 flex items-center justify-center rounded-xl transition-all duration-200 group relative",
                active ? "text-white bg-white/10 shadow-inner" : "text-zinc-500 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon className="h-5 w-5" />
            {active && <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-white hidden" />}
        </button>
    )
}

function TimelineToolButton({ icon: Icon, label, shortcut, active }: { icon: any, label: string, shortcut?: string, active?: boolean }) {
    return (
        <button
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200",
                active ? "bg-white/10 text-white shadow-sm" : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
            title={`${label} ${shortcut ? `(${shortcut})` : ''}`}
        >
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium hidden lg:block">{label}</span>
        </button>
    )
}

function TimelineTrack({ label, type, icon: Icon, children }: { label: string, type: string, icon: any, children: React.ReactNode }) {
    return (
        <div className="flex min-w-[800px] group">
            <div className="w-24 flex-none bg-black/20 backdrop-blur-xl border-r border-white/[0.05] flex items-center px-3 gap-2 z-30 sticky left-0 shadow-[2px_0_10px_rgba(0,0,0,0.4)]">
                <Icon className="h-3.5 w-3.5 text-zinc-600" />
                <span className="text-[10px] font-medium text-zinc-500 font-mono tracking-tight">{label}</span>
            </div>
            <div className="flex-1 h-16 relative bg-[#09090b]/30 hover:bg-[#09090b] border-y border-white/[0.02] transition-colors">
                {children}
            </div>
        </div>
    )
}

function TrackClip({ name, duration, start, color, type = "video", active, onClick, thumb, wave }: { name: string, duration: number, start: number, color: string, type?: string, active?: boolean, onClick?: () => void, thumb?: boolean, wave?: boolean }) {
    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick?.() }}
            className={cn(
                "absolute top-1 bottom-1 rounded-md cursor-pointer overflow-hidden border transition-all text-[10px] font-medium flex items-center select-none shadow-sm",
                color,
                active ? "ring-2 ring-white border-transparent z-10 shadow-lg scale-[1.01]" : "opacity-90 hover:opacity-100 placeholder:brightness-110",
                type === 'video' ? 'px-0' : 'px-2'
            )}
            style={{ left: start, width: duration }}
        >
            {type === 'video' && thumb && (
                <div className="absolute inset-0 flex gap-0.5 opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-1 bg-white/20 h-full" />
                    ))}
                </div>
            )}
            {type === 'audio' && wave && (
                <div className="absolute inset-0 flex items-center opacity-30 px-1 gap-0.5">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-white rounded-full" style={{ height: `${20 + (i % 5) * 15}%` }} />
                    ))}
                </div>
            )}
            <span className="relative z-10 truncate text-white/90 drop-shadow-md ml-2">{name}</span>
        </div>
    )
}

function PropertySection({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
                <Icon className="h-3.5 w-3.5 text-zinc-500" />
                <h3 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">{title}</h3>
            </div>
            {children}
        </div>
    )
}

function SliderControl({ value = 50, min = 0, max = 100, width = "w-full" }: { value?: number, min?: number, max?: number, width?: string }) {
    return (
        <div className={`relative h-6 flex items-center group ${width} select-none`}>
            {/* Track */}
            <div className="absolute inset-0 bg-black/40 rounded-full h-1 my-auto overflow-hidden border border-white/5">
                <div
                    className="h-full bg-white/90 rounded-full"
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                />
            </div>
            {/* Thumb */}
            <div
                className="absolute w-4 h-4 bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] border-[0.5px] border-black/10 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                style={{ left: `${((value - min) / (max - min)) * 100}%`, transform: 'translateX(-50%)' }}
            />
        </div>
    )
}
