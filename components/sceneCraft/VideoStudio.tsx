"use client"

import React from "react"
import { motion } from "framer-motion"
import { Play } from "lucide-react"

export default function VideoStudio({ prompt, isGenerating }: { prompt: string, isGenerating?: boolean }) {
    return (
        <div className="flex-1 w-full h-full bg-[#080808] relative flex items-center justify-center overflow-hidden">
            {/* Infinite Grid Background */}
            <div className="absolute inset-0 z-0 bg-grid-zinc-900/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
                style={{
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    opacity: 0.2
                }}
            />

            {/* Viewport Frame */}
            <div className="relative z-10 w-[80%] aspect-video bg-black shadow-2xl border border-[#333] group">
                {/* Resolution overlay */}
                <div className="absolute -top-6 left-0 text-[10px] text-zinc-500 font-mono">1920 x 1080 • 24 FPS</div>

                <div className="absolute inset-0 flex items-center justify-center">
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                            <p className="text-xs text-indigo-400 font-mono animate-pulse">RENDERING_SCENE_001...</p>
                        </div>
                    ) : (
                        <div className="text-center group-hover:scale-110 transition-transform duration-300">
                            {prompt ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-600/50 flex items-center justify-center mb-2">
                                        <Play className="w-6 h-6 text-indigo-400 fill-current ml-1" />
                                    </div>
                                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Ready to Play</p>
                                </div>
                            ) : (
                                <p className="text-zinc-700 text-xs font-mono">NO ACTIVE SOURCE</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Guides */}
                <div className="absolute inset-0 border-2 border-indigo-500/0 group-hover:border-indigo-500/30 transition-colors pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-px bg-indigo-500/50" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-px bg-indigo-500/50" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-indigo-500/50" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-px bg-indigo-500/50" />
                </div>
            </div>

            {/* Viewport Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#222] border border-[#333] rounded-md px-4 py-1.5 flex items-center gap-4 text-zinc-400 shadow-lg">
                <span className="text-[10px] font-mono hover:text-white cursor-pointer select-none">100%</span>
                <div className="h-3 w-px bg-[#444]" />
                <span className="text-[10px] font-mono hover:text-white cursor-pointer select-none">00:00:00</span>
            </div>
        </div>
    )
}
