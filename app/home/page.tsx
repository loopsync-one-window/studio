import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Upload, ArrowRightLeft, Sparkles, Video, Eraser, ScanFace, Wand2, ImagePlus } from "lucide-react"

export default function Page() {
    return (
        <>
            {/* Fixed Header */}
            <div className="flex-none p-6 lg:p-10 pb-0 z-20">
                <div className="max-w-6xl w-full mx-auto pl-4">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1 className="text-3xl font-light tracking-wide text-zinc-100">Home</h1>
                        </div>
                    </header>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 pt-6">
                <div className="relative z-10 max-w-6xl w-full mx-auto space-y-16 pl-4">

                    {/* Face Swap Hero Section */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-2xl font-semibold text-white">Face Swap</h2>
                            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">LS Vision-Pro Model</span>
                        </div>

                        <div className="p-8 border border-white/5 mt-5 rounded-3xl bg-black/50 relative overflow-hidden group">
                            {/* Subtle background glow */}

                            <div className="relative z-10 flex flex-col items-center mt-10">
                                <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl mx-auto">

                                    {/* Source Image */}
                                    <div className="flex-1 w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group/upload">
                                        <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center group-hover/upload:bg-zinc-700 transition-colors">
                                            <Upload className="h-6 w-6 text-zinc-400 group-hover/upload:text-zinc-200" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-zinc-300 font-medium">Upload Source Image</p>
                                            <p className="text-zinc-500 text-sm">The face to swap</p>
                                        </div>
                                    </div>

                                    {/* Swap Indicator */}
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg shadow-red-900/20">
                                            <ArrowRightLeft className="h-5 w-5 text-black" />
                                        </div>
                                    </div>

                                    {/* Target Image */}
                                    <div className="flex-1 w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group/upload">
                                        <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center group-hover/upload:bg-zinc-700 transition-colors">
                                            <ImagePlus className="h-6 w-6 text-zinc-400 group-hover/upload:text-zinc-200" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-zinc-300 font-medium">Upload Target Image</p>
                                            <p className="text-zinc-500 text-sm">Image to receive face</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-base shadow-xl shadow-white/5 transition-all hover:scale-105 active:scale-95">
                                        <Sparkles className="mr-2 h-4 w-4 text-black" />
                                        Swap Faces Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Other Services */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-light text-zinc-200">More Tools</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                </div>
            </div>
        </>
    )
}

function ServiceCard({ title, description, icon, color }: { title: string, description: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="group p-5 rounded-2xl bg-[#121212] border border-white/5 hover:border-zinc-700 transition-all cursor-pointer hover:bg-zinc-900">
            <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <h3 className="text-zinc-100 font-medium mb-1">{title}</h3>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors">{description}</p>
        </div>
    )
}
