"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    MousePointer2,
    Eraser,
    Wand2,
    ImageDown,
    Undo2,
    Redo2,
    Download,
    ZoomIn,
    ZoomOut,
    Layers,
    Type,
    Image as ImageIcon,
    Settings2,
    Sliders,
    Pencil,
    Crop,
    RotateCw,
    FlipHorizontal,
    FlipVertical,
    Lock,
    Grid3x3
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export default function Page() {
    const [title, setTitle] = useState("Untitled Design")
    const [isEditing, setIsEditing] = useState(false)
    const [activeTool, setActiveTool] = useState("move")
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
    const [smartGrid, setSmartGrid] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const finishEditing = () => {
        if (!title.trim()) {
            setTitle("Untitled Design")
        }
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            finishEditing()
        }
    }

    return (
        <div className="flex flex-col h-full w-full">
            {/* Fixed Header */}
            <div className="flex-none p-6 lg:p-8 pb-4 z-20 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="max-w-[1920px] w-full mx-auto">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                            <div className="h-6 w-[1px] bg-white/10" />
                            <div>
                                {isEditing ? (
                                    <Input
                                        ref={inputRef}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        onBlur={finishEditing}
                                        onKeyDown={handleKeyDown}
                                        maxLength={80}
                                        placeholder="Untitled Design"
                                        className="h-7 text-xl font-medium text-white placeholder:text-white/50 bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-[300px] selection:bg-white/20 selection:text-white"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
                                        <h1 className="text-xl font-medium text-white">{title}</h1>
                                        <Pencil className="h-3.5 w-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}
                                <p className="text-xs text-zinc-500">Auto-saved</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                                <Undo2 className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                                <Redo2 className="h-5 w-5" />
                            </Button>
                            <div className="h-6 w-[1px] bg-white/10 mx-2" />
                            <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </header>
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Tool Sidebar */}
                <div className="w-[72px] flex-none flex flex-col items-center py-4 gap-4 border-r border-white/5 bg-[#0a0a0a] z-10">
                    <ToolButton icon={<MousePointer2 className="h-5 w-5" />} label="Move" active={activeTool === "move"} onClick={() => setActiveTool("move")} />
                    <ToolButton icon={<Wand2 className="h-5 w-5" />} label="Magic" active={activeTool === "magic"} onClick={() => setActiveTool("magic")} />
                    <ToolButton icon={<Eraser className="h-5 w-5" />} label="Eraser" active={activeTool === "eraser"} onClick={() => setActiveTool("eraser")} />
                    <ToolButton icon={<ImageDown className="h-5 w-5" />} label="Upscale" active={activeTool === "upscale"} onClick={() => setActiveTool("upscale")} />
                    <ToolButton icon={<Type className="h-5 w-5" />} label="Text" active={activeTool === "text"} onClick={() => setActiveTool("text")} />
                    <ToolButton icon={<ImageIcon className="h-5 w-5" />} label="Uploads" active={activeTool === "uploads"} onClick={() => setActiveTool("uploads")} />
                </div>

                {/* Sub-Sidebar / Properties Panel (Optional - Context aware) */}
                <div className="w-[280px] flex-none border-r border-white/5 bg-[#0f0f0f] flex flex-col hidden lg:flex">
                    {activeTool === "magic" ? (
                        <div className="flex flex-col h-full animate-in slide-in-from-left-5 duration-300 fade-in">
                            <div className="p-4 border-b border-white/5">
                                <h2 className="font-medium text-sm text-white">Auto Craft</h2>
                            </div>
                            <div className="p-4 space-y-6 overflow-y-auto flex-1 flex flex-col">
                                <AdjustmentSection title="Your Vision" icon={Type}>
                                    <textarea
                                        className="w-full h-32 bg-transparent mt-0 border border-white/5 rounded-xl p-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 resize-none"
                                        placeholder="Make this look like a cinematic movie poster with dark lighting..."
                                    />
                                </AdjustmentSection>

                                <Button className="w-full cursor-pointer rounded-full bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5 z-10">
                                    Generate Magic
                                </Button>

                                <AdjustmentSection title="Style Reference" icon={Wand2}>
                                    <div className="grid grid-cols-1 gap-4 p-1">
                                        <StyleRefCard title="Cinematic" image="/assets/bollywood_poster.png" selected={selectedStyle === "Cinematic"} onClick={() => setSelectedStyle("Cinematic")} />
                                        <StyleRefCard title="Anime" image="/assets/girl_with_pearl.png" selected={selectedStyle === "Anime"} onClick={() => setSelectedStyle("Anime")} />
                                        <StyleRefCard title="Cyberpunk" image="/assets/holiday_card.png" selected={selectedStyle === "Cyberpunk"} onClick={() => setSelectedStyle("Cyberpunk")} />
                                        <StyleRefCard title="Oil Painting" image="/assets/bollywood_poster.png" selected={selectedStyle === "Oil Painting"} onClick={() => setSelectedStyle("Oil Painting")} />
                                        <StyleRefCard title="Polaroid" image="/assets/girl_with_pearl.png" selected={selectedStyle === "Polaroid"} onClick={() => setSelectedStyle("Polaroid")} />
                                        <StyleRefCard title="Studio" image="/assets/holiday_card.png" selected={selectedStyle === "Studio"} onClick={() => setSelectedStyle("Studio")} />
                                    </div>
                                </AdjustmentSection>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full animate-in slide-in-from-left-5 duration-300 fade-in">
                            <div className="p-4 border-b border-white/5">
                                <h2 className="font-medium text-sm text-white">Adjustments</h2>
                            </div>
                            <div className="p-4 space-y-8 overflow-y-auto">

                                <AdjustmentSection title="Enhance" icon={Wand2}>
                                    <div className="p-1">
                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                                            <Wand2 className="h-4 w-4 text-white" />
                                            <span className="text-sm text-white font-medium">Auto Enhance</span>
                                        </div>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Smart Crop" icon={Crop}>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between px-1 cursor-pointer group" onClick={() => setSmartGrid(!smartGrid)}>
                                            <span className="text-xs text-white font-medium">Smart Grid</span>
                                            <div className={`h-5 w-9 rounded-full relative transition-colors duration-200 ${smartGrid ? 'bg-white' : 'bg-white/10'}`}>
                                                <div className={`absolute top-1 h-3 w-3 rounded-full shadow-sm transition-all duration-200 ${smartGrid ? 'right-1 bg-black' : 'left-1 bg-white/40'}`} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-2">
                                            <Button variant="outline" size="sm" className="h-8 text-[11px] rounded-xl px-0 bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">Free</Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[11px] rounded-xl px-0 bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">1:1</Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[11px] rounded-xl px-0 bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">4:5</Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[11px] rounded-xl px-0 bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">16:9</Button>
                                        </div>

                                        <div className="flex items-center gap-2 justify-center">
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">
                                                <RotateCw className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">
                                                <FlipHorizontal className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:text-white">
                                                <FlipVertical className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex-1">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-white/50 font-bold">W</span>
                                                    <Input className="h-9 text-xs text-white rounded-xl bg-black/20 border-transparent pl-6 pr-2 text-center" placeholder="1920" />
                                                </div>
                                                <div className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 cursor-pointer">
                                                    <Lock className="h-3.5 w-3.5" />
                                                </div>
                                                <div className="relative flex-1">
                                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-white/50 font-bold">H</span>
                                                    <Input className="h-9 text-xs text-white rounded-xl bg-black/20 border-transparent pl-6 pr-2 text-center" placeholder="1080" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Light">
                                    <SliderControl label="Exposure" value={0} />
                                    <SliderControl label="Contrast" value={10} />
                                    <SliderControl label="Highlights" value={-20} />
                                    <SliderControl label="Shadows" value={30} />
                                    <SliderControl label="Whites" value={5} />
                                    <SliderControl label="Blacks" value={-5} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Color">
                                    <SliderControl label="Saturation" value={15} />
                                    <SliderControl label="Vibrance" value={20} />
                                    <SliderControl label="Temperature" value={0} />
                                    <SliderControl label="Tint" value={0} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Advanced">
                                    <SliderControl label="Clarity" value={0} />
                                    <SliderControl label="Sharpness" value={25} />
                                    <SliderControl label="Vignette" value={-10} />
                                    <SliderControl label="Grain" value={0} />
                                </AdjustmentSection>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Canvas Area */}
                <div className="flex-1 bg-[#18181b] relative overflow-hidden flex items-center justify-center p-8">
                    {/* Dot Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                    {/* The Canvas */}
                    <div className="relative shadow-2xl shadow-black/50 bg-[#0f0f0f] aspect-[16/9] w-full max-w-4xl border border-white/5 rounded-sm overflow-hidden group">
                        {/* Placeholder for Canvas Content */}
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                            <div className="text-center">
                                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">Drag and drop an image here</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Floating Bar (Zoom) */}
                    <div className="absolute bottom-6 bg-[#0a0a0a]/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 text-zinc-400">
                        <ZoomOut className="h-4 w-4 cursor-pointer hover:text-white" />
                        <span className="text-xs font-mono min-w-[3ch] text-center">100%</span>
                        <ZoomIn className="h-4 w-4 cursor-pointer hover:text-white" />
                    </div>
                </div>

            </div>
        </div>
    )
}

function AdjustmentSection({ title, children, icon: Icon }: { title: string, children: React.ReactNode, icon?: React.ElementType }) {
    return (
        <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 px-1">
                {Icon && <Icon className="h-3.5 w-3.5 text-white" />}
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h3>
            </div>
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-[24px] p-5 border border-white/5 space-y-5 shadow-sm">
                {children}
            </div>
        </div>
    )
}

function SliderControl({ label, value: initialValue = 0, min = -100, max = 100 }: { label: string, value?: number, min?: number, max?: number }) {
    const [value, setValue] = useState(initialValue)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const updateValue = (clientX: number) => {
        if (trackRef.current) {
            const rect = trackRef.current.getBoundingClientRect()
            const x = clientX - rect.left
            const percentage = Math.min(Math.max(x / rect.width, 0), 1)
            const newValue = Math.round(min + percentage * (max - min))
            setValue(newValue)
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        updateValue(e.clientX)
    }

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => {
                e.preventDefault()
                updateValue(e.clientX)
            }
            const handleMouseUp = () => {
                setIsDragging(false)
            }
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, min, max])

    // Calculate width percentage relative to range (0 to 100%)
    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className="space-y-2.5">
            <div className="flex justify-between text-xs select-none">
                <span className="text-white font-medium cursor-default">{label}</span>
                <span className="text-white/60 font-mono tabular-nums w-8 text-right">{value}</span>
            </div>
            <div
                ref={trackRef}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="h-1.5 bg-zinc-800/50 rounded-full w-full cursor-pointer relative touch-none py-1 -my-1 bg-clip-content select-none"
            >
                <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full transition-colors duration-200 ${isDragging || isHovered ? 'bg-white' : 'bg-zinc-600'}`}
                    style={{ width: `${percentage}%`, transition: isDragging ? 'none' : 'width 0.1s ease-out, background-color 0.2s' }}
                >
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 bg-white rounded-full shadow-md transition-all duration-200 ${isDragging || isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                </div>
            </div>
        </div>
    )
}

function ToolButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <div onClick={onClick} className={`flex flex-col items-center gap-1.5 cursor-pointer group w-full py-2 relative`}>
            {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />}
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-black' : 'text-zinc-400 group-hover:bg-white/10 group-hover:text-zinc-100'}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</span>
        </div>
    )
}

function StyleRefCard({ title, image, selected, onClick }: { title: string, image: string, selected?: boolean, onClick?: () => void }) {
    return (
        <div onClick={onClick} className={`relative h-24 w-full rounded-xl overflow-hidden cursor-pointer group transition-all border ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0f0f0f] border-transparent' : 'border-white/5 hover:border-white/20'}`}>
            <Image src={image} alt={title} fill className={`object-cover transition-transform duration-500 ${selected ? 'scale-110' : 'group-hover:scale-110'}`} sizes="280px" />
            <div className={`absolute inset-0 transition-colors ${selected ? 'bg-black/40' : 'bg-gradient-to-t from-black/90 via-black/20 to-transparent'}`} />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white shadow-black/50 drop-shadow-md">{title}</span>
            {selected && (
                <div className="absolute top-2 right-2 h-4 w-4 bg-white rounded-full flex items-center justify-center">
                    <div className="h-1.5 w-1.5 bg-black rounded-full" />
                </div>
            )}
        </div>
    )
}
