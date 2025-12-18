"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Editor } from "@tiptap/react"

export type PageOrientation = "portrait" | "landscape"
export type PaperSize = "A4" | "Letter" | "Legal"
export type FontFamily = "Inter" | "Roboto" | "Merriweather" | "Courier Prime" | "Comic Sans MS"

export interface PageMargins {
    top: number
    bottom: number
    left: number
    right: number
}

export interface PageSetup {
    orientation: PageOrientation
    paperSize: PaperSize
    fontFamily: FontFamily
    margins: PageMargins
}

interface DocsContextType {
    isDarkMode: boolean
    toggleDarkMode: () => void
    pageSetup: PageSetup
    setPageSetup: (setup: PageSetup | ((prev: PageSetup) => PageSetup)) => void
    pages: { id: string, content: string }[]
    setPages: React.Dispatch<React.SetStateAction<{ id: string, content: string }[]>>
    addPage: () => void
    removePage: (id: string) => void
    editor: Editor | null
    setEditor: (editor: Editor | null) => void
}

const DocsContext = createContext<DocsContextType | undefined>(undefined)

const DEFAULT_PAGE_SETUP: PageSetup = {
    orientation: "portrait",
    paperSize: "A4",
    fontFamily: "Inter",
    margins: { top: 2.54, bottom: 2.54, left: 2.54, right: 2.54 } // cm
}

export function DocsProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [pageSetup, setPageSetup] = useState<PageSetup>(DEFAULT_PAGE_SETUP)
    const [pages, setPages] = useState<{ id: string, content: string }[]>([{ id: "page-1", content: "" }])
    const [editor, setEditor] = useState<Editor | null>(null)

    const toggleDarkMode = () => setIsDarkMode(prev => !prev)

    const addPage = () => {
        setPages(prev => [...prev, { id: `page-${Date.now()}`, content: "" }])
    }

    const removePage = (id: string) => {
        setPages(prev => {
            if (prev.length <= 1) return prev // Don't remove the last page
            return prev.filter(page => page.id !== id)
        })
    }

    return (
        <DocsContext.Provider value={{
            isDarkMode,
            toggleDarkMode,
            pageSetup,
            setPageSetup,
            pages,
            setPages,
            addPage,
            removePage,
            editor,
            setEditor
        }}>
            {children}
        </DocsContext.Provider>
    )
}

export function useDocs() {
    const context = useContext(DocsContext)
    if (context === undefined) {
        throw new Error("useDocs must be used within a DocsProvider")
    }
    return context
}
