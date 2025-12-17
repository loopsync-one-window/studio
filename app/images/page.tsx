import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, ArrowUp, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

export default function Page() {
    return (
        <>
            {/* Fixed Header */}
            <div className="flex-none p-6 lg:p-10 pb-0 z-20">
                <div className="max-w-6xl w-full mx-auto pl-4">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1 className="text-3xl font-light tracking-wide text-zinc-100">Images</h1>
                        </div>
                    </header>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 pt-6">
                <div className="relative z-10 max-w-6xl w-full mx-auto space-y-12 pl-4">
                    {/* Search Bar */}
                    <div className="relative w-full">
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
                                <ImageIcon className="h-5 w-5" />
                            </div>
                            <Input
                                className="w-full bg-[#1c1c1c] border-zinc-800/50 hover:border-zinc-700 focus-visible:border-red-500/50 h-[60px] pl-14 pr-28 rounded-2xl text-lg placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all shadow-lg shadow-black/20"
                                placeholder="Describe a new image"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full h-10 w-10">
                                    <Mic className="h-5 w-5" />
                                </Button>
                                <Button size="icon" className="bg-zinc-700 hover:bg-zinc-600 text-white rounded-full h-10 w-10 transition-colors">
                                    <ArrowUp className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Try a style on an image */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-normal text-zinc-200">Try a style on an image</h2>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-50">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 scroll-smooth">
                            {/* Items */}
                            <StyleCard title="Bollywood poster" image="/assets/bollywood_poster.png" />
                            <StyleCard title="Festival" image="/assets/holiday_card.png" />
                            <StyleCard title="Navratri" image="/assets/girl_with_pearl.png" />
                            <StyleCard title="Mithila" image="/assets/bollywood_poster.png" />
                            <StyleCard title="Jaipur textile" image="/assets/girl_with_pearl.png" />
                            <StyleCard title="Sari landscape" image="/assets/holiday_card.png" />
                        </div>
                    </section>

                    {/* Discover something new */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-normal text-zinc-200">Discover something new</h2>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-50">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4">
                            <DiscoveryCard
                                title="Create a cartoon"
                                icon={<Image src="/assets/girl_with_pearl.png" alt="Cartoon" width={64} height={64} className="object-cover grayscale" />}
                            />
                            <DiscoveryCard title="Me as The Girl with a Pearl" image="/assets/girl_with_pearl.png" />
                            <DiscoveryCard title="Create a holiday card" image="/assets/holiday_card.png" />
                            <DiscoveryCard title="Create an album cover" image="/assets/bollywood_poster.png" />
                            <DiscoveryCard title="What would I look like as a K-Pop star?" image="/assets/girl_with_pearl.png" />
                            <DiscoveryCard title="Style me" image="/assets/bollywood_poster.png" />
                        </div>
                    </section>

                    <section className="space-y-6 opacity-40">
                        <h2 className="text-lg font-normal text-zinc-200">My images</h2>
                    </section>
                </div>
            </div>
        </>
    )
}

function StyleCard({ title, image }: { title: string, image: string }) {
    return (
        <div className="flex flex-col gap-3 min-w-[160px] group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 shadow-lg shadow-black/20">
                <Image src={image} alt={title} fill className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <span className="text-sm text-zinc-400 text-center font-normal group-hover:text-zinc-200 transition-colors">{title}</span>
        </div>
    )
}

function DiscoveryCard({ title, image, icon }: { title: string, image?: string, icon?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 p-2 pr-6 bg-[#121212] hover:bg-[#1a1a1a] rounded-2xl border border-white/5 cursor-pointer transition-all duration-300 group hover:border-white/10 hover:shadow-lg hover:shadow-black/20">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl shrink-0 bg-zinc-800 border border-white/5">
                {image ? (
                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    icon || <div className="h-full w-full bg-zinc-800" />
                )}
            </div>
            <span className="text-sm text-zinc-300 font-normal group-hover:text-white transition-colors">{title}</span>
        </div>
    )
}
