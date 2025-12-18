"use client"

import {
    Search, Undo, Redo, Printer, PaintBucket,
    ChevronDown, Minus, Plus, Bold, Italic, Underline,
    Type, Link as LinkIcon, Image as ImageIcon,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Indent, Outdent, CheckSquare,
    Strikethrough
} from "lucide-react"
import { useDocs } from "./docs-context"
import { Editor } from "@tiptap/react"
import { useCallback } from "react"

export function DocsToolbar() {
    const { isDarkMode, editor, pageSetup, setPageSetup } = useDocs()

    const toggleWrap = useCallback((callback: () => void) => {
        if (editor) {
            callback()
        }
    }, [editor])

    if (!editor) return null

    return (
        <div className={`flex items-center gap-1 px-4 py-1.5 rounded-[24px] mx-3 mb-2 overflow-x-auto transition-colors duration-300 ${isDarkMode ? "bg-[#2E2E2E]" : "bg-[#EDF2FA]"}`}>
            <div className={`flex items-center gap-1 pr-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <ToolBtn icon={<Undo className="w-4 h-4" />} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
                <ToolBtn icon={<Redo className="w-4 h-4" />} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
                <ToolBtn icon={<Printer className="w-4 h-4" />} onClick={() => window.print()} />
            </div>

            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"}`}>
                    <span className="text-sm">100%</span>
                    <ChevronDown className={`w-3 h-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </div>
            </div>

            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer min-w-[100px] justify-between ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"}`}>
                    <span className="text-sm truncate">Normal text</span>
                    <ChevronDown className={`w-3 h-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </div>
            </div>

            <div className={`flex items-center gap-2 px-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer min-w-[120px] justify-between ${isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"}`}>
                    <select
                        className="bg-transparent text-sm w-full outline-none appearance-none"
                        value={pageSetup.fontFamily}
                        onChange={(e) => setPageSetup(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                    >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Merriweather">Merriweather</option>
                        <option value="Courier Prime">Courier Prime</option>
                        <option value="Comic Sans MS">Comic Sans</option>
                    </select>
                    <ChevronDown className={`w-3 h-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                </div>
            </div>

            <div className={`flex items-center gap-1 px-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
                <ToolBtn icon={<Minus className="w-3 h-3" />} />
                <div className={`w-8 text-center text-sm border rounded px-1 min-h-[24px] flex items-center justify-center cursor-text ${isDarkMode ? "bg-[#191919] border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}>
                    11
                </div>
                <ToolBtn icon={<Plus className="w-3 h-3" />} />
            </div>

            <div className={`flex items-center gap-1 px-2 border-r ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}>
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

            <div className="flex items-center gap-1 px-2">
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

                <div className={`mx-1 w-px h-4 ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`} />

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
        </div>
    )
}

function ToolBtn({ icon, label, bold: isBold, italic: isItalic, underline: isUnderline, isActive, onClick, disabled }: any) {
    const { isDarkMode } = useDocs()
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
            p-1.5 rounded flex items-center justify-center min-w-[28px] min-h-[28px] transition-colors
            ${isActive
                    ? (isDarkMode ? "bg-white/20 text-white" : "bg-black/10 text-black")
                    : (isDarkMode ? "text-gray-300 hover:bg-white/10" : "text-gray-700 hover:bg-black/5")
                }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${isBold ? "font-bold" : ""}
            ${isItalic ? "italic font-serif" : ""}
            ${isUnderline ? "underline" : ""}
        `}>
            {icon ? icon : label}
        </button>
    )
}
