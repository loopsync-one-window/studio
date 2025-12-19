"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sliders, AlignLeft, Type, Clock, Film, Hash, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface InspectorProps {
    type: "script" | "video" | "none"
    data: any
    bgClass: string
    onChange: (key: string, value: any) => void
}

export default function Inspector({ type, data, onChange, bgClass }: InspectorProps) {
    if (type === "none") {
        return (
            <div className={`h-full border-l border-white/5 ${bgClass} flex flex-col p-4 text-center items-center justify-center text-zinc-500 text-xs`}>
                <p>No element selected</p>
            </div>
        )
    }

    return (
        <div className={`h-full border-l border-white/5 ${bgClass} flex flex-col w-[300px] shrink-0 overflow-y-auto custom-scrollbar`}>
            {/* Inspector Header */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between">
                <span className="text-xs font-bold text-zinc-100 uppercase tracking-wide">
                    {type === 'script' ? 'Script Properties' : 'Scene Properties'}
                </span>
                <Sliders className="w-3.5 h-3.5 text-zinc-500" />
            </div>

            {type === "script" && (
                <div className="p-4 space-y-6">
                    {/* Section: Metadata */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <Hash className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Metadata</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                            <Label className="text-[10px] text-zinc-500">TITLE</Label>
                            <Input
                                value={data.title}
                                onChange={(e) => onChange('title', e.target.value)}
                                className="h-7 text-xs bg-[#222] border-[#ffffff]/5 text-zinc-200 focus:border-indigo-500 px-2 rounded-sm"
                            />
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                            <Label className="text-[10px] text-zinc-500">GENRE</Label>
                            <Input
                                value={data.genre}
                                onChange={(e) => onChange('genre', e.target.value)}
                                className="h-7 text-xs bg-[#222] border-white/5 text-zinc-200 focus:border-indigo-500 px-2 rounded-sm"
                            />
                        </div>
                    </div>

                    {/* Section: Content */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <Type className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Content</span>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-zinc-500">KEY CHARACTERS</Label>
                            <Input
                                value={data.characters}
                                onChange={(e) => onChange('characters', e.target.value)}
                                className="h-7 text-xs bg-[#222] border-white/5 text-zinc-200 focus:border-indigo-500 px-2 rounded-sm"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-zinc-500">PLOT OUTLINE</Label>
                            <textarea
                                value={data.plot}
                                onChange={(e) => onChange('plot', e.target.value)}
                                className="w-full h-32 bg-transparent mt-0 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 resize-none"
                                placeholder="Make this look like a cinematic movie poster with dark lighting..."
                            />
                        </div>
                    </div>

                    {/* Section: Typography (Visual) */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <AlignLeft className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Format</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-transparent border border-white/10 rounded-full p-2 text-center text-xs text-white cursor-pointer hover:bg-[#ffffff]/5">Courier</div>
                            <div className="bg-transparent border border-white/10 rounded-full p-2 text-center text-xs text-white cursor-pointer hover:bg-[#ffffff]/5">12pt</div>
                        </div>
                    </div>
                </div>
            )}

            {type === "video" && (
                <div className="p-4 space-y-6">
                    {/* Section: Prompt */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <Film className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Scene Description</span>
                        </div>
                        <textarea
                            value={data.prompt}
                            onChange={(e) => onChange('prompt', e.target.value)}
                            className="w-full h-32 bg-transparent mt-0 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 resize-none"
                            placeholder="Describe the scene..."
                        />
                        <Button
                            onClick={() => onChange('generate', true)}
                            className="w-full h-8 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                        >
                            Start Rendering
                        </Button>
                    </div>

                    {/* Section: Camera/Settings */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <Layers className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Camera & Render</span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                            <Label className="text-[10px] text-zinc-500">ASPECT RATIO</Label>
                            <Select defaultValue="16:9">
                                <SelectTrigger className="h-7 text-xs bg-[#121212] border border-white/10 text-zinc-200 rounded-sm w-full focus:ring-1 focus:ring-white/10 hover:bg-[#1A1A1A] transition-colors">
                                    <SelectValue placeholder="Select ratio" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121212] border border-white/10 text-zinc-200 dark">
                                    <SelectItem value="16:9" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">16:9 Widescreen</SelectItem>
                                    <SelectItem value="2.39:1" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">2.39:1 Cinema</SelectItem>
                                    <SelectItem value="9:16" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">9:16 Vertical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2 items-center">
                            <Label className="text-[10px] text-zinc-500">RESOLUTION</Label>
                            <Select defaultValue="1080p">
                                <SelectTrigger className="h-7 text-xs bg-[#121212] border border-white/10 text-zinc-200 rounded-sm w-full focus:ring-1 focus:ring-white/10 hover:bg-[#1A1A1A] transition-colors">
                                    <SelectValue placeholder="Select quality" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#121212] border border-white/10 text-zinc-200 dark">
                                    <SelectItem value="1080p" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">1080p HD</SelectItem>
                                    <SelectItem value="4k" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">4K Ultra HD</SelectItem>
                                    <SelectItem value="8k" className="text-xs hover:bg-[#222] focus:bg-[#222] cursor-pointer">8K Raw</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Section: Timing */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold">Timing</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <Label className="text-[10px] text-zinc-500 block mb-1">DURATION (S)</Label>
                                <Input type="number" defaultValue={5} className="h-7 text-xs bg-[#222] border-white/5 text-zinc-200" />
                            </div>
                            <div className="flex-1">
                                <Label className="text-[10px] text-zinc-500 block mb-1">FPS</Label>
                                <Input type="number" defaultValue={24} className="h-7 text-xs bg-[#222] border-white/5 text-zinc-200" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
