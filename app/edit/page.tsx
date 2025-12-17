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
    Type,
    Image as ImageIcon,
    Pencil,
    Crop,
    RotateCw,
    FlipHorizontal,
    FlipVertical,
    Lock,
    User,
    Scan,
    Mountain,
    RotateCcw,
    Sparkles,
    Trash2,
    ChevronDown,
    Zap,
    LayoutTemplate,
    Check,
    ScanFace,
    Monitor,
    Split,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Palette,
    ALargeSmall,
    Spline,
    Ghost,
    Baseline
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
    const fontDropdownRef = useRef<HTMLDivElement>(null)
    const weightDropdownRef = useRef<HTMLDivElement>(null)

    // Font State
    const fonts = ["Inter", "Poppins", "Montserrat", "Roboto", "Playfair Display", "Bebas Neue", "Oswald", "Lato", "DM Sans", "Anton"]
    const weights = ["Thin", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"]
    const [selectedFont, setSelectedFont] = useState("Inter")
    const [selectedWeight, setSelectedWeight] = useState("Regular")
    const [fontSize, setFontSize] = useState("48")
    const [isFontOpen, setIsFontOpen] = useState(false)
    const [isWeightOpen, setIsWeightOpen] = useState(false)

    // Color Picker State
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
    const [colorHex, setColorHex] = useState("#FFFFFF")
    const [colorOpacity, setColorOpacity] = useState(100)
    const [colorHue, setColorHue] = useState(0)
    const [colorSaturation, setColorSaturation] = useState(0)
    const [colorBrightness, setColorBrightness] = useState(100)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
                setIsFontOpen(false)
            }
            if (weightDropdownRef.current && !weightDropdownRef.current.contains(event.target as Node)) {
                setIsWeightOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

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

                {/* Sub-Sidebar / Properties Panel */}
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
                    ) : activeTool === "eraser" ? (
                        <div className="flex flex-col h-full animate-in slide-in-from-left-5 duration-300 fade-in">
                            <div className="p-4 border-b border-white/5">
                                <h2 className="font-medium text-sm text-white">Eraser</h2>
                            </div>
                            <div className="p-4 space-y-6 overflow-y-auto">
                                <AdjustmentSection title="Smart Erase" icon={Eraser}>
                                    <SliderControl label="Brush Size" value={50} min={1} max={100} />
                                    <SliderControl label="Hardness" value={80} min={0} max={100} />
                                    <SliderControl label="Opacity" value={100} min={0} max={100} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Auto Remove" icon={Scan}>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-white/5 border-transparent hover:bg-white/10 hover:text-white text-zinc-400">
                                            <Scan className="h-5 w-5" />
                                            <span className="text-[10px]">Object</span>
                                        </Button>
                                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-white/5 border-transparent hover:bg-white/10 hover:text-white text-zinc-400">
                                            <User className="h-5 w-5" />
                                            <span className="text-[10px]">Person</span>
                                        </Button>
                                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2 bg-white/5 border-transparent hover:bg-white/10 hover:text-white text-zinc-400">
                                            <Mountain className="h-5 w-5" />
                                            <span className="text-[10px]">BG</span>
                                        </Button>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Restore" icon={RotateCcw}>
                                    <SliderControl label="Brush Size" value={40} min={1} max={100} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Presets" icon={Sparkles}>
                                    <div className="space-y-2">
                                        <PresetButton icon={User} label="Remove People" />
                                        <PresetButton icon={Trash2} label="Clean Background" />
                                        <PresetButton icon={Type} label="Remove Text" />
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Advanced" icon={ChevronDown}>
                                    {/* Implied accordion content later, using placeholder or collapsed view */}
                                    {/* User asked to 'add more suitable' here */}
                                    <SliderControl label="Edge Detection" value={50} min={0} max={100} />
                                    <SliderControl label="Feathering" value={10} min={0} max={50} />
                                </AdjustmentSection>
                            </div>
                        </div>
                    ) : activeTool === "upscale" ? (
                        <div className="flex flex-col h-full animate-in slide-in-from-left-5 duration-300 fade-in">
                            <div className="p-4 border-b border-white/5">
                                <h2 className="font-medium text-sm text-white">Upscale</h2>
                            </div>
                            <div className="p-4 space-y-6 overflow-y-auto">

                                <div className="aspect-[3/2] w-full rounded-xl bg-black border border-white/10 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-[#0f0f0f] flex items-center justify-center">
                                        <ImageIcon className="h-8 w-8 text-zinc-700" />
                                    </div>
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/2 h-full border-r border-white/20 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
                                            <span className="text-[10px] font-medium text-white/50 bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">Before</span>
                                        </div>
                                        <div className="w-1/2 h-full flex items-center justify-center">
                                            <span className="text-[10px] font-medium text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">After</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-500/20 text-red-100 text-[10px] font-medium border border-red-500/20">
                                        4×
                                    </div>
                                </div>

                                <AdjustmentSection title="Mode" icon={LayoutTemplate}>
                                    <div className="grid grid-cols-1 gap-2">
                                        <button className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-left transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                                    <Monitor className="h-4 w-4 text-white group-hover:text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-white">Standard</div>
                                                    <div className="text-[10px] text-zinc-500">Fast, balanced quality</div>
                                                </div>
                                            </div>
                                            <div className="h-4 w-4 rounded-full border border-white/10" />
                                        </button>
                                        <button className="flex items-center justify-between p-3 rounded-xl bg-white text-black border border-transparent shadow-lg shadow-white/5 text-left transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-black/5 flex items-center justify-center">
                                                    <Sparkles className="h-4 w-4 text-black" />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium">High Quality</div>
                                                    <div className="text-[10px] text-black/60">Best for photos</div>
                                                </div>
                                            </div>
                                            <div className="h-4 w-4 rounded-full border border-black/20 flex items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-black" />
                                            </div>
                                        </button>
                                        <button className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 text-left transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
                                                    <Zap className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-white flex items-center gap-2">
                                                        Ultra
                                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-200 border border-yellow-500/20">PRO</span>
                                                    </div>
                                                    <div className="text-[10px] text-zinc-500">Maximum detail logic</div>
                                                </div>
                                            </div>
                                            <div className="h-4 w-4 rounded-full border border-white/10" />
                                        </button>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Scale" icon={ImageDown}>
                                    <div className="grid grid-cols-3 gap-2 bg-black/20 p-1 rounded-xl">
                                        <button className="py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">2×</button>
                                        <button className="py-2 text-xs font-medium text-black bg-white rounded-lg shadow-sm">4×</button>
                                        <button className="py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">8×</button>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Enhance" icon={Wand2}>
                                    <div className="space-y-1">
                                        <CheckboxItem label="Details" defaultChecked />
                                        <CheckboxItem label="Noise Reduction" defaultChecked />
                                        <CheckboxItem label="Sharpen" defaultChecked />
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Optimize" icon={ScanFace}>
                                    <div className="space-y-1">
                                        <CheckboxItem label="Face Enhance" defaultChecked />
                                        <CheckboxItem label="Text Clarity" defaultChecked />
                                    </div>
                                </AdjustmentSection>

                                <Button className="w-full h-10 bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5 rounded-full font-medium">
                                    Upscale Image
                                </Button>
                            </div>
                        </div>
                    ) : activeTool === "text" ? (
                        <div className="flex flex-col h-full animate-in slide-in-from-left-5 duration-300 fade-in">
                            <div className="p-4 border-b border-white/5">
                                <h2 className="font-medium text-sm text-white">Text</h2>
                            </div>
                            <div className="p-4 space-y-6 overflow-y-auto">

                                <AdjustmentSection title="Add Text" icon={Type}>
                                    <div className="space-y-2">
                                        <button className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                                            <div className="text-xl font-bold text-white mb-1">Heading</div>
                                            <div className="text-xs text-zinc-500 group-hover:text-zinc-400">Add a title</div>
                                        </button>
                                        <button className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                                            <div className="text-sm font-semibold text-white/90 mb-0.5">Subheading</div>
                                            <div className="text-[10px] text-zinc-500 group-hover:text-zinc-400">Add a subtitle</div>
                                        </button>
                                        <button className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                                            <div className="text-xs text-white/70">Body specific text</div>
                                        </button>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Font" icon={ALargeSmall} className={isFontOpen || isWeightOpen ? "z-50" : ""}>
                                    <div className="space-y-4">
                                        <div className="relative" ref={fontDropdownRef}>
                                            <div
                                                className="p-2 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-black/30"
                                                onClick={() => setIsFontOpen(!isFontOpen)}
                                            >
                                                <span className="text-sm text-white pl-2">{selectedFont}</span>
                                                <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform ${isFontOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                            {isFontOpen && (
                                                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden z-20 max-h-48 overflow-y-auto shadow-xl">
                                                    {fonts.map((font) => (
                                                        <div
                                                            key={font}
                                                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${selectedFont === font ? 'text-white bg-white/5' : 'text-zinc-400'}`}
                                                            onClick={() => {
                                                                setSelectedFont(font)
                                                                setIsFontOpen(false)
                                                            }}
                                                        >
                                                            {font}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3 relative">
                                            <div className="flex-1">
                                                <Input
                                                    className="h-9 bg-black/20 border-white/5 text-white text-center focus:border-white/20"
                                                    value={fontSize}
                                                    onChange={(e) => setFontSize(e.target.value)}
                                                />
                                            </div>

                                            <div className="flex-1 relative" ref={weightDropdownRef}>
                                                <div
                                                    className="h-9 px-2 rounded-xl bg-black/20 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-black/30 gap-2"
                                                    onClick={() => setIsWeightOpen(!isWeightOpen)}
                                                >
                                                    <span className="text-xs text-white truncate">{selectedWeight}</span>
                                                    <ChevronDown className={`h-3 w-3 text-zinc-500 transition-transform ${isWeightOpen ? 'rotate-180' : ''}`} />
                                                </div>
                                                {isWeightOpen && (
                                                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#1c1c1c] border border-white/10 rounded-xl overflow-hidden z-20 max-h-48 overflow-y-auto shadow-xl">
                                                        {weights.map((weight) => (
                                                            <div
                                                                key={weight}
                                                                className={`px-3 py-2 text-xs cursor-pointer hover:bg-white/5 ${selectedWeight === weight ? 'text-white bg-white/5' : 'text-zinc-400'}`}
                                                                onClick={() => {
                                                                    setSelectedWeight(weight)
                                                                    setIsWeightOpen(false)
                                                                }}
                                                            >
                                                                {weight}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Style" icon={Sparkles}>
                                    <div className="flex p-1 bg-black/20 rounded-xl">
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Bold className="h-4 w-4" /></button>
                                        <div className="w-[1px] bg-white/5 my-2" />
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Italic className="h-4 w-4" /></button>
                                        <div className="w-[1px] bg-white/5 my-2" />
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><Underline className="h-4 w-4" /></button>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Color & Effects" icon={Palette}>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-white border border-white/10 cursor-pointer" />
                                            <div className="h-8 w-8 rounded-full bg-red-500 border border-white/10 cursor-pointer ring-2 ring-white/20" />
                                            <div className="h-8 w-8 rounded-full bg-blue-500 border border-white/10 cursor-pointer" />
                                            <div className="h-8 w-8 rounded-full bg-yellow-400 border border-white/10 cursor-pointer" />
                                            <button
                                                className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all ${isColorPickerOpen ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                                            >
                                                <Palette className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {isColorPickerOpen && (
                                            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center text-xs text-zinc-400">
                                                        <span>Color</span>
                                                        <span>Solid</span>
                                                    </div>

                                                    {/* Saturation/Brightness Square (Mock) */}
                                                    <div className="h-32 w-full rounded-lg bg-gradient-to-b from-white to-black relative cursor-crosshair border border-white/10 overflow-hidden" style={{ background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${colorHue}, 100%, 50%))` }}>
                                                        <div className="absolute top-1/3 left-1/2 h-3 w-3 -ml-1.5 -mt-1.5 rounded-full border-2 border-white shadow-sm ring-1 ring-black/20"></div>
                                                    </div>

                                                    {/* Hue Slider */}
                                                    <div className="h-3 w-full rounded-full relative cursor-pointer" style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}>
                                                        <div className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full border border-black/10 shadow-sm" style={{ left: `${(colorHue / 360) * 100}%` }}></div>
                                                    </div>

                                                    {/* Opacity Slider */}
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between text-[10px] text-zinc-500">
                                                            <span>Opacity</span>
                                                            <span>{colorOpacity}%</span>
                                                        </div>
                                                        <div className="h-3 w-full rounded-full bg-[url('https:// Checkerboard_pattern_url_placeholder ')] bg-zinc-800 relative cursor-pointer overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" style={{ opacity: colorOpacity / 100 }}></div>
                                                            <div className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full border border-black/10 shadow-sm" style={{ left: `${colorOpacity}%` }}></div>
                                                        </div>
                                                    </div>

                                                    {/* Hex Input */}
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 bg-black/20 border border-white/10 rounded-lg flex items-center px-2">
                                                            <span className="text-zinc-500 text-xs">#</span>
                                                            <Input
                                                                value={colorHex.replace('#', '')}
                                                                onChange={(e) => setColorHex(`#${e.target.value}`)}
                                                                className="h-7 border-none bg-transparent text-xs text-white focus-visible:ring-0 p-1 uppercase"
                                                            />
                                                        </div>
                                                        <div className="w-[30%] bg-black/20 border border-white/10 rounded-lg flex items-center justify-center">
                                                            <div className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: colorHex }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            <CheckboxItem label="Shadow" />
                                            <CheckboxItem label="Outline" />
                                        </div>
                                    </div>
                                </AdjustmentSection>

                                <AdjustmentSection title="Spacing" icon={Baseline}>
                                    <SliderControl label="Line Height" value={1.2} min={0.5} max={3} />
                                    <SliderControl label="Letter Spacing" value={0} min={-10} max={20} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Layout" icon={LayoutTemplate}>
                                    <div className="flex p-1 bg-black/20 rounded-xl mb-4">
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg bg-white/10 text-white transition-colors"><AlignLeft className="h-4 w-4" /></button>
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><AlignCenter className="h-4 w-4" /></button>
                                        <button className="flex-1 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><AlignRight className="h-4 w-4" /></button>
                                    </div>
                                    <SliderControl label="Rotate" value={0} min={-180} max={180} />
                                    <SliderControl label="Curve" value={0} min={-100} max={100} />
                                </AdjustmentSection>

                                <AdjustmentSection title="Presets" icon={Sparkles}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-center font-bold text-white uppercase tracking-widest flex items-center justify-center">Poster</button>
                                        <button className="h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-center font-black text-white stroke-black flex items-center justify-center" style={{ textShadow: '2px 2px 0 #000' }}>MEME</button>
                                        <button className="h-12 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-center font-medium text-yellow-300 bg-black/50 flex items-center justify-center">Subtitle</button>
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

function AdjustmentSection({ title, children, icon: Icon, className = "" }: { title: string, children: React.ReactNode, icon?: React.ElementType, className?: string }) {
    return (
        <div className={`space-y-3 relative ${className || 'z-10'}`}>
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

    // Calculate width percentage relative to range
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
                    <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 h-3.5 w-3.5 bg-white rounded-full shadow-md transition-all duration-200 ${isDragging || isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
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

function PresetButton({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">{label}</span>
            </div>
            <div className="h-6 w-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-1.5 w-1.5 bg-white rounded-full gap-1" />
            </div>
        </div>
    )
}

function CheckboxItem({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
    const [checked, setChecked] = useState(defaultChecked || false)
    return (
        <div
            onClick={() => setChecked(!checked)}
            className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group"
        >
            <span className={`text-xs font-medium transition-colors ${checked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>{label}</span>
            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/40'}`}>
                {checked && <Check className="h-3 w-3 text-black" />}
            </div>
        </div>
    )
}

function ColorPicker({
    hue, setHue,
    saturation, setSaturation,
    brightness, setBrightness,
    opacity, setOpacity,
    hex, setHex
}: {
    hue: number, setHue: (v: number) => void,
    saturation: number, setSaturation: (v: number) => void,
    brightness: number, setBrightness: (v: number) => void,
    opacity: number, setOpacity: (v: number) => void,
    hex: string, setHex: (v: string) => void
}) {
    const satBoxRef = useRef<HTMLDivElement>(null)
    const hueSliderRef = useRef<HTMLDivElement>(null)
    const opacitySliderRef = useRef<HTMLDivElement>(null)
    const [isDraggingSat, setIsDraggingSat] = useState(false)
    const [isDraggingHue, setIsDraggingHue] = useState(false)
    const [isDraggingOpacity, setIsDraggingOpacity] = useState(false)

    const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };

    const updateColor = (h: number, s: number, b: number) => {
        const newHex = hslToHex(h, s, b);
        setHex(newHex);
    }

    const handleSatMouseDown = (e: React.MouseEvent) => {
        setIsDraggingSat(true)
        updateSat(e.clientX, e.clientY)
    }

    const updateSat = (clientX: number, clientY: number) => {
        if (satBoxRef.current) {
            const rect = satBoxRef.current.getBoundingClientRect();
            const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
            const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
            const newSat = (x / rect.width) * 100;
            const newBright = 100 - ((y / rect.height) * 100);
            setSaturation(newSat);
            setBrightness(newBright);
            updateColor(hue, newSat, newBright);
        }
    }

    const handleHueMouseDown = (e: React.MouseEvent) => {
        setIsDraggingHue(true)
        updateHue(e.clientX)
    }

    const updateHue = (clientX: number) => {
        if (hueSliderRef.current) {
            const rect = hueSliderRef.current.getBoundingClientRect();
            const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
            const newHue = (x / rect.width) * 360;
            setHue(newHue);
            updateColor(newHue, saturation, brightness);
        }
    }

    const handleOpacityMouseDown = (e: React.MouseEvent) => {
        setIsDraggingOpacity(true)
        updateOpacity(e.clientX)
    }

    const updateOpacity = (clientX: number) => {
        if (opacitySliderRef.current) {
            const rect = opacitySliderRef.current.getBoundingClientRect();
            const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
            const newOpacity = Math.round((x / rect.width) * 100);
            setOpacity(newOpacity);
        }
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSat) updateSat(e.clientX, e.clientY);
            if (isDraggingHue) updateHue(e.clientX);
            if (isDraggingOpacity) updateOpacity(e.clientX);
        }
        const handleMouseUp = () => {
            setIsDraggingSat(false)
            setIsDraggingHue(false)
            setIsDraggingOpacity(false)
        }
        if (isDraggingSat || isDraggingHue || isDraggingOpacity) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDraggingSat, isDraggingHue, isDraggingOpacity])

    return (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>Color</span>
                    <span>Solid</span>
                </div>

                {/* Saturation/Brightness Square */}
                <div
                    ref={satBoxRef}
                    onMouseDown={handleSatMouseDown}
                    className="h-32 w-full rounded-lg bg-gradient-to-b from-white to-black relative cursor-crosshair border border-white/10 overflow-hidden touch-none"
                    style={{ background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))` }}
                >
                    <div
                        className="absolute w-3 h-3 rounded-full border-2 border-white shadow-sm ring-1 ring-black/20 -ml-1.5 -mt-1.5 pointer-events-none"
                        style={{ left: `${saturation}%`, top: `${100 - brightness}%` }}
                    />
                </div>

                {/* Hue Slider */}
                <div
                    ref={hueSliderRef}
                    onMouseDown={handleHueMouseDown}
                    className="h-3 w-full rounded-full relative cursor-pointer touch-none"
                    style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
                >
                    <div
                        className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full border border-black/10 shadow-sm pointer-events-none"
                        style={{ left: `${(hue / 360) * 100}%` }}
                    />
                </div>

                {/* Opacity Slider */}
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Opacity</span>
                        <span>{opacity}%</span>
                    </div>
                    <div
                        ref={opacitySliderRef}
                        onMouseDown={handleOpacityMouseDown}
                        className="h-3 w-full rounded-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2nk5+d/D8R0QA8DmHg0gGhg0AA0wGgA0ACjAUADjAYADTAaADTAaACBAACWewEE/p7A7AAAAABJRU5ErkJggg==')] bg-zinc-800 relative cursor-pointer overflow-hidden touch-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" style={{ opacity: opacity / 100 }}></div>
                        <div
                            className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-white rounded-full border border-black/10 shadow-sm pointer-events-none"
                            style={{ left: `${opacity}%` }}
                        />
                    </div>
                </div>

                {/* Hex Input */}
                <div className="flex gap-2">
                    <div className="flex-1 bg-black/20 border border-white/10 rounded-lg flex items-center px-2">
                        <span className="text-zinc-500 text-xs">#</span>
                        <Input
                            value={hex.replace('#', '')}
                            onChange={(e) => setHex(`#${e.target.value}`)}
                            className="h-7 border-none bg-transparent text-xs text-white focus-visible:ring-0 p-1 uppercase opacity-100"
                        />
                    </div>
                    <div className="w-[30%] bg-black/20 border border-white/10 rounded-lg flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full border border-white/10" style={{ backgroundColor: hex, opacity: opacity / 100 }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
