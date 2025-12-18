"use client"

import {
    Search, Undo, Redo, Printer, PaintBucket,
    ChevronDown, Minus, Plus, Bold, Italic, Underline,
    Type, Link as LinkIcon, Image as ImageIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Indent, Outdent, CheckSquare,
    Strikethrough, ChevronUp
} from "lucide-react"
import { useDocs } from "./docs-context"
import { Editor } from "@tiptap/react"
import { useCallback, useState, useEffect, useRef } from "react"

export function DocsToolbar() {
    const { isDarkMode, editor, pageSetup, setPageSetup } = useDocs()
    const [_, forceUpdate] = useState(0)

    useEffect(() => {
        if (!editor) return

        const handleUpdate = () => forceUpdate(prev => prev + 1)

        editor.on('transaction', handleUpdate)
        editor.on('selectionUpdate', handleUpdate)

        return () => {
            editor.off('transaction', handleUpdate)
            editor.off('selectionUpdate', handleUpdate)
        }
    }, [editor])

    const toggleWrap = useCallback((callback: () => void) => {
        if (editor) {
            callback()
        }
    }, [editor])

    if (!editor) return null

    // Get current font family from selection or fall back to 'Inter' (default)
    const currentFont = editor.getAttributes('textStyle').fontFamily || 'Inter'

    // Get current font size
    let currentFontSize = '11'

    // Check for mixed selection
    const { selection } = editor.state
    let isMixed = false
    let firstSize: string | null = null

    if (selection && !selection.empty) {
        editor.state.doc.nodesBetween(selection.from, selection.to, (node) => {
            if (node.isText) {
                const marks = node.marks
                const style = marks.find(m => m.type.name === 'textStyle')
                const size = style ? style.attrs.fontSize : '11pt' // Default logic

                if (firstSize === null) {
                    firstSize = size
                } else if (firstSize !== size) {
                    isMixed = true
                }
            }
        })
    }

    if (isMixed) {
        currentFontSize = 'Mixed'
    } else {
        // If not mixed, just use the standard getAttributes (which works for cursor or single-style selection)
        const attrSize = editor.getAttributes('textStyle').fontSize
        currentFontSize = attrSize ? String(parseInt(String(attrSize).replace('pt', ''))) : '11'
    }

    // Heading helper
    const getCurrentHeading = () => {
        if (editor.isActive('heading', { level: 1 })) return 'Title'
        if (editor.isActive('heading', { level: 2 })) return 'Subtitle'
        if (editor.isActive('heading', { level: 3 })) return 'Heading 1'
        if (editor.isActive('heading', { level: 4 })) return 'Heading 2'
        if (editor.isActive('heading', { level: 5 })) return 'Heading 3'
        return 'Normal text'
    }

    const currentHeading = getCurrentHeading()

    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mx-4 mb-3 overflow-x-visible transition-all duration-300 ${isDarkMode ? "bg-[#1e1e1e] border border-white/10" : "bg-white border border-gray-200 shadow-sm"}`}>

            {/* History Controls */}
            <div className={`flex items-center gap-0.5 pr-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <ToolBtn icon={<Undo className="w-4 h-4" />} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
                <ToolBtn icon={<Redo className="w-4 h-4" />} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
                <ToolBtn icon={<Printer className="w-4 h-4" />} onClick={() => window.print()} />
            </div>

            {/* Scale (Zoom) - Placeholder for now */}
            <div className={`flex items-center gap-1 px-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer transition-colors ${isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-100"}`}>
                    <span className="text-sm font-medium">100%</span>
                    <ChevronDown className={`w-3 h-3 opacity-50`} />
                </div>
            </div>

            {/* Text Style Dropdown */}
            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <Dropdown
                    value={currentHeading}
                    options={[
                        { label: 'Normal text', value: 'Normal text' },
                        { label: 'Title', value: 'Title', className: 'text-xl font-bold' },
                        { label: 'Subtitle', value: 'Subtitle', className: 'text-lg text-gray-500' },
                        { label: 'Heading 1', value: 'Heading 1', className: 'text-lg font-bold' },
                        { label: 'Heading 2', value: 'Heading 2', className: 'text-base font-bold' },
                        { label: 'Heading 3', value: 'Heading 3', className: 'text-sm font-bold' },
                    ]}
                    onChange={(val) => {
                        if (val === 'Normal text') editor.chain().focus().setParagraph().run()
                        if (val === 'Title') editor.chain().focus().toggleHeading({ level: 1 }).run()
                        if (val === 'Subtitle') editor.chain().focus().toggleHeading({ level: 2 }).run()
                        if (val === 'Heading 1') editor.chain().focus().toggleHeading({ level: 3 }).run()
                        if (val === 'Heading 2') editor.chain().focus().toggleHeading({ level: 4 }).run()
                        if (val === 'Heading 3') editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }}
                    width="w-[140px]"
                />
            </div>

            {/* Font Family Dropdown */}
            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <Dropdown
                    value={currentFont}
                    options={[
                        { label: 'Inter', value: 'Inter', className: 'font-sans' },
                        { label: 'Roboto', value: 'Roboto', className: 'font-sans' },
                        { label: 'Merriweather', value: 'Merriweather', className: 'font-serif' },
                        { label: 'Courier Prime', value: 'Courier Prime', className: 'font-mono' },
                        { label: 'Comic Sans MS', value: 'Comic Sans MS', className: 'font-comic' },
                    ]}
                    onChange={(val) => editor.chain().focus().setFontFamily(val).run()}
                    width="w-[130px]"
                />
            </div>

            {/* Font Size Control (Apple Style) */}
            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <div className={`flex items-center rounded-lg px-2 py-1.5 ${isDarkMode ? "bg-black/20" : "bg-gray-50 border border-gray-200"}`}>
                    <div className="w-10 flex items-center justify-center relative">
                        <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            <FontSizeInput
                                sizeValue={currentFontSize}
                                onChange={(size) => {
                                    // @ts-ignore
                                    editor.chain().focus().setFontSize(`${size}pt`).run()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Formatting */}
            <div className={`flex items-center gap-0.5 px-2 border-r ${isDarkMode ? "border-white/10" : "border-gray-200"}`}>
                <ToolBtn
                    label="B"
                    bold
                    isActive={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolBtn
                    label="I"
                    italic
                    isActive={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolBtn
                    label="U"
                    underline
                    isActive={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <ToolBtn
                    icon={<Strikethrough className="w-4 h-4" />}
                    isActive={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />
            </div>

            {/* Alignments & Lists */}
            <div className="flex items-center gap-0.5 px-2">
                <ToolBtn
                    icon={<AlignLeft className="w-4 h-4" />}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                />
                <ToolBtn
                    icon={<AlignCenter className="w-4 h-4" />}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                />
                <ToolBtn
                    icon={<AlignRight className="w-4 h-4" />}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                />

                <div className={`mx-1 w-px h-4 ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />

                <ToolBtn
                    icon={<List className="w-4 h-4" />}
                    isActive={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolBtn
                    icon={<ListOrdered className="w-4 h-4" />}
                    isActive={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                />
                <ToolBtn
                    icon={<CheckSquare className="w-4 h-4" />}
                    isActive={editor.isActive('taskList')}
                    onClick={() => editor.chain().focus().toggleTaskList?.().run()}
                    disabled={!editor.can().toggleTaskList}
                />
            </div>

            <style jsx global>{`
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
            `}</style>
        </div>
    )
}

// --- Components ---

function ToolBtn({ icon, label, bold: isBold, italic: isItalic, underline: isUnderline, isActive, onClick, disabled }: any) {
    const { isDarkMode } = useDocs()
    return (
        <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            disabled={disabled}
            className={`
            p-1.5 rounded-md flex items-center justify-center min-w-[28px] min-h-[28px] transition-all duration-200
            ${isActive
                    ? (isDarkMode ? "bg-white text-black shadow-sm" : "bg-black text-white shadow-md")
                    : (isDarkMode ? "text-gray-400 hover:bg-white/10 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
                }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${isBold ? "font-bold" : ""}
            ${isItalic ? "italic font-serif" : ""}
            ${isUnderline ? "underline" : ""}
        `}>
            {icon ? icon : <span className="text-sm">{label}</span>}
        </button>
    )
}

function Dropdown({ value, options, onChange, width = "w-32" }: { value: string, options: any[], onChange: (val: string) => void, width?: string }) {
    const { isDarkMode } = useDocs()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedOption = options.find(o => o.value === value) || options[0]

    return (
        <div className="relative" ref={ref}>
            <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between ${width} px-2.5 py-1.5 rounded-lg text-sm transition-all duration-200 ${isDarkMode
                    ? "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/5"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                    } ${isOpen ? "ring-2 ring-blue-500/50" : ""}`}
            >
                <span className="truncate">{selectedOption.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 opacity-50 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className={`absolute top-full left-0 mt-1 w-[160px] z-50 rounded-lg shadow-xl overflow-hidden py-1 border backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 ${isDarkMode
                    ? "bg-[#1e1e1e]/90 border-white/10"
                    : "bg-white/90 border-gray-200"
                    }`}>
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onMouseDown={(e) => e.preventDefault()}
                            className={`w-full text-left px-3 py-1.5 text-sm flex items-center justify-between transition-colors ${isDarkMode
                                ? "hover:bg-white/10 text-gray-300"
                                : "hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                                } ${opt.value === value ? (isDarkMode ? "bg-white/10 text-white" : "bg-blue-50 text-blue-600") : ""} ${opt.className || ''}`}
                            onClick={() => {
                                onChange(opt.value)
                                setIsOpen(false)
                            }}
                        >
                            <span>{opt.label}</span>
                            {opt.value === value && <CheckSquare className="w-3 h-3 opacity-50" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

const MIN_FONT_SIZE = 8
const MAX_FONT_SIZE = 72

function FontSizeInput({ sizeValue, onChange }: { sizeValue: string, onChange: (size: number) => void }) {
    const [value, setValue] = useState(sizeValue)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (!isFocused) {
            setValue(sizeValue)
        }
    }, [sizeValue, isFocused])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value
        setValue(newVal)

        const val = parseInt(newVal)
        if (!isNaN(val)) {
            if (val >= MIN_FONT_SIZE && val <= MAX_FONT_SIZE) {
                onChange(val)
            }
        }
    }

    const handleBlur = () => {
        setIsFocused(false)
        let val = parseInt(value)

        if (isNaN(val)) {
            setValue(sizeValue)
            return
        }

        if (val < MIN_FONT_SIZE) val = MIN_FONT_SIZE
        if (val > MAX_FONT_SIZE) val = MAX_FONT_SIZE

        setValue(val.toString())
        onChange(val)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur()
            // @ts-ignore
            e.target.blur()
        }
    }

    return (
        <input
            type="text"
            className="w-full h-full bg-transparent text-center outline-none font-medium"
            value={value}
            onChange={handleInputChange}
            onFocus={() => {
                setIsFocused(true)
                if (value === 'Mixed') setValue('')
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        />
    )
}
