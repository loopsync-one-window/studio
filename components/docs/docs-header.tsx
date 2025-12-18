"use client"

import { Button } from "@/components/ui/button"
import { Dithering } from "@paper-design/shaders-react"
import {
    FileText, Star, MessageSquare, Lock, Moon, Sun, ChevronRight, FilePlus, FolderOpen, Copy, Share, Mail, Download, Edit, Trash2, History, Info, Globe, Smartphone, Printer, QrCode, X, Check,
    Eye, Layout, Ruler, Maximize, Image, Table, PenTool, Minus, Calendar, ChevronDown, Bold, Pilcrow, AlignLeft, List, RemoveFormatting, CheckCheck, BarChart, GitCompare, Quote, Puzzle, Code, Zap, FileJson, Layers, Book, GraduationCap, Bell, MessageSquareWarning, Italic,
    Users, UserCheck, File as FileIcon, FileCode, Clock, Tag, Languages, Heading1, Heading2, Heading3, AlignCenter, AlignRight, AlignJustify, ListOrdered, PlusCircle, LayoutTemplate, Underline, Strikethrough, Superscript, Subscript, Sparkles, Upload, AlertTriangle, MoreHorizontal, Settings, Loader2
} from "lucide-react"
import { useDocs } from "./docs-context"
import { useState, useRef, useEffect } from "react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface DocsHeaderProps {
    id: string | null
}

export function DocsHeader({ id }: DocsHeaderProps) {
    const { isDarkMode, toggleDarkMode, pageSetup, setPageSetup, addPage } = useDocs()
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [isMobileViewOpen, setIsMobileViewOpen] = useState(false)
    const [isWriteOSOpen, setIsWriteOSOpen] = useState(false)
    const [isQrLoaded, setIsQrLoaded] = useState(false)

    // Modal States
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isShareModal, setIsShareModal] = useState(false)
    const [isTrashModal, setIsTrashModal] = useState(false)
    const [isHistoryModal, setIsHistoryModal] = useState(false)
    const [isDetailsModal, setIsDetailsModal] = useState(false)
    const [isPageSetupOpen, setIsPageSetupOpen] = useState(false)
    const [isPrintModal, setIsPrintModal] = useState(false)

    const [isCopied, setIsCopied] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Title Editing State
    const [title, setTitle] = useState(id ? `Doc-${id.slice(-6)}` : "Untitled Docs")
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const titleInputRef = useRef<HTMLInputElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Focus input when editing starts
    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus()
            titleInputRef.current.select()
        }
    }, [isEditingTitle])

    useEffect(() => {
        setIsQrLoaded(false)
    }, [id])

    const handleCopy = () => {
        const url = `https://studio.loopsync.cloud/doc/${id || "demo"}`
        navigator.clipboard.writeText(url)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const finishEditingTitle = () => {
        if (!title.trim()) {
            setTitle("Untitled Docs")
        }
        setIsEditingTitle(false)
    }

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            finishEditingTitle()
        }
    }

    const handleDownload = (format: string) => {
        alert(`Downloading as ${format}...`)
    }

    const MENU_ITEMS = [
        {
            label: "File",
            children: [
                { icon: <FilePlus className="w-4 h-4" />, label: "New", shortcut: "", action: () => addPage() },
                { icon: <FolderOpen className="w-4 h-4" />, label: "Open", shortcut: "Ctrl+O", action: () => setIsOpenModal(true) },
                { icon: <Copy className="w-4 h-4" />, label: "Make a copy", shortcut: "", action: () => window.open(window.location.href, "_blank") },
                { type: "separator" },
                {
                    icon: <Share className="w-4 h-4" />,
                    label: "Share",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <Users className="w-4 h-4" />, label: "Share with others", action: () => setIsShareModal(true) },
                        { icon: <Globe className="w-4 h-4" />, label: "Publish to web", action: () => window.location.href = `https://studio.loopsync.cloud/web?publish=true&docId=${id || "demo"}` }
                    ]
                },
                {
                    icon: <Download className="w-4 h-4" />,
                    label: "Download",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <FileText className="w-4 h-4" />, label: "Microsoft Word (.docx)", action: () => handleDownload("docx") },
                        { icon: <FileIcon className="w-4 h-4" />, label: "PDF Document (.pdf)", action: () => handleDownload("pdf") },
                        { icon: <FileText className="w-4 h-4" />, label: "Plain Text (.txt)", action: () => handleDownload("txt") },
                        { icon: <FileCode className="w-4 h-4" />, label: "Web Page (.html)", action: () => handleDownload("html") }
                    ]
                },
                { type: "separator" },
                { icon: <Edit className="w-4 h-4" />, label: "Rename", shortcut: "", action: () => { setIsEditingTitle(true); setTimeout(() => titleInputRef.current?.focus(), 100); } },
                { icon: <Trash2 className="w-4 h-4" />, label: "Move to trash", shortcut: "", action: () => setIsTrashModal(true) },
                { type: "separator" },
                {
                    icon: <History className="w-4 h-4" />,
                    label: "WriteOS History",
                    action: () => setIsHistoryModal(true)
                },
                { type: "separator" },
                { icon: <Info className="w-4 h-4" />, label: "Details", action: () => setIsDetailsModal(true) },
                { type: "separator" },
                { icon: <Smartphone className="w-4 h-4" />, label: "Page setup", shortcut: "", action: () => setIsPageSetupOpen(true) },
                { icon: <Printer className="w-4 h-4" />, label: "Print", shortcut: "Ctrl+P", action: () => setIsPrintModal(true) },
            ]
        },
        {
            label: "Edit",
            children: [
                { label: "Undo", shortcut: "Ctrl+Z" },
                { label: "Redo", shortcut: "Ctrl+Y" },
                { type: "separator" },
                { label: "Cut", shortcut: "Ctrl+X" },
                { label: "Copy", shortcut: "Ctrl+C" },
                { label: "Paste", shortcut: "Ctrl+V" },
            ]
        },
        {
            label: "View",
            children: [
                {
                    icon: <Eye className="w-4 h-4" />,
                    label: "Mode",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <Edit className="w-4 h-4" />, label: "Editing" },
                        { icon: <MessageSquare className="w-4 h-4" />, label: "Suggesting" },
                        { icon: <Eye className="w-4 h-4" />, label: "Viewing" }
                    ]
                },
                { type: "separator" },
                { icon: <Layout className="w-4 h-4" />, label: "Print Layout", shortcut: "" },
                { icon: <Ruler className="w-4 h-4" />, label: "Show Rulers", shortcut: "" },
                { icon: <Layers className="w-4 h-4" />, label: "Show Outline", shortcut: "Ctrl+Alt+A" },
                { type: "separator" },
                { icon: <Maximize className="w-4 h-4" />, label: "Full Screen", shortcut: "" },
            ]
        },
        {
            label: "Insert",
            children: [
                { icon: <Image className="w-4 h-4" />, label: "Media Object", shortcut: "" },
                { icon: <Table className="w-4 h-4" />, label: "Data Grid", shortcut: "" },
                { icon: <PenTool className="w-4 h-4" />, label: "Canvas Drawing", shortcut: "" },
                { icon: <Minus className="w-4 h-4" />, label: "Horizontal Rule", shortcut: "" },
                { icon: <Calendar className="w-4 h-4" />, label: "Smart Date", shortcut: "@date" },
                { icon: <ChevronDown className="w-4 h-4" />, label: "Dropdown Chip", shortcut: "@drop" },
            ]
        },
        {
            label: "Format",
            children: [
                {
                    icon: <Bold className="w-4 h-4" />,
                    label: "Typography",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <Bold className="w-4 h-4" />, label: "Bold", shortcut: "Ctrl+B" },
                        { icon: <Italic className="w-4 h-4" />, label: "Italic", shortcut: "Ctrl+I" },
                        { icon: <Underline className="w-4 h-4" />, label: "Underline", shortcut: "Ctrl+U" },
                        { icon: <Strikethrough className="w-4 h-4" />, label: "Strikethrough", shortcut: "Alt+Shift+5" },
                        { icon: <Superscript className="w-4 h-4" />, label: "Superscript", shortcut: "Ctrl+." },
                        { icon: <Subscript className="w-4 h-4" />, label: "Subscript", shortcut: "Ctrl+," }
                    ]
                },
                {
                    icon: <Pilcrow className="w-4 h-4" />,
                    label: "Paragraph Styles",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <Pilcrow className="w-4 h-4" />, label: "Normal text" },
                        { icon: <Heading1 className="w-4 h-4" />, label: "Title" },
                        { icon: <Heading2 className="w-4 h-4" />, label: "Subtitle" },
                        { icon: <Heading1 className="w-4 h-4" />, label: "Heading 1" },
                        { icon: <Heading2 className="w-4 h-4" />, label: "Heading 2" },
                        { icon: <Heading3 className="w-4 h-4" />, label: "Heading 3" }
                    ]
                },
                {
                    icon: <AlignLeft className="w-4 h-4" />,
                    label: "Alignment & Indent",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <AlignLeft className="w-4 h-4" />, label: "Left" },
                        { icon: <AlignCenter className="w-4 h-4" />, label: "Center" },
                        { icon: <AlignRight className="w-4 h-4" />, label: "Right" },
                        { icon: <AlignJustify className="w-4 h-4" />, label: "Justified" }
                    ]
                },
                {
                    icon: <List className="w-4 h-4" />,
                    label: "Bullets & Numbering",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <ListOrdered className="w-4 h-4" />, label: "Numbered list" },
                        { icon: <List className="w-4 h-4" />, label: "Bulleted list" }
                    ]
                },
                { type: "separator" },
                { icon: <RemoveFormatting className="w-4 h-4" />, label: "Clear Styles", shortcut: "Ctrl+\\" },
            ]
        },
        {
            label: "Tools",
            children: [
                { icon: <CheckCheck className="w-4 h-4" />, label: "Spell Check", shortcut: "Ctrl+Alt+X" },
                { icon: <BarChart className="w-4 h-4" />, label: "Word Count", shortcut: "Ctrl+Shift+C" },
                { icon: <GitCompare className="w-4 h-4" />, label: "Compare Documents", shortcut: "" },
                { icon: <Quote className="w-4 h-4" />, label: "Citations", shortcut: "" },
                { type: "separator" },
                { icon: <FileJson className="w-4 h-4" />, label: "Linked Objects", shortcut: "" },
            ]
        },
        {
            label: "Extensions",
            children: [
                { icon: <Puzzle className="w-4 h-4" />, label: "Manage Add-ons", shortcut: "" },
                { icon: <Code className="w-4 h-4" />, label: "Apps Script", shortcut: "" },
                {
                    icon: <Zap className="w-4 h-4" />,
                    label: "AppSheet",
                    hasSubmenu: true,
                    submenu: [
                        { icon: <PlusCircle className="w-4 h-4" />, label: "Create an app" },
                        { icon: <LayoutTemplate className="w-4 h-4" />, label: "View sample apps" }
                    ]
                },
            ]
        },
        {
            label: "Help",
            children: [
                { icon: <Book className="w-4 h-4" />, label: "Documentation", shortcut: "" },
                { icon: <GraduationCap className="w-4 h-4" />, label: "Training", shortcut: "" },
                { icon: <Bell className="w-4 h-4" />, label: "Updates", shortcut: "" },
                { type: "separator" },
                { icon: <MessageSquareWarning className="w-4 h-4" />, label: "Report Issue", shortcut: "" },
            ]
        }
    ]

    return (
        <header className="flex items-center px-4 py-2 gap-4 select-none relative z-50">
            {/* Logo */}
            <div className="bg-blue-600 rounded-full p-2 px-4 cursor-pointer hover:bg-blue-700 transition">
                <h1 className="text-white font-semibold">Studio Docs · 3.0</h1>
            </div>

            {/* Title & Menu */}
            <div className="flex-1">
                <div className="flex items-center gap-3">
                    {isEditingTitle ? (
                        <Input
                            ref={titleInputRef}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={finishEditingTitle}
                            onKeyDown={handleTitleKeyDown}
                            maxLength={50}
                            className={`h-7 px-1.5 py-0.5 text-lg font-medium border border-blue-500 rounded focus-visible:ring-2 focus-visible:ring-blue-500/20 w-[240px] ${isDarkMode ? "bg-[#191919] text-gray-200" : "bg-white text-gray-800"}`}
                        />
                    ) : (
                        <h1
                            onClick={() => setIsEditingTitle(true)}
                            className={`text-lg font-medium px-1.5 py-0.5 rounded border border-transparent hover:border-black/20 cursor-text transition-colors ${isDarkMode ? "text-gray-200 hover:border-white/20" : "text-gray-800"}`}
                        >
                            {title}
                        </h1>
                    )}
                    <div className="flex items-center gap-1 text-gray-500">
                        <Star className="w-4 h-4 hover:fill-yellow-400 hover:text-yellow-400 cursor-pointer" />
                    </div>
                </div>

                {/* Menus */}
                <div className={`flex gap-1 text-[13px] mt-0.5 transition-colors relative ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} ref={menuRef}>
                    {MENU_ITEMS.map((item: any) => (
                        <div key={item.label} className="relative">
                            <button
                                onClick={() => {
                                    if (item.action) {
                                        item.action()
                                        setActiveMenu(null)
                                    } else {
                                        setActiveMenu(activeMenu === item.label ? null : item.label)
                                    }
                                }}
                                onMouseEnter={() => { if (activeMenu) setActiveMenu(item.label) }}
                                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeMenu === item.label ? (isDarkMode ? "bg-white/20 text-white" : "bg-black/10 text-black") : (isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5")}`}
                            >
                                {item.label}
                            </button>

                            {/* Dropdown Menu */}
                            {activeMenu === item.label && item.children && (
                                <div className={`absolute top-full left-0 mt-1 w-64 rounded-lg shadow-xl border border-white/5 py-1.5 z-[100] animate-in fade-in zoom-in-95 duration-100 ${isDarkMode ? "bg-[#1e1e1e] border-white/5" : "bg-white border-white/5"}`}>
                                    {item.children.map((child: any, idx: number) => {
                                        if (child.type === "separator") {
                                            return <Separator key={idx} className={`my-1.5 ${isDarkMode ? "bg-white/5" : "bg-gray-200"}`} />
                                        }

                                        return (
                                            <div key={idx} className="relative group">
                                                <button
                                                    onClick={() => {
                                                        if (child.action) {
                                                            child.action()
                                                            setActiveMenu(null)
                                                        }
                                                    }}
                                                    className={`w-full text-left flex items-center gap-3 px-4 py-1.5 text-[13px] transition-colors
                                                    ${isDarkMode ? "text-gray-200 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                                                >
                                                    <span className={`w-4 h-4 flex items-center justify-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                        {child.icon}
                                                    </span>
                                                    <span className="flex-1">{child.label}</span>
                                                    {child.shortcut && <span className={`text-[11px] ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{child.shortcut}</span>}
                                                    {child.hasSubmenu && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
                                                </button>

                                                {/* Submenu */}
                                                {child.submenu && (
                                                    <div className={`absolute left-full top-0 w-56 rounded-lg shadow-xl border border-white/5 py-1.5 hidden group-hover:block ml-0.5 ${isDarkMode ? "bg-[#1e1e1e] border-white/5" : "bg-white border-white/5"}`}>
                                                        {child.submenu.map((subItem: any, subIdx: number) => (
                                                            <button
                                                                key={subIdx}
                                                                onClick={() => {
                                                                    if (subItem.action) {
                                                                        subItem.action()
                                                                        setActiveMenu(null)
                                                                    }
                                                                }}
                                                                className={`w-full text-left flex items-center gap-3 px-4 py-1.5 text-[13px] transition-colors
                                                                ${isDarkMode ? "text-gray-200 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                                                            >
                                                                {subItem.icon && (
                                                                    <span className={`w-4 h-4 flex items-center justify-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                                                        {subItem.icon}
                                                                    </span>
                                                                )}
                                                                <span className={subItem.icon ? "flex-1" : "flex-1 pl-7"}>{subItem.label}</span>
                                                                {subItem.shortcut && <span className={`text-[11px] ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{subItem.shortcut}</span>}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsWriteOSOpen(true)}
                    className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full text-[14px] font-medium transition-all duration-300 border backdrop-blur-md shadow-lg
                    ${isDarkMode ? "bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/20 text-white" : "bg-white border-black/5 hover:bg-white/10 hover:border-black/10 text-black"}`}
                >
                    <span className="font-semibold">Try WriteOS</span>
                </button>

                <button
                    onClick={() => setIsMobileViewOpen(true)}
                    className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isDarkMode ? "hover:bg-white/10 text-gray-400" : "text-gray-600"}`}
                    title="View on Mobile"
                >
                    <QrCode className="w-5 h-5" />
                </button>

                <button className={`p-2 rounded-full hover:bg-black/5 transition-colors ${isDarkMode ? "hover:bg-white/10 text-gray-400" : "text-gray-600"}`}>
                    <MessageSquare className="w-5 h-5" />
                </button>

                <div
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full cursor-pointer hover:bg-black/5 transition-colors ${isDarkMode ? "hover:bg-white/10 text-gray-400" : "text-gray-600"}`}
                >
                    {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
                </div>

                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all">
                    R
                </div>
            </div>


            {/* Mobile View Modal */}
            {
                isMobileViewOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 w-[320px] relative animate-in zoom-in-95 duration-200">
                            <button
                                onClick={() => setIsMobileViewOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center gap-4 pt-2">
                                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                                    <Smartphone className="w-6 h-6 text-white" />
                                </div>

                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900">View on Mobile</h3>
                                    <p className="text-xs text-gray-500 mt-1">Scan to view this doc on your phone</p>
                                </div>

                                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-inner min-h-[148px] min-w-[148px] flex items-center justify-center relative">
                                    {!isQrLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                        </div>
                                    )}
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://studio.loopsync.cloud/doc/${id || "demo"}`}
                                        alt="QR Code"
                                        className={`w-32 h-32 rounded-lg transition-opacity duration-300 ${isQrLoaded ? "opacity-100" : "opacity-0"}`}
                                        onLoad={() => setIsQrLoaded(true)}
                                    />
                                </div>

                                <div className="w-full flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                    <span className="text-[10px] text-gray-500 truncate flex-1 font-mono">
                                        https://studio.loopsync.cloud/doc/{id || "demo"}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="text-[10px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                    >
                                        {isCopied ? "Copied" : "Copy"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* WriteOS Modal */}
            {
                isWriteOSOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-transparent backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="relative w-[600px] h-[400px] rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300 ring-1 ring-white/10 group">

                            {/* Content */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-black/20">
                                <button
                                    onClick={() => setIsWriteOSOpen(false)}
                                    className="absolute top-6 right-6 p-2 rounded-full bg-black text-white hover:text-white hover:bg-black/40 transition-colors backdrop-blur-sm border border-white/5"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                                    <div className="space-y-2 text-center">
                                        <h2 className="text-7xl font-bold text-white tracking-tighter drop-shadow-2xl">WriteOS</h2>
                                        <p className="text-white text-sm font-medium tracking-wide uppercase opacity-100">Next Gen Writing Experience</p>
                                    </div>

                                    <div className="flex w-full gap-2 p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl">
                                        <Input
                                            placeholder="Describe your goal..."
                                            className="bg-transparent border-transparent text-white placeholder:text-white/40 focus-visible:ring-0 h-10"
                                        />
                                        <Button className="bg-white text-black hover:bg-gray-200 font-semibold rounded-lg h-10 px-6 transition-all hover:scale-105 active:scale-95">
                                            Start
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Open Modal */}
            {
                isOpenModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[800px] h-[500px] flex overflow-hidden animate-in zoom-in-95 duration-200">
                            {/* Sidebar */}
                            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                                <h3 className="font-semibold text-gray-900 mb-4 px-2">Open File</h3>
                                <div className="space-y-1">
                                    <button className="w-full text-left px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-medium text-sm">Uploads</button>
                                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 text-sm">My Files</button>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="flex-1 p-6 relative">
                                <button onClick={() => setIsOpenModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="items-center justify-center rounded-xl h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                                    <FolderOpen className="w-12 h-12 text-gray-300" />
                                    <div className="text-center">
                                        <p className="font-medium text-gray-900">Drag & Drop files here</p>
                                        <p className="text-sm mt-1">or click to browse</p>
                                    </div>
                                    <Button className="mt-2 bg-black/5 rounded-full text-black hover:text-black cursor-pointer">Select from Computer</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Share Modal */}
            {
                isShareModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[500px] p-6 animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-lg text-gray-900">Share "{title}"</h3>
                                <button onClick={() => setIsShareModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <Input placeholder="Add people, groups, or calendar events" className="w-full" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">R</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Owner</p>
                                            <p className="text-xs text-gray-500">ripun@loopsync.cloud</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">Owner</span>
                                </div>
                                <div className="pt-2 flex justify-between items-center">
                                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                                        <Copy className="w-4 h-4" /> Copy link
                                    </button>
                                    <Button onClick={() => setIsShareModal(false)} className="bg-black/5 text-black rounded-full hover:text-black cursor-pointer">Done</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Trash Warning Modal */}
            {
                isTrashModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6 animate-in zoom-in-95 duration-200 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">Move to Trash?</h3>
                            <p className="text-sm text-gray-500 mb-6">This document will be moved to trash and permanently deleted after 30 days.</p>
                            <div className="flex gap-3 justify-center">
                                <Button onClick={() => setIsTrashModal(false)} className="bg-black/5 text-black rounded-full hover:text-black cursor-pointer">Cancel</Button>
                                <Button onClick={() => setIsTrashModal(false)} className="bg-red-700 text-white rounded-full hover:bg-red-800 hover:text-white cursor-pointer">Move to Trash</Button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* WriteOS History Modal */}
            {
                isHistoryModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[700px] h-[500px] flex flex-col animate-in zoom-in-95 duration-200">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-gray-900">WriteOS History</h3>
                                <button onClick={() => setIsHistoryModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-0">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-3">Time</th>
                                            <th className="px-6 py-3">Prompt</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-gray-500">10:42 AM</td>
                                            <td className="px-6 py-3 text-gray-900">Draft a blog post abou...</td>
                                            <td className="px-6 py-3"><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Inserted</span></td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-3 text-gray-500">10:10 PM</td>
                                            <td className="px-6 py-3 text-gray-900">Fix grammar in selecti...</td>
                                            <td className="px-6 py-3"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Replaced</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Details Modal */}
            {
                isDetailsModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[400px] p-6 animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-lg text-gray-900">Document Details</h3>
                                <button onClick={() => setIsDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Type</span>
                                    <span className="text-sm font-medium text-gray-900">Studio Docs</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Location</span>
                                    <span className="text-sm font-medium text-gray-900">My Drive / Projects</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Owner</span>
                                    <span className="text-sm font-medium text-gray-900">me</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm text-gray-500">Modified</span>
                                    <span className="text-sm font-medium text-gray-900">10:45 AM by me</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-sm text-gray-500">Created</span>
                                    <span className="text-sm font-medium text-gray-900">Dec 18, 2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Page Setup Drawer */}
            {/* Page Setup Drawer */}
            {isPageSetupOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsPageSetupOpen(false)}
                />
            )}
            <div className={`fixed inset-y-0 left-0 w-80 shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out ${isPageSetupOpen ? "translate-x-0" : "-translate-x-full"} ${isDarkMode ? "bg-[#1e1e1e] border-r border-white/5" : "bg-white"}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>Page Setup</h3>
                        <button onClick={() => setIsPageSetupOpen(false)} className={`${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"}`}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto">
                        <div>
                            <label className={`text-sm font-medium block mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Orientation</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setPageSetup(prev => ({ ...prev, orientation: "portrait" }))}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${pageSetup.orientation === "portrait" ? (isDarkMode ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-blue-600 bg-blue-50 text-blue-700") : (isDarkMode ? "border-white/10 hover:bg-white/5 text-gray-400" : "border-gray-200 hover:bg-gray-50 text-gray-600")}`}
                                >
                                    <FileIcon className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">Portrait</span>
                                </button>
                                <button
                                    onClick={() => setPageSetup(prev => ({ ...prev, orientation: "landscape" }))}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all ${pageSetup.orientation === "landscape" ? (isDarkMode ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-blue-600 bg-blue-50 text-blue-700") : (isDarkMode ? "border-white/10 hover:bg-white/5 text-gray-400" : "border-gray-200 hover:bg-gray-50 text-gray-600")}`}
                                >
                                    <FileIcon className="w-6 h-6 mb-2 rotate-90" />
                                    <span className="text-xs font-medium">Landscape</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className={`text-sm font-medium block mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Paper Size</label>
                            <select
                                value={pageSetup.paperSize}
                                onChange={(e) => setPageSetup(prev => ({ ...prev, paperSize: e.target.value as any }))}
                                className={`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                            >
                                <option value="A4">A4 (21cm x 29.7cm)</option>
                                <option value="Letter">Letter (8.5" x 11")</option>
                                <option value="Legal">Legal (8.5" x 14")</option>
                            </select>
                        </div>

                        <div>
                            <label className={`text-sm font-medium block mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Font Family</label>
                            <select
                                value={pageSetup.fontFamily}
                                onChange={(e) => setPageSetup(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                                className={`w-full h-10 px-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}
                            >
                                <option value="Inter" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>Inter</option>
                                <option value="Roboto" style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>Roboto</option>
                                <option value="Merriweather" style={{ fontFamily: 'var(--font-merriweather), serif' }}>Merriweather</option>
                                <option value="Courier Prime" style={{ fontFamily: 'var(--font-courier-prime), monospace' }}>Courier Prime</option>
                                <option value="Comic Sans MS" style={{ fontFamily: '"Comic Sans MS", cursive' }}>Comic Sans MS</option>
                            </select>
                        </div>

                        <div>
                            <label className={`text-sm font-medium block mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Margins (cm)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">Top</span>
                                    <Input
                                        type="number"
                                        value={pageSetup.margins.top}
                                        onChange={(e) => setPageSetup(prev => ({ ...prev, margins: { ...prev.margins, top: parseFloat(e.target.value) || 0 } }))}
                                        className={`h-9 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : ""}`}
                                    />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">Bottom</span>
                                    <Input
                                        type="number"
                                        value={pageSetup.margins.bottom}
                                        onChange={(e) => setPageSetup(prev => ({ ...prev, margins: { ...prev.margins, bottom: parseFloat(e.target.value) || 0 } }))}
                                        className={`h-9 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : ""}`}
                                    />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">Left</span>
                                    <Input
                                        type="number"
                                        value={pageSetup.margins.left}
                                        onChange={(e) => setPageSetup(prev => ({ ...prev, margins: { ...prev.margins, left: parseFloat(e.target.value) || 0 } }))}
                                        className={`h-9 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : ""}`}
                                    />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 mb-1 block">Right</span>
                                    <Input
                                        type="number"
                                        value={pageSetup.margins.right}
                                        onChange={(e) => setPageSetup(prev => ({ ...prev, margins: { ...prev.margins, right: parseFloat(e.target.value) || 0 } }))}
                                        className={`h-9 ${isDarkMode ? "bg-[#252525] border-white/10 text-gray-200" : ""}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`pt-6 border-t ${isDarkMode ? "border-white/10" : "border-gray-100"}`}>
                        <Button className={`w-full rounded-full h-12 cursor-pointer ${isDarkMode ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:text-black"}`} onClick={() => setIsPageSetupOpen(false)}>Done</Button>
                    </div>
                </div>
            </div>

            {/* Print Modal */}
            {
                isPrintModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-xl shadow-2xl w-[900px] h-[600px] flex overflow-hidden animate-in zoom-in-95 duration-200">
                            {/* Print Settings */}
                            <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
                                <h3 className="font-semibold text-lg text-gray-900 mb-6">Print</h3>
                                <div className="space-y-6 flex-1">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Destination</label>
                                        <select className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white">
                                            <option>Save as PDF</option>
                                            <option>Canon G3010 Series</option>
                                            <option>Microsoft Print to PDF</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Pages</label>
                                        <select className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white">
                                            <option>All</option>
                                            <option>Custom</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
                                        <select className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm bg-white">
                                            <option>Black & White</option>
                                            <option>Color</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-6 border-t border-gray-200">
                                    <Button variant="outline" className="flex-1" onClick={() => setIsPrintModal(false)}>Cancel</Button>
                                    <Button className="flex-1">Print</Button>
                                </div>
                            </div>
                            {/* Preview */}
                            <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center overflow-auto">
                                <div className="bg-white w-[400px] h-[560px] shadow-sm flex flex-col p-8 mb-4">
                                    <div className="space-y-4">
                                        <div className="h-4 bg-gray-100 w-3/4 rounded" />
                                        <div className="h-3 bg-gray-100 w-full rounded" />
                                        <div className="h-3 bg-gray-100 w-full rounded" />
                                        <div className="h-3 bg-gray-100 w-5/6 rounded" />
                                        <div className="space-y-2 mt-8">
                                            <div className="h-3 bg-gray-100 w-full rounded" />
                                            <div className="h-3 bg-gray-100 w-full rounded" />
                                            <div className="h-3 bg-gray-100 w-4/5 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </header >
    )
}
