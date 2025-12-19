"use client"

import { useDocs } from "./docs-context"
import { cn } from "@/lib/utils"

export function DocsRuler() {
    const { isDarkMode, viewOptions } = useDocs()

    if (!viewOptions.showRulers) return null

    return (
        <div className={cn(
            "h-6 w-full flex-shrink-0 border-b flex items-end relative sticky top-0 z-20",
            isDarkMode ? "bg-[#191919] border-white/5" : "bg-[#F9FBFD] border-gray-200"
        )}>
            {/* Simple static ruler visualization for now */}
            <div className="w-full h-full relative overflow-hidden opacity-50">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute bottom-0 border-l h-2",
                            isDarkMode ? "border-gray-600" : "border-gray-400"
                        )}
                        style={{ left: `${i * 1}cm` }}
                    >
                        {i > 0 && (
                            <span className="absolute -top-3 -left-1 text-[8px] font-mono">
                                {i}
                            </span>
                        )}
                    </div>
                ))}
                {/* Sub markings */}
                {Array.from({ length: 200 }).map((_, i) => (
                    <div
                        key={`sub-${i}`}
                        className={cn(
                            "absolute bottom-0 border-l h-1",
                            isDarkMode ? "border-gray-700" : "border-gray-300"
                        )}
                        style={{ left: `${i * 0.5}cm` }}
                    />
                ))}
            </div>
        </div>
    )
}
