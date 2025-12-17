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
} from "@/components/ui/sidebar"
import { Home, Search, Image as ImageIcon, Aperture, Clapperboard } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar collapsible="icon" className="border-r-0 bg-sidebar text-sidebar-foreground overflow-hidden">
            {/* Gradient Background Effect */}
            <div className="absolute top-[-5%] left-[-10%] w-[150%] h-[30%] bg-red-900/60 blur-[80px] rounded-full pointer-events-none" />

            <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 flex items-center gap-4 h-16 backdrop-blur-sm group-data-[collapsible=icon]:justify-center relative z-10">
                {/*  Use group-data-[collapsible=icon] to switch between full/icon views if needed, or just let Sidebar handle it */}
                <div className="relative flex items-center w-full h-16">
                    {/* Full Logo */}
                    <div className="relative h-10 w-42 transition-all duration-300 opacity-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden">
                        <Image src="/logo/studio-logo.svg" alt="LoopSync" fill className="object-contain object-center" priority />
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
            <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2 relative z-10">
                <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                    <Avatar className="h-8 w-8 bg-red-600 border border-white/10">
                        <AvatarFallback className="bg-red-600 text-white text-[10px] font-bold">LO</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm font-medium text-white">LoopSync</span>
                        <span className="text-xs text-zinc-500">Free account</span>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
