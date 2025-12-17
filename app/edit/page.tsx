import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    MousePointer2,
    Eraser,
    Wand2,
    ImageDown,
    Undo2,
    Redo2,
    Download,
    ZoomIn,
    ZoomOut,
    Layers,
    Type,
    Image as ImageIcon,
    Settings2,
    Sliders
} from "lucide-react"

export default function Page() {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Fixed Header */}
            <div className="flex-none p-6 lg:p-8 pb-4 z-20 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
                <div className="max-w-[1920px] w-full mx-auto">
                    <header className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="-ml-1" />
                            <div className="h-6 w-[1px] bg-white/10 mx-2" />
                            <div>
                                <h1 className="text-xl font-medium text-zinc-100">Untitled Design</h1>
                                <p className="text-xs text-zinc-500">Auto-saved</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                                <Undo2 className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                                <Redo2 className="h-5 w-5" />
                            </Button>
                            <div className="h-6 w-[1px] bg-white/10 mx-2" />
                            <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </header>
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Tool Sidebar */}
                <div className="w-[72px] flex-none flex flex-col items-center py-4 gap-4 border-r border-white/5 bg-[#0a0a0a] z-10">
                    <ToolButton icon={<MousePointer2 className="h-5 w-5" />} label="Move" active />
                    <ToolButton icon={<Wand2 className="h-5 w-5" />} label="Magic" />
                    <ToolButton icon={<Eraser className="h-5 w-5" />} label="Eraser" />
                    <ToolButton icon={<ImageDown className="h-5 w-5" />} label="Upscale" />
                    <ToolButton icon={<Type className="h-5 w-5" />} label="Text" />
                    <ToolButton icon={<ImageIcon className="h-5 w-5" />} label="Uploads" />
                </div>

                {/* Sub-Sidebar / Properties Panel (Optional - Context aware) */}
                <div className="w-[280px] flex-none border-r border-white/5 bg-[#0f0f0f] flex flex-col hidden lg:flex">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="font-medium text-sm text-zinc-200">Adjustments</h2>
                    </div>
                    <div className="p-4 space-y-6 overflow-y-auto">

                        {/* Fake Adjustment Sliders */}
                        <AdjustmentGroup label="Enhance">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Wand2 className="h-4 w-4 text-purple-400" />
                                    <span className="text-sm text-zinc-300">Auto Enhance</span>
                                </div>
                            </div>
                        </AdjustmentGroup>

                        <AdjustmentGroup label="Light">
                            <SliderControl label="Brightness" />
                            <SliderControl label="Contrast" />
                            <SliderControl label="Highlights" />
                        </AdjustmentGroup>

                        <AdjustmentGroup label="Color">
                            <SliderControl label="Saturation" />
                            <SliderControl label="Temperature" />
                        </AdjustmentGroup>
                    </div>
                </div>

                {/* Main Canvas Area */}
                <div className="flex-1 bg-[#18181b] relative overflow-hidden flex items-center justify-center p-8">
                    {/* Dot Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                    {/* The Canvas */}
                    <div className="relative shadow-2xl shadow-black/50 bg-[#0f0f0f] aspect-[16/9] w-full max-w-4xl border border-white/5 rounded-sm overflow-hidden group">
                        {/* Placeholder for Canvas Content */}
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                            <div className="text-center">
                                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">Drag and drop an image here</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Floating Bar (Zoom) */}
                    <div className="absolute bottom-6 bg-[#0a0a0a]/90 backdrop-blur border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 text-zinc-400">
                        <ZoomOut className="h-4 w-4 cursor-pointer hover:text-white" />
                        <span className="text-xs font-mono min-w-[3ch] text-center">100%</span>
                        <ZoomIn className="h-4 w-4 cursor-pointer hover:text-white" />
                    </div>
                </div>

            </div>
        </div>
    )
}

function ToolButton({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex flex-col items-center gap-1.5 cursor-pointer group w-full py-2 relative`}>
            {active && <div className="absolute left-0 top-2 bottom-2 w-1 bg-white rounded-r-full" />}
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-white text-black' : 'text-zinc-400 group-hover:bg-white/10 group-hover:text-zinc-100'}`}>
                {icon}
            </div>
            <span className={`text-[10px] font-medium ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-400'}`}>{label}</span>
        </div>
    )
}

function AdjustmentGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{label}</label>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}

function SliderControl({ label }: { label: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
                <span className="text-zinc-300">{label}</span>
                <span className="text-zinc-500">0</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full w-full overflow-hidden">
                <div className="h-full bg-zinc-600 w-1/2 rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-md" />
                </div>
            </div>
        </div>
    )
}
