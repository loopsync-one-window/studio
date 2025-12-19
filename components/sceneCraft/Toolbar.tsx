"use client"

import React from "react"
import { MousePointer2, Hand, Move, Type, PenTool, Image as ImageIcon, Video, BoxSelect, ZoomIn, Expand, Download, LucideAArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Toolbar({ activeTool, setActiveTool, onMenuClick }: { activeTool: string, setActiveTool: (t: string) => void, onMenuClick?: (menu: string) => void }) {
    const tools = [
        { id: "select", icon: MousePointer2, label: "Select (V)" },
        { id: "hand", icon: Hand, label: "Hand (H)" },
        { id: "move", icon: Move, label: "Move (M)" },
        { separator: true },
        { id: "text", icon: Type, label: "Text (T)" },
        { id: "pen", icon: PenTool, label: "Pen (P)" },
        { id: "image", icon: ImageIcon, label: "Image (I)" },
        { id: "video", icon: Video, label: "Video (Shift+V)" },
        { separator: true },
        { id: "frame", icon: BoxSelect, label: "Frame (F)" },
        { id: "zoom", icon: ZoomIn, label: "Zoom (Z)" },
    ]

    return (
        <div className="h-13 border-b border-white/5 bg-[#000000] flex items-center justify-between px-4 select-none z-50">
            {/* Left: App Logo/Menu */}
            <div className="flex items-center gap-6">


                <div className="hidden lg:flex items-center gap-4 text-xs text-zinc-400 font-medium">
                    <button className="hover:text-white transition-colors" onClick={() => onMenuClick?.('file')}>File</button>
                    <button className="hover:text-white transition-colors" onClick={() => onMenuClick?.('edit')}>Edit</button>
                    <button className="hover:text-white transition-colors" onClick={() => onMenuClick?.('view')}>View</button>
                    <button className="text-zinc-100 font-semibold bg-white/10 px-2 py-0.5 rounded transition-colors" onClick={() => onMenuClick?.('characters')}>Characters</button>
                    <button className="hover:text-white transition-colors" onClick={() => onMenuClick?.('window')}>Window</button>
                    <button className="hover:text-white transition-colors" onClick={() => onMenuClick?.('help')}>Help</button>
                </div>
            </div>

            {/* Center: Tools */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-[#000000] rounded-lg p-0.5 border border-white/10">
                {tools.map((tool, idx) => (
                    tool.separator ? (
                        <div key={`sep-${idx}`} className="w-px h-4 bg-[#444] mx-1.5" />
                    ) : (
                        <button
                            key={tool.id}
                            onClick={() => tool.id && setActiveTool(tool.id)}
                            className={cn(
                                "p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all relative block",
                                activeTool === tool.id && "bg-indigo-600 text-white hover:bg-indigo-600 shadow-sm"
                            )}
                            title={tool.label}
                        >
                            {tool.icon && <tool.icon className="w-4 h-4" />}
                        </button>
                    )
                ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <button className="bg-indigo-700 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors">
                    Export
                </button>
                <div className="h-4 w-px bg-[#333] mx-1" />
                <button className="bg-indigo-700 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 rounded-sm transition-colors">
                    Download Script
                </button>
            </div>
        </div>
    )
}
