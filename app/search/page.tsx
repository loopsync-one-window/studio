import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Page() {
    return (
        <>
            {/* Fixed Header */}
            <div className="flex-none p-6 lg:p-10 pb-0 z-20">
                <div className="max-w-6xl w-full mx-auto pl-4">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                            <h1 className="text-3xl font-light tracking-wide text-zinc-100">Search</h1>
                        </div>
                    </header>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 pt-6">
                <div className="relative z-10 max-w-6xl w-full mx-auto space-y-12 pl-4">
                    <div className="relative w-full">
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors">
                                <Search className="h-5 w-5" />
                            </div>
                            <Input
                                className="w-full bg-[#1c1c1c] border-zinc-800/50 hover:border-zinc-700 focus-visible:border-red-500/50 h-[60px] pl-14 pr-4 rounded-2xl text-lg placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all shadow-lg shadow-black/20"
                                placeholder="Type to search..."
                            />
                        </div>
                    </div>
                    <div className="p-10 border border-zinc-800 rounded-3xl bg-zinc-900/50 text-center text-zinc-500 mt-10">
                        <p>Search results will appear here</p>
                    </div>
                </div>
            </div>
        </>
    )
}
