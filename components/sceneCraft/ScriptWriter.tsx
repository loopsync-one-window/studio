"use client"

import React from "react"
import { motion } from "framer-motion"

export default function ScriptWriter({ script, isGenerating }: { script: string, isGenerating?: boolean }) {
    return (
        <div className="flex-1 w-full h-full bg-[#080808] relative overflow-hidden flex justify-center py-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">

            {/* Paper Container */}
            <div className="w-[8.5in] h-full shadow-2xl bg-transparent relative flex flex-col shrink-0 overflow-hidden">
                {/* Header / Watermark */}
                <div className="absolute top-4 right-6 text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
                    SceneCraft Draft v0.1
                </div>

                <div className="flex-1 p-[1in] font-mono text-sm leading-relaxed text-[#ffffff] overflow-y-auto custom-scrollbar selection:bg-yellow-200 selection:text-black">
                    {script ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="whitespace-pre-wrap max-w-3xl font-courier"
                            style={{ fontFamily: '"Courier Prime", "Courier New", monospace' }}
                        >
                            {script}
                        </motion.div>
                    ) : (
                        <div className="h-full flex items-center justify-center opacity-30 select-none">
                            <span className="text-4xl text-black font-bold rotate-[-15deg] border-4 border-black p-4 rounded-xl">DRAFT</span>
                        </div>
                    )}
                </div>

                {/* Page Footer */}
                <div className="h-8 border-t border-white/5 flex items-center justify-between px-6 text-[10px] text-zinc-500 font-sans">
                    <span>Page 1</span>
                    <span>Scene 3/14</span>
                </div>
            </div>
        </div>
    )
}
