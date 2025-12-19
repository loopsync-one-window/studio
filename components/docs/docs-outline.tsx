"use client"

import { useDocs } from "./docs-context"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function DocsOutline() {
    const { editor, isDarkMode, viewOptions } = useDocs()
    const [headings, setHeadings] = useState<{ level: number, text: string, pos: number }[]>([])

    useEffect(() => {
        if (!editor) return

        const updateHeadings = () => {
            const newHeadings: { level: number, text: string, pos: number }[] = []
            editor.state.doc.descendants((node, pos) => {
                if (node.type.name === 'heading') {
                    newHeadings.push({
                        level: node.attrs.level,
                        text: node.textContent,
                        pos: pos
                    })
                }
            })
            setHeadings(newHeadings)
        }

        updateHeadings()
        editor.on('update', updateHeadings)

        return () => {
            editor.off('update', updateHeadings)
        }
    }, [editor])

    if (!viewOptions.showOutline) return null

    return (
        <div className={cn(
            "w-64 border-r overflow-y-auto p-4 flex-shrink-0 transition-colors",
            isDarkMode ? "bg-[#191919] border-white/5" : "bg-white border-gray-200"
        )}>
            <h3 className={cn("text-xs font-semibold uppercase tracking-wider mb-4", isDarkMode ? "text-gray-500" : "text-gray-500")}>
                Outline
            </h3>
            <div className="space-y-1">
                {headings.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No headings</p>
                )}
                {headings.map((heading, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            editor?.chain().focus().setTextSelection(heading.pos + 1).run()
                            editor?.view.dom.blur() // Optional: keep focus or scroll to view
                            const element = editor?.view.domAtPos(heading.pos + 1).node as HTMLElement
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            }
                        }}
                        className={cn(
                            "block w-full text-left text-sm py-1 px-2 rounded hover:bg-black/5 transition-colors truncate",
                            isDarkMode ? "hover:bg-white/10 text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900",
                            heading.level === 1 && "font-medium",
                            heading.level === 2 && "pl-4",
                            heading.level === 3 && "pl-6",
                            heading.level >= 4 && "pl-8"
                        )}
                    >
                        {heading.text || "Untitled"}
                    </button>
                ))}
            </div>
        </div>
    )
}
