"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Filter, Play, Image as ImageIcon, Music, LayoutTemplate, MoreHorizontal, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const CATEGORIES = [
    { id: "all", label: "All", icon: null },
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "videos", label: "Videos", icon: Play },
    { id: "photos", label: "Photos", icon: ImageIcon },
    { id: "audio", label: "Audio", icon: Music },
]

// Helper to generate meaningful mock data
const generateMockData = (count: number) => {
    const types = ["template", "video", "photo", "audio", "doc"] as const
    const categories = ["Presentation", "Social Media", "Video", "Print", "Marketing", "Corporate", "Creative"]
    const colors = [
        "bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-rose-600", "bg-orange-600",
        "bg-zinc-600", "bg-indigo-600", "bg-pink-600", "bg-cyan-600", "bg-fuchsia-600",
        "bg-teal-600", "bg-red-600", "bg-violet-600", "bg-sky-600", "bg-lime-600"
    ]
    const titles = [
        "Modern Business Pitch", "Cinematic Travel", "Abstract 3D Shape", "Instagram Sale Story",
        "Product Showcase", "Minimalist Workspace", "Event Flyer", "Upbeat Corporate",
        "YouTube Thumbnail", "Neon City", "Tech Transition", "Monthly Planner",
        "Q4 Report", "Social Media Kit", "Brand Guidelines", "Website Mockup",
        "Podcast Cover", "Email Newsletter", "Resume Template", "Logo Animation"
    ]

    // Aspect ratios for masonry (width, height)
    const ratios = [
        { w: 1600, h: 900 },  // 16:9 Landscape
        { w: 1080, h: 1920 }, // 9:16 Portrait (Stories/Shorts)
        { w: 1080, h: 1080 }, // 1:1 Square
        { w: 1200, h: 1600 }, // 3:4 Vertical
        { w: 1600, h: 1200 }, // 4:3 Landscape
        { w: 2000, h: 1000 }, // 2:1 Wide
    ]

    return Array.from({ length: count }).map((_, i) => {
        // Use deterministic pseudo-random based on index to avoid hydration mismatch
        const typeIndex = (i * 7) % types.length
        const ratioIndex = (i * 3) % ratios.length
        const titleIndex = (i * 5) % titles.length
        const catIndex = (i * 11) % categories.length
        const colorIndex = (i * 13) % colors.length

        const type = types[typeIndex]
        const ratio = ratios[ratioIndex]
        // Force audio items to have a specific small horizontal banner ratio
        const dimensions = type === 'audio' ? { w: 600, h: 150 } : ratio

        return {
            id: i + 1,
            type,
            title: `${titles[titleIndex]} ${(i * 17) % 100}`,
            category: categories[catIndex],
            w: dimensions.w,
            h: dimensions.h,
            color: colors[colorIndex]
        }
    })
}

const MOCK_RESULTS = generateMockData(120)

export default function Page() {
    const [activeTab, setActiveTab] = useState("all")

    const filteredResults = activeTab === "all"
        ? MOCK_RESULTS
        : MOCK_RESULTS.filter(item => item.type.includes(activeTab.replace("s", "")))

    return (
        <div className="flex-1 h-full w-full overflow-y-auto bg-[#0a0a0a]">
            <div className="max-w-[1800px] w-full mx-auto px-6 py-10 lg:px-10 space-y-12">

                {/* Scrollable Header Section */}
                <header className="flex flex-col items-center justify-center gap-8 pt-10 pb-4 relative">
                    {/* Floating Sidebar Trigger for Mobile */}
                    <div className="absolute left-0 top-10 md:hidden">
                        <SidebarTrigger />
                    </div>

                    <div className="w-full max-w-3xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2">
                            Find your inspiration
                        </h1>

                        {/* Enhanced Search Input */}
                        <div className="relative group mx-auto w-full transition-all duration-300 transform hover:scale-[1.01] mt-10">
                            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-white transition-colors z-20">
                                <Search className="h-6 w-6" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search library..."
                                className="relative z-10 w-full bg-[#1c1c1c]/80 backdrop-blur-sm border border-white/10 hover:border-white/20 focus:border-white/30 h-[80px] pl-16 pr-20 rounded-[2rem] text-2xl text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all shadow-2xl shadow-black/50"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                                <Button size="icon" variant="ghost" className="h-10 w-10 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-all">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 pt-2 scrollbar-hide w-full max-w-4xl mx-auto mask-linear-fade">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon
                                const isActive = activeTab === cat.id
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        className={cn(
                                            "flex items-center gap-2.5 px-6 py-3 rounded-full text-base font-medium transition-all border whitespace-nowrap",
                                            isActive
                                                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105"
                                                : "bg-[#1c1c1c] text-zinc-400 border-white/5 hover:bg-[#2a2a2a] hover:text-white hover:border-white/10 hover:scale-105"
                                        )}
                                    >
                                        {Icon && <Icon className="h-4 w-4" />}
                                        {cat.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </header>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6 pb-20">
                    {filteredResults.map((item, index) => (
                        <div key={item.id} className="break-inside-avoid relative group cursor-pointer mb-6 transform transition-all hover:z-10 animate-in fade-in zoom-in-95 duration-300 fill-mode-both" style={{ animationDelay: `${index * 20}ms` }}>
                            <div
                                className={cn(
                                    "rounded-3xl overflow-hidden border border-white/5 bg-[#121212] transition-all duration-300 group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]",
                                    "relative"
                                )}
                                style={{ aspectRatio: item.type === 'audio' ? 'auto' : `${item.w} / ${item.h}` }}
                            >
                                {item.type === 'audio' ? (
                                    <div className={`p-4 flex flex-col justify-between h-full ${item.color} bg-opacity-10`} style={{ minHeight: '160px' }}>
                                        <div className="flex items-start justify-between">
                                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                                <Music className="h-5 w-5" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                                <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-1 h-8 opacity-50">
                                                {Array.from({ length: 12 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-1 bg-white rounded-full transition-all duration-300 group-hover:h-full"
                                                        style={{ height: `${((item.id * (i + 1) * 37) % 60) + 20}%` }}
                                                    />
                                                ))}
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold text-white leading-tight truncate">{item.title}</h3>
                                                <p className="text-xs text-white/60">Audio Category</p>
                                            </div>
                                        </div>

                                        {/* Play Overlay for Audio */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                                                <Play className="h-5 w-5 fill-current ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Placeholder Content */}
                                        <div className={cn("absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-30", item.color)} />

                                        {item.type === "video" && (
                                            <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-md border border-white/10">
                                                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                                            </div>
                                        )}

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                                            <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 transition-all">
                                                        <Heart className="h-5 w-5" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 transition-all">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 px-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-base font-medium text-zinc-100 truncate">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredResults.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                        <Search className="h-16 w-16 mb-4 opacity-20" />
                        <p className="text-lg">No results found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
