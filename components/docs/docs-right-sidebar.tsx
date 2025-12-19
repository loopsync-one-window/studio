"use client"

import { Calendar, Lightbulb, CheckSquare, User, Plus, Trash2, Rows, Columns, Grid, Split, Merge, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Crop, CornerDownLeft } from "lucide-react"
import { useDocs } from "./docs-context"
import { useEffect, useState } from "react"

export function DocsRightSidebar() {
    const { isDarkMode, editor } = useDocs()
    const [isTableActive, setIsTableActive] = useState(false)
    const [isImageActive, setIsImageActive] = useState(false)

    useEffect(() => {
        if (!editor) return

        const updateStatus = () => {
            setIsTableActive(editor.isActive('table'))
            setIsImageActive(editor.isActive('image'))
        }

        editor.on('selectionUpdate', updateStatus)
        editor.on('transaction', updateStatus)
        updateStatus()

        return () => {
            editor.off('selectionUpdate', updateStatus)
            editor.off('transaction', updateStatus)
        }
    }, [editor])

    return (
        <>
            <div className="fixed right-4 top-50 flex flex-col gap-4 z-50">
                <SideIcon icon={<Calendar className="w-5 h-5" />} />
                <SideIcon icon={<Lightbulb className="w-5 h-5" />} />
                <SideIcon icon={<CheckSquare className="w-5 h-5" />} />
                <SideIcon icon={<User className="w-5 h-5" />} />
                <div className={`w-8 h-[1px] my-2 ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}></div>
                <SideIcon icon={<Plus className="w-5 h-5" />} />
            </div>

            {/* Table Drawer */}
            <div className={`fixed right-16 top-50 w-64 rounded-xl shadow-xl transition-all duration-300 transform origin-right ${isTableActive ? "scale-100 opacity-100 translate-x-0" : "scale-95 opacity-0 translate-x-8 pointer-events-none"} ${isDarkMode ? "bg-[#1e1e1e] border border-white/10" : "bg-white border border-gray-200"}`}>
                <div className={`p-4 border-b ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
                    <h3 className={`font-semibold text-sm ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Table Properties</h3>
                </div>
                <div className="p-2 space-y-1">
                    <TableActionButton onClick={() => editor?.chain().focus().addColumnBefore().run()} label="Add Col Left" icon={<Columns className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().addColumnAfter().run()} label="Add Col Right" icon={<Columns className="w-4 h-4" />} />
                    <div className={`h-[1px] my-1 ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`} />
                    <TableActionButton onClick={() => editor?.chain().focus().addRowBefore().run()} label="Add Row Above" icon={<Rows className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().addRowAfter().run()} label="Add Row Below" icon={<Rows className="w-4 h-4" />} />
                    <div className={`h-[1px] my-1 ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`} />
                    <TableActionButton onClick={() => editor?.chain().focus().deleteColumn().run()} label="Delete Column" icon={<Trash2 className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().deleteRow().run()} label="Delete Row" icon={<Trash2 className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().deleteTable().run()} label="Delete Table" icon={<Trash2 className="w-4 h-4" />} danger />
                    <div className={`h-[1px] my-1 ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`} />
                    <TableActionButton onClick={() => editor?.chain().focus().mergeCells().run()} label="Merge Cells" icon={<Merge className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().splitCell().run()} label="Split Cell" icon={<Split className="w-4 h-4" />} />
                </div>
            </div>

            {/* Image Drawer */}
            <div className={`fixed right-16 top-50 w-64 rounded-xl shadow-xl transition-all duration-300 transform origin-right ${isImageActive ? "scale-100 opacity-100 translate-x-0" : "scale-95 opacity-0 translate-x-8 pointer-events-none"} ${isDarkMode ? "bg-[#1e1e1e] border border-white/10" : "bg-white border border-gray-200"}`}>
                <div className={`p-4 border-b ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
                    <h3 className={`font-semibold text-sm ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Image Properties</h3>
                </div>
                <div className="p-2 space-y-1">
                    <TableActionButton onClick={() => editor?.chain().focus().updateAttributes('image', { textAlign: 'left' }).run()} label="Align Left" icon={<AlignLeft className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().updateAttributes('image', { textAlign: 'center' }).run()} label="Align Center" icon={<AlignCenter className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().updateAttributes('image', { textAlign: 'right' }).run()} label="Align Right" icon={<AlignRight className="w-4 h-4" />} />
                    <div className={`h-[1px] my-1 ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`} />
                    <TableActionButton onClick={() => editor?.chain().focus().updateAttributes('image', { width: '100%' }).run()} label="Full Width" icon={<ImageIcon className="w-4 h-4" />} />
                    <TableActionButton onClick={() => editor?.chain().focus().updateAttributes('image', { width: null, height: null, objectPosition: null }).run()} label="Reset Size" icon={<Trash2 className="w-4 h-4" />} />
                    <div className={`h-[1px] my-1 ${isDarkMode ? "bg-white/5" : "bg-gray-100"}`} />
                    <TableActionButton
                        onClick={() => {
                            const isCropping = editor?.getAttributes('image').isCropping
                            editor?.chain().focus().updateAttributes('image', { isCropping: !isCropping }).run()
                        }}
                        label={editor?.getAttributes('image').isCropping ? "Done Cropping" : "Crop Image"}
                        icon={<Crop className={`w-4 h-4 ${editor?.getAttributes('image').isCropping ? "text-blue-500" : ""}`} />}
                    />
                    <TableActionButton
                        onClick={() => {
                            if (!editor) return
                            const { selection } = editor.state
                            // Cast to any to access node for NodeSelection
                            if ((selection as any).node && (selection as any).node.type.name === 'image') {
                                const pos = selection.to
                                editor.chain().insertContentAt(pos, { type: 'paragraph' }).blur().run()
                            }
                        }}
                        label="Break Text"
                        icon={<CornerDownLeft className="w-4 h-4" />}
                    />
                </div>
            </div>
        </>
    )
}

function SideIcon({ icon }: any) {
    const { isDarkMode } = useDocs()
    return (
        <div className={`w-9 h-9 rounded-full shadow-sm border border-white/5 flex items-center justify-center cursor-pointer transition-colors
            ${isDarkMode ? "bg-[#2E2E2E] border-black/5 gray-700 hover:bg-white/10 text-gray-300" : "bg-white border-gray-200 hover:bg-gray-100 text-[#444746]"}`}>
            {icon}
        </div>
    )
}

function TableActionButton({ onClick, label, icon, danger }: any) {
    const { isDarkMode } = useDocs()
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-colors
            ${danger
                    ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                    : isDarkMode
                        ? "text-gray-300 hover:bg-white/5 hover:text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
        >
            {icon}
            {label}
        </button>
    )
}
