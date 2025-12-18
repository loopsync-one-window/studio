"use client"

import { Calendar, Lightbulb, CheckSquare, User, Plus } from "lucide-react"
import { useDocs } from "./docs-context"

export function DocsRightSidebar() {
    const { isDarkMode } = useDocs()

    return (
        <div className="fixed right-4 top-36 flex flex-col gap-4">
            <SideIcon icon={<Calendar className="w-5 h-5" />} />
            <SideIcon icon={<Lightbulb className="w-5 h-5" />} />
            <SideIcon icon={<CheckSquare className="w-5 h-5" />} />
            <SideIcon icon={<User className="w-5 h-5" />} />
            <div className={`w-8 h-[1px] my-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            <SideIcon icon={<Plus className="w-5 h-5" />} />
        </div>
    )
}

function SideIcon({ icon }: any) {
    const { isDarkMode } = useDocs()
    return (
        <div className={`w-9 h-9 rounded-full shadow-sm border flex items-center justify-center cursor-pointer transition-colors
            ${isDarkMode ? "bg-[#2E2E2E] border-gray-700 hover:bg-white/10 text-gray-300" : "bg-white border-gray-200 hover:bg-gray-100 text-[#444746]"}`}>
            {icon}
        </div>
    )
}
