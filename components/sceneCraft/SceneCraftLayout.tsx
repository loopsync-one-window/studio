"use client"

import React, { useState, useRef, useEffect } from "react"
import { Eye, Lock, Video, Volume2, Layers, GripHorizontal } from "lucide-react"
import Toolbar from "./Toolbar"
import Sidebar from "./Sidebar"
import Inspector from "./Inspector"
import ScriptWriter from "./ScriptWriter"
import VideoStudio from "./VideoStudio"
import CharacterManager from "./CharacterManager"

export default function SceneCraftLayout() {
    const [viewMode, setViewMode] = useState<'editor' | 'characters'>('editor')
    const [activeTool, setActiveTool] = useState("select")
    const [selectedNode, setSelectedNode] = useState<{ id: string, type: "script" | "video" | null }>({ id: "sc-01", type: "script" })

    const handleMenuClick = (menu: string) => {
        if (menu === 'characters') setViewMode('characters')
        else setViewMode('editor')
    }

    // Timeline Resize Logic
    const [timelineHeight, setTimelineHeight] = useState(240)
    const isResizing = useRef(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing.current) return

            // Calculate height from bottom of screen
            const newHeight = window.innerHeight - e.clientY

            if (newHeight >= 240 && newHeight <= 500) {
                setTimelineHeight(newHeight)
            } else if (newHeight < 240) {
                setTimelineHeight(240)
            } else if (newHeight > 500) {
                setTimelineHeight(500)
            }
        }

        const handleMouseUp = () => {
            isResizing.current = false
            document.body.style.cursor = 'default'
            document.body.style.userSelect = 'auto'
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    const startResizing = (e: React.MouseEvent) => {
        isResizing.current = true
        document.body.style.cursor = 'row-resize'
        document.body.style.userSelect = 'none'
    }

    // Data State (Mock Database)
    const [scriptData, setScriptData] = useState({
        id: "sc-01",
        title: "EPISODE 1: AWAKENING",
        genre: "Sci-Fi Thriller",
        characters: "JAX, 30s; MIRA, 20s",
        plot: "A dormant AI wakes up in a facility abandoned for decades."
    })

    const [videoData, setVideoData] = useState({
        id: "vid-01",
        prompt: "Cinematic shot, wide angle, abandoned sci-fi corridor, flickering lights, volumetric fog, 8k, unreal engine 5 render",
        duration: 5,
        fps: 24,
        isGenerating: false
    })

    // Derived Script Content for Preview
    const scriptContent = `TITLE: ${scriptData.title}\n\nINT. DARK ROOM - NIGHT\n\nThe room is dimly lit. ${scriptData.characters} stand in the center.\n\nCHARACTER 1\nWe have to do this now.\n\n${scriptData.plot}\n\n[SCENE END]`

    const handleSelection = (node: any) => {
        setSelectedNode({
            id: node.id,
            type: node.type === 'script' ? 'script' : node.type === 'scene' ? 'video' : null
        })
    }

    const handleDataChange = (key: string, value: any) => {
        if (selectedNode.type === 'script') {
            setScriptData(prev => ({ ...prev, [key]: value }))
        } else if (selectedNode.type === 'video') {
            if (key === 'generate') {
                setVideoData(prev => ({ ...prev, isGenerating: true }))
                setTimeout(() => setVideoData(prev => ({ ...prev, isGenerating: false })), 3000)
            } else {
                setVideoData(prev => ({ ...prev, [key]: value }))
            }
        }
    }

    return (
        <div className="flex flex-col h-screen w-full bg-[#09090b] text-zinc-300 font-sans overflow-hidden z-50">
            {/* Top Toolbar */}
            <Toolbar
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                onMenuClick={handleMenuClick}
            />

            {/* Main Workspace Grid */}
            {viewMode === 'characters' ? (
                <CharacterManager />
            ) : (
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Asset Browser */}
                    <Sidebar activeNodeId={selectedNode.id} onSelect={handleSelection} />

                    {/* Center: Viewport */}
                    <div className="flex-1 bg-[#000000] relative flex flex-col min-w-0">
                        {/* Tabs / Breadcrumbs */}
                        <div className="h-10 bg-[#000000] border-b border-white/5 flex items-center px-4 gap-2 text-xs">
                            <span className="text-zinc-500">Project: Dark Matter</span>
                            <span className="text-zinc-600">/</span>
                            <span className="text-zinc-100 font-medium">{selectedNode.type === 'script' ? scriptData.title : 'Scene View'}</span>
                            {selectedNode.type === 'script' && <span className="ml-auto text-[10px] text-zinc-500">Auto-saved 2m ago</span>}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 relative overflow-hidden">
                            {selectedNode.type === 'script' ? (
                                <ScriptWriter script={scriptContent} />
                            ) : selectedNode.type === 'video' ? (
                                <VideoStudio prompt={videoData.prompt} isGenerating={videoData.isGenerating} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600">Select an item to view</div>
                            )}
                        </div>

                        {/* Bottom Timeline Bar (Shared) */}
                        {selectedNode.type !== 'script' && (
                            <div
                                className="bg-[#000000] border-t border-white/5 flex flex-col relative"
                                style={{ height: timelineHeight }}
                            >
                                {/* Resize Handle */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 cursor-row-resize z-50 hover:bg-indigo-500/50 transition-colors"
                                    onMouseDown={startResizing}
                                />

                                {/* Timeline Header */}
                                <div className="h-7 border-b border-white/5 flex items-center px-2 justify-between text-[10px] select-none">
                                    <div className="flex gap-4">
                                        <span className="text-zinc-400 hover:text-white cursor-pointer">Timeline uses local time</span>
                                    </div>
                                    <div className="flex gap-2 text-zinc-500">
                                        <span>Start: 00:00:00</span>
                                        <span>End: 00:05:00</span>
                                    </div>
                                </div>
                                {/* Timeline Tracks Placeholder */}
                                <div className="flex-1 relative bg-[#090909] overflow-hidden flex">
                                    {/* Track Headers (Left) */}
                                    <div className="w-56 border-r border-white/5 bg-[#141414] flex flex-col z-20">
                                        {/* Video Track V1 */}
                                        <div className="h-10 border-b border-white/5 flex items-center px-2 gap-3 bg-[#18181b] group relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/50" />
                                            <div className="flex gap-1 text-zinc-500">
                                                <div className="p-1 rounded hover:bg-white/10 cursor-pointer hover:text-zinc-200 transition-colors">
                                                    <Eye className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="p-1 rounded hover:bg-white/10 cursor-pointer hover:text-zinc-200 transition-colors">
                                                    <Lock className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="text-[10px] font-bold text-indigo-400 select-none leading-none mb-0.5">V1</span>
                                                <span className="text-[9px] text-zinc-500 leading-none truncate w-16">Main Cam</span>
                                            </div>
                                            <div className="flex gap-0.5">
                                                <div className="w-4 h-4 rounded-sm border border-white/5 bg-black/20 flex items-center justify-center text-[8px] text-zinc-500 cursor-pointer hover:text-white">
                                                    <Layers className="w-2.5 h-2.5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Audio Track A1 */}
                                        <div className="h-10 border-b border-white/5 flex items-center px-2 gap-3 bg-[#18181b] group relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50" />
                                            <div className="flex gap-1 text-zinc-500">
                                                <div className="p-1 rounded hover:bg-white/10 cursor-pointer hover:text-zinc-200 transition-colors">
                                                    <Volume2 className="w-3.5 h-3.5" />
                                                </div>
                                                <div className="p-1 rounded hover:bg-white/10 cursor-pointer hover:text-zinc-200 transition-colors">
                                                    <Lock className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="text-[10px] font-bold text-emerald-400 select-none leading-none mb-0.5">A1</span>
                                                <span className="text-[9px] text-zinc-500 leading-none truncate w-16">Dialogue</span>
                                            </div>
                                            <div className="flex gap-1 ml-auto">
                                                <button className="w-4 h-4 rounded-sm bg-[#111] border border-white/5 text-[8px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-emerald-500/80 transition-colors">M</button>
                                                <button className="w-4 h-4 rounded-sm bg-[#111] border border-white/5 text-[8px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-yellow-500/80 transition-colors">S</button>
                                            </div>
                                        </div>

                                        {/* Empty Space */}
                                        <div className="flex-1 bg-[#121212] opacity-100" />
                                    </div>

                                    {/* Timeline Content (Right) */}
                                    <div className="flex-1 relative bg-[#090909]">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDBMMCAwTDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-[0.03] pointer-events-none" />

                                        {/* Grid Lines Overlay */}
                                        <div className="absolute inset-0 pointer-events-none flex">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className="flex-1 border-r border-white/5 h-full last:border-0" />
                                            ))}
                                        </div>

                                        {/* Clip Segment V1 */}
                                        <div className="absolute top-1 left-2 w-72 h-8 bg-indigo-900/80 border border-indigo-500/50 rounded-sm cursor-pointer hover:bg-indigo-800 transition-colors group overflow-hidden shadow-sm">
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-transparent" />
                                            <div className="h-full w-full flex items-center px-2 text-[10px] text-indigo-100 font-medium truncate relative z-10 gap-2">
                                                <div className="w-6 h-6 bg-black/40 rounded-sm overflow-hidden flex items-center justify-center shrink-0 text-indigo-300">
                                                    <Video className="w-3 h-3" />
                                                </div>
                                                <span className="truncate drop-shadow-md">SC_01_Main_Camera_Take_04.mp4</span>
                                            </div>
                                        </div>

                                        {/* Clip Segment A1 */}
                                        <div className="absolute top-[41px] left-2 w-72 h-8 bg-emerald-900/80 border border-emerald-500/50 rounded-sm cursor-pointer hover:bg-emerald-800 transition-colors group overflow-hidden shadow-sm">
                                            {/* Fake Waveform */}
                                            <div className="absolute inset-0 flex items-center gap-[1px] opacity-40 px-1 overflow-hidden">
                                                {[...Array(60)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-1 bg-emerald-300 rounded-full"
                                                        style={{ height: `${20 + Math.random() * 60}%` }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
                                            <div className="h-full w-full flex items-center px-2 text-[10px] text-emerald-100 font-medium truncate relative z-10">
                                                <span className="truncate drop-shadow-md">Audio_Track_01.wav</span>
                                            </div>
                                        </div>

                                        {/* Playhead */}
                                        <div className="absolute top-0 left-32 w-[1px] h-full bg-red-500/80 z-30 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                            <div className="absolute -top-[13px] -left-[5px]">
                                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500 filter drop-shadow-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Inspector */}
                    <Inspector
                        type={selectedNode.type === 'script' ? 'script' : selectedNode.type === 'video' ? 'video' : 'none'}
                        data={selectedNode.type === 'script' ? scriptData : videoData}
                        bgClass="bg-[#000000]"
                        onChange={handleDataChange}
                    />
                </div>
            )}

            {/* Footer Status Bar */}
            <div className="h-10 bg-[#000000] border-t border-white/5 text-zinc-400 flex items-center px-2 text-[10px] justify-between select-none">
                <div className="flex gap-4">
                    <span>SYSTEM : <span className="text-white font-semibold">OK</span></span>
                    <span>MASTER BRANCH *</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-white font-semibold">PRODUCTION</span>
                    <span>Ln 14, Col 52</span>
                </div>
            </div>
        </div>
    )
}
