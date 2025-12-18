"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Home, Search, Image as ImageIcon, Aperture, Clapperboard, ChevronLeft, ChevronRight, Sparkles, Palette, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Dithering } from "@paper-design/shaders-react"

export function AppSidebar() {
    const pathname = usePathname()
    const { state, toggleSidebar } = useSidebar()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <Sidebar collapsible="icon" className="border-r-0 bg-sidebar text-sidebar-foreground group/sidebar z-[9999]">
            <div className="flex flex-col h-full w-full overflow-hidden relative">
                {/* Gradient Background Effect */}
                <div className="absolute top-[-5%] left-[-10%] w-[150%] h-[50%] bg-[#416304] blur-[80px] rounded-full pointer-events-none" />

                <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 flex items-center gap-4 h-16 backdrop-blur-sm group-data-[collapsible=icon]:justify-center relative z-10">
                    {/*  Use group-data-[collapsible=icon] to switch between full/icon views if needed, or just let Sidebar handle it */}
                    <div className="relative flex items-center w-full h-16">
                        {/* Full Logo */}
                        <div className="relative h-7 w-full transition-all duration-300 opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden">
                            <Image src="/logo/loopsync.svg" alt="LoopSync" fill className="object-contain ml-5 invert object-left" priority />
                        </div>

                        {/* Icon Logo - Absolute positioned to center when collapsed */}
                        <div className="absolute left-0 top-0 h-10 w-full flex items-center justify-center transition-all duration-700 opacity-0 scale-75 group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:scale-100">
                            <div className="relative h-10 w-10">
                                <Image src="/logo/3.0.svg" alt="LoopSync" fill className="object-contain" priority />
                            </div>
                        </div>
                    </div>

                </SidebarHeader>
                <SidebarContent className="py-4 relative z-10 overflow-hidden">
                    <SidebarMenu className="gap-2 px-3 group-data-[collapsible=icon]:px-0">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild size="lg" isActive={pathname === "/home"} className="rounded-full pl-6 pr-4 hover:bg-white/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto transition-all data-[active=true]:bg-white/5 data-[active=true]:ring-2 data-[active=true]:ring-white/5" tooltip="Home">
                                <Link href="/home">
                                    <Home className="h-5 w-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Home</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild size="lg" isActive={pathname === "/search"} className="rounded-full pl-6 pr-4 hover:bg-white/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto transition-all data-[active=true]:bg-white/5 data-[active=true]:ring-2 data-[active=true]:ring-white/5" tooltip="Search">
                                <Link href="/search">
                                    <Search className="h-5 w-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Search</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild size="lg" isActive={pathname === "/pixel-labs"} className="rounded-full pl-6 pr-4 hover:bg-white/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto transition-all data-[active=true]:bg-white/5 data-[active=true]:ring-2 data-[active=true]:ring-white/5" tooltip="Pixel Labs">
                                <Link href="/pixel-labs">
                                    <Aperture className="h-5 w-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Pixel Labs</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild size="lg" isActive={pathname === "/motion-labs"} className="rounded-full pl-6 pr-4 hover:bg-white/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto transition-all data-[active=true]:bg-white/5 data-[active=true]:ring-2 data-[active=true]:ring-white/5" tooltip="Motion Labs">
                                <Link href="/motion-labs">
                                    <Clapperboard className="h-5 w-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Motion Labs</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild size="lg" isActive={pathname === "/images"} className="rounded-full pl-6 pr-4 hover:bg-white/10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:mx-auto transition-all data-[active=true]:bg-white/5 data-[active=true]:ring-2 data-[active=true]:ring-white/5" tooltip="Images">
                                <Link href="/images">
                                    <ImageIcon className="h-5 w-5 shrink-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Images</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2 relative z-50">
                    <div
                        className="relative"
                    >
                        {/* Overlay to handle click outside */}
                        {isDropdownOpen && (
                            <div
                                className="fixed inset-0 z-[9998] bg-transparent"
                                onClick={() => setIsDropdownOpen(false)}
                            />
                        )}

                        {/* Apple-themed Dropdown Menu - Fixed Position to break out of overflow hidden */}
                        {isDropdownOpen && (
                            <div
                                className="fixed bottom-20 left-4 w-72 z-[9999]
                                bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl 
                                animate-in fade-in zoom-in-95 duration-200 origin-bottom-left"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                    <Avatar className="h-10 w-10 bg-red-600 border border-white/10">
                                        <AvatarFallback className="bg-red-600 text-white text-xs font-bold">LO</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm font-semibold text-white truncate">LoopSync</span>
                                        <span className="text-xs text-zinc-400 truncate">@loopsync.cloud</span>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2 space-y-1">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors group">
                                        <Sparkles className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                        Upgrade plan
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors group">
                                        <Palette className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                        Personalization
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors group">
                                        <Settings className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                        Settings
                                    </button>
                                </div>

                                <div className="h-px bg-white/5 mx-4 my-1" />

                                <div className="p-2 space-y-1">
                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                            Help
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-zinc-500" />
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors group">
                                        <LogOut className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Trigger Button */}
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={cn(
                                "flex items-center gap-3 group-data-[collapsible=icon]:justify-center cursor-pointer p-2 rounded-xl transition-colors",
                                isDropdownOpen ? "bg-white/10" : "hover:bg-white/5"
                            )}
                        >
                            <Avatar className="h-8 w-8 bg-red-600 border border-white/10">
                                <AvatarFallback className="bg-red-600 text-white text-[10px] font-bold">LO</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                                <span className="text-sm font-medium text-white">LoopSync</span>
                                <span className="text-xs text-zinc-500">Free account</span>
                            </div>
                        </div>
                    </div>
                </SidebarFooter>
            </div>

            {/* Toggle Button - Only on Home */}
            {pathname === "/home" && (
                <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-50 h-8 w-8 cursor-pointer rounded-full border border-white/10 !bg-white !text-black hover:!bg-white hover:!text-black p-0 shadow-xl flex items-center justify-center transition-all opacity-100"
                >
                    {state === "expanded" ? <ChevronLeft className="h-4 w-4 text-black" /> : <ChevronRight className="h-4 w-4 text-black" />}
                </Button>
            )}
            <SidebarRail />
        </Sidebar>
    )
}
