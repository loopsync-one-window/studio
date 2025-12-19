"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"

export function DynamicSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    // Default to closed (false) unless we are on the landing page "/"
    const defaultOpen = pathname === "/"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            {children}
        </SidebarProvider>
    )
}
