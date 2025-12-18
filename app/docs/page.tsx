"use client"

import { useSearchParams } from "next/navigation"
import { DocsProvider, useDocs } from "@/components/docs/docs-context"
import { DocsHeader } from "@/components/docs/docs-header"
import { DocsToolbar } from "@/components/docs/docs-toolbar"
import { DocsRightSidebar } from "@/components/docs/docs-right-sidebar"
import { DocsEditor } from "@/components/docs/docs-editor"
import { useEffect, useState } from "react"

export default function DocsPage() {
    const searchParams = useSearchParams()

    // Params matching the requested URL structure
    const module = searchParams.get("module")
    const version = searchParams.get("version")
    const lang = searchParams.get("lang")
    const type = searchParams.get("type")
    const id = searchParams.get("id")

    return (
        <DocsProvider>
            <DocsPageContent module={module} version={version} lang={lang} type={type} id={id} />
        </DocsProvider>
    )
}

function DocsPageContent({ module, version, lang, type, id }: any) {
    const { isDarkMode } = useDocs()

    return (
        <div className={`flex flex-col h-full font-sans relative z-10 transition-colors duration-300 ${isDarkMode ? "bg-[#191919] text-[#E2E2E2]" : "bg-[#F9FBFD] text-black"}`}>
            <DocsHeader id={id} />
            <DocsToolbar />
            <div className="flex-1 flex overflow-hidden relative">
                <main className="flex-1 overflow-hidden relative flex flex-col">
                    <DocsEditor />
                </main>
                <DocsRightSidebar />
                <WordCount />
            </div>
        </div>
    )
}

function WordCount() {
    const { editor, isDarkMode } = useDocs()
    const [stats, setStats] = useState({ words: 0, characters: 0 })

    useEffect(() => {
        if (!editor) return

        const updateStats = () => {
            setStats({
                words: editor.storage.characterCount.words(),
                characters: editor.storage.characterCount.characters()
            })
        }

        updateStats()
        editor.on('update', updateStats)
        editor.on('transaction', updateStats)

        return () => {
            editor.off('update', updateStats)
            editor.off('transaction', updateStats)
        }
    }, [editor])

    if (!editor) return null

    return (
        <div className={`absolute bottom-4 right-8 z-50 text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${isDarkMode
            ? "bg-white/10 text-white/50 border border-white/5"
            : "bg-black/5 text-black/50 border border-black/5"
            }`}>
            {stats.words} words
        </div>
    )
}
