import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Upload, ArrowRightLeft, Sparkles, Video, Eraser, ScanFace, Wand2, ImagePlus, Search, FileText, Layout, Instagram, Globe, MoreHorizontal, Play, Clock, Music } from "lucide-react"
import { Dithering } from "@paper-design/shaders-react"

export default function Page() {
    return (
        <>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 pt-6 relative overflow-hidden">
                {/* Background Dithering Effect */}
                <div className="absolute right-0 top-0 w-1/1 h-[600px] z-0 pointer-events-none opacity-80 mix-blend-screen">
                    <Dithering
                        style={{ height: "100%", width: "100%" }}
                        colorBack="hsl(0, 0%, 0%)"
                        colorFront="#e60076"
                        shape={"cat" as any}
                        type="4x4"
                        pxSize={3}
                        offsetX={0}
                        offsetY={0}
                        scale={0.8}
                        rotation={0}
                        speed={0.1}
                    />
                </div>
                <div className="relative z-10 max-w-6xl w-full mx-auto space-y-12 pl-4">

                    {/* Hero Section (Canva-like) */}
                    <section className="flex flex-col items-center text-center space-y-8 py-10">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <SidebarTrigger className="-ml-1 md:hidden" />

                                {/* Studio 3.0 Logo Heading */}
                                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white relative">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                                        Studio&nbsp;3.0
                                    </span>
                                </h1>
                            </div>

                            <p className="text-white text-lg">
                                Create stunning visuals, videos, and more with Studio 3.0
                            </p>
                        </div>


                        {/* Search Bar */}
                        <div className="relative w-full max-w-2xl group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-white group-focus-within:text-white transition-colors z-10" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search your content or try our templates"
                                className="w-full h-14 pl-12 pr-4 bg-transparent backdrop-blur-sm border border-white/5 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/5 transition-all shadow-lg"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-4">
                            <QuickAction icon={<FileText className="h-6 w-6 text-white" />} label="Doc" />
                            <QuickAction icon={<Layout className="h-6 w-6 text-white" />} label="Whiteboard" />
                            <QuickAction icon={<Video className="h-6 w-6 text-white" />} label="Video" />
                            <QuickAction icon={<Instagram className="h-6 w-6 text-white" />} label="Social Info" />
                            <QuickAction icon={<Globe className="h-6 w-6 text-white" />} label="Website" />
                            <QuickAction icon={<MoreHorizontal className="h-6 w-6 text-white" />} label="More" />
                        </div>
                    </section>

                    {/* My Creations (History) */}
                    <section className="space-y-4 mb-30">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">My Creations</h2>
                            <Button variant="link" className="text-zinc-400 hover:text-white">See all</Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <CreationCard title="Project Alpha" type="Video" date="Edited 2h ago" image="/api/placeholder/400/300" />
                            <CreationCard title="Marketing Post" type="Social" date="Edited 5h ago" image="/api/placeholder/400/300" />
                            <CreationCard title="Q4 Report" type="Doc" date="Edited 1d ago" image="/api/placeholder/400/300" />
                            <CreationCard title="Untitled Design" type="Image" date="Edited 2d ago" image="/api/placeholder/400/300" />
                        </div>
                    </section>

                    {/* Sponsors & Trending Music Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-30">
                        {/* Audio Library */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-white">Audio Library</h2>
                                <Button variant="link" className="text-zinc-400 hover:text-white">View all</Button>
                            </div>
                            <div className="aspect-[3/1] w-full grid grid-cols-4 grid-rows-2 gap-3">
                                {["Cinematic", "Ambient", "Upbeat", "Lo-Fi", "Corporate", "Rock", "Electronic", "Acoustic"].map((genre, i) => (
                                    <div key={i} className="bg-transparent border border-white/5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 group">
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                                            <Music className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
                                        </div>
                                        <div className="w-8 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-zinc-600 w-1/2 group-hover:w-3/4 transition-all" />
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-medium group-hover:text-zinc-300">{genre}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Music Albums */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-white">Trending Music</h2>
                                <Button variant="link" className="text-zinc-400 hover:text-white">Browse</Button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <AlbumCard title="Midnight" artist="The Weeknd" color="bg-blue-500" />
                                <AlbumCard title="Solar Power" artist="Lorde" color="bg-yellow-500" />
                                <AlbumCard title="30" artist="Adele" color="bg-emerald-500" />
                            </div>
                        </section>

                    </div>

                    {/* My Uploads */}
                    <section className="space-y-4 pt-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">My Uploads</h2>
                            <Button variant="link" className="text-zinc-400 hover:text-white">Upload</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Images Section */}
                            <div className="bg-transparent rounded-3xl border border-white/5 p-6 space-y-4">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <div className="flex items-center gap-2">
                                        <ImagePlus className="h-5 w-5 text-white" />
                                        <span className="font-medium text-zinc-200">Images</span>
                                    </div>
                                    <span className="text-xs">12 files</span>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                    {["bg-purple-500", "bg-pink-500", "bg-rose-500", "bg-orange-500", "bg-indigo-500"].map((color, i) => (
                                        <div key={i} className={`aspect-square rounded-lg ${color}/20 border border-white/5 hover:border-white/20 transition-all cursor-pointer overflow-hidden group/img relative`}>
                                            <div className={`absolute inset-0 ${color}/20`} />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                <div className="w-full h-full bg-black/20 backdrop-blur-[1px]" />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="aspect-square rounded-lg border border-dashed border-white/30 bg-white/5 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center text-zinc-500 hover:text-white">
                                        <Upload className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Videos Section */}
                            <div className="bg-transparent rounded-xl border border-white/5 p-6 space-y-4">
                                <div className="flex items-center justify-between text-zinc-400 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-5 w-5 text-white" />
                                        <span className="font-medium text-zinc-200">Videos</span>
                                    </div>
                                    <span className="text-xs">4 files</span>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-3xl bg-white/5 border border-white/5 hover:bg-zinc-800 transition-colors cursor-pointer group/vid">
                                            <div className="h-12 w-20 bg-white rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                                                <div className="absolute inset-0" />
                                                <Play className="h-4 w-4 text-black opacity-50 group-hover/vid:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <p className="text-sm font-medium text-zinc-300 truncate group-hover/vid:text-white transition-colors">marketing_demo_v{i}.mp4</p>
                                                    <span className="text-[10px] text-zinc-600 bg-zinc-900 border border-white/5 px-1.5 py-0.5 rounded">1080p</span>
                                                </div>
                                                <p className="text-xs text-zinc-500">24.5 MB • 10s • Edited 2h ago</p>
                                            </div>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white opacity-0 group-hover/vid:opacity-100 transition-opacity">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Other Services */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-light text-zinc-200">More Tools</h2>
                        <div className="grid bg-transparent p-10 rounded-3xl border border-white/5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <ServiceCard
                                title="Video Dubbing"
                                description="Translate videos with lip-sync"
                                icon={<Video className="h-6 w-6 text-blue-400" />}
                                color="bg-blue-500/10 border-blue-500/20"
                            />
                            <ServiceCard
                                title="Object Removal"
                                description="Clean up unwanted items"
                                icon={<Eraser className="h-6 w-6 text-red-400" />}
                                color="bg-red-500/10 border-red-500/20"
                            />
                            <ServiceCard
                                title="Image Upscale"
                                description="Enhance quality up to 4K"
                                icon={<Wand2 className="h-6 w-6 text-emerald-400" />}
                                color="bg-emerald-500/10 border-emerald-500/20"
                            />
                            <ServiceCard
                                title="Portrait Gen"
                                description="Create realistic headshots"
                                icon={<ScanFace className="h-6 w-6 text-orange-400" />}
                                color="bg-orange-500/10 border-orange-500/20"
                            />
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="pt-20 pb-10 text-center border-t border-white/5 mt-20">
                        <div className="space-y-4">
                            <p className="text-zinc-500 text-sm">© 2025 Intellaris Private Limited. All rights reserved.</p>
                            <div className="space-y-1">
                                <p className="text-zinc-600 text-xs">A LoopSync One Window creation for <span className="font-semibold text-white">Studio 3.0</span></p>
                                <a
                                    href="https://www.loopsync.cloud"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors inline-block hover:underline"
                                >
                                    www.loopsync.cloud
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

function QuickAction({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="h-14 w-14 rounded-full bg-transparent backdrop-blur-sm border border-white/5 flex items-center justify-center group-hover:bg-transparent group-hover:scale-110 transition-all shadow-md">
                {icon}
            </div>
            <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">{label}</span>
        </div>
    )
}

function CreationCard({ title, type, date, image }: { title: string, type: string, date: string, image: string }) {
    return (
        <div className="group cursor-pointer">
            <div className="aspect-[4/3] bg-[#000000] rounded-xl border border-white/5 relative overflow-hidden mb-3 group-hover:border-white/10 transition-all">
                {/* Using a simple div with background for placeholder image */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white backdrop-blur-sm border border-white/10 text-[12px] font-medium text-black mb-1">
                        {type}
                    </div>
                </div>
                {/* Placeholder content pattern */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                    <div className="h-12 w-12 rounded-full border-2 border-white/20" />
                </div>
            </div>
            <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white truncate">{title}</h3>
            <p className="text-xs text-zinc-500">{date}</p>
        </div>
    )
}

function AlbumCard({ title, artist, color }: { title: string, artist: string, color: string }) {
    return (
        <div className={`aspect-square rounded-xl ${color} bg-opacity-10 border border-white/5 p-4 flex flex-col justify-end relative group cursor-pointer overflow-hidden hover:bg-opacity-20 transition-all`}>
            <div className={`absolute inset-0 ${color} opacity-10`} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                <Play className="h-5 w-5 text-black fill-current ml-0.5" />
            </div>
            <div className="relative z-10">
                <h3 className="font-semibold text-white/90 truncate">{title}</h3>
                <p className="text-xs text-white/60 truncate">{artist}</p>
            </div>
        </div>
    )
}

function SponsorCard({ name, industry, initial }: { name: string, industry: string, initial: string }) {
    return (
        <div className="aspect-square rounded-xl bg-[#1e1e1e] border border-white/5 p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer hover:bg-white/5 transition-colors">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/20 transition-all font-bold text-lg">
                {initial}
            </div>
            <div>
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white truncate w-20">{name}</h3>
                <p className="text-[10px] text-zinc-500">{industry}</p>
            </div>
        </div>
    )
}

function ServiceCard({ title, description, icon, color }: { title: string, description: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="group p-5 rounded-2xl bg-transparent border border-white/5 hover:border-white/5 transition-all cursor-pointer hover:bg-white/5">
            <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <h3 className="text-zinc-100 font-medium mb-1">{title}</h3>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{description}</p>
        </div>
    )
}
