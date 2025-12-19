import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useCallback, useState, useRef, useEffect } from 'react'

export const EnhancedTable = Table.configure({
    resizable: true,
})

export const EnhancedTableRow = TableRow.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            height: {
                default: null,
                parseHTML: element => element.style.height,
                renderHTML: attributes => {
                    if (!attributes.height) return {}
                    return {
                        style: `height: ${attributes.height}`
                    }
                }
            }
        }
    }
})

const CellNodeView = (props: any) => {
    const { node, getPos, editor } = props
    const [isResizing, setIsResizing] = useState(false)
    const resizeHandleRef = useRef<HTMLDivElement>(null)

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const startY = e.clientY
        // Use the resize handle's parent (the wrapper) to identify the cell structure if needed,
        // but typically we just need the row.
        // We know this handle is at the bottom of the cell.

        const cell = (e.target as HTMLElement).closest('td, th') as HTMLElement
        if (!cell) return

        const row = cell.parentElement as HTMLElement
        const startHeight = row.offsetHeight

        const pos = getPos()
        if (typeof pos !== 'number') return

        // Resolve inside the cell to safely get the parent row
        const resolvedPos = editor.state.doc.resolve(pos + 1)
        const rowDepth = resolvedPos.depth - 1
        const rowPos = resolvedPos.before(rowDepth)
        const rowNode = editor.state.doc.nodeAt(rowPos)

        if (!rowNode || rowNode.type.name !== 'tableRow') return

        setIsResizing(true)
        document.body.style.cursor = 'row-resize'
        document.body.style.userSelect = 'none' // Prevent text selection

        const onMouseMove = (moveEvent: MouseEvent) => {
            const currentY = moveEvent.clientY
            const diffY = currentY - startY
            const newHeight = Math.max(30, startHeight + diffY)

            // Immediate DOM update for "Google Docs" feel (smooth)
            if (row) row.style.height = `${newHeight}px`
        }

        const onMouseUp = (upEvent: MouseEvent) => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)

            setIsResizing(false)
            document.body.style.cursor = 'default'
            document.body.style.userSelect = ''

            const currentY = upEvent.clientY
            const diffY = currentY - startY
            const newHeight = Math.max(30, startHeight + diffY)

            if (diffY !== 0) {
                editor.commands.command(({ tr, dispatch }: any) => {
                    if (dispatch) {
                        tr.setNodeMarkup(rowPos, undefined, { ...rowNode.attrs, height: `${newHeight}px` })
                    }
                    return true
                })
            }
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

    }, [editor, getPos])

    return (
        <NodeViewWrapper
            className="relative w-full h-full"
            style={{
                minWidth: '50px',
                verticalAlign: 'top',
                padding: 0, // Remove padding from TD so resize handles are flush
            }}
        >
            <NodeViewContent
                as="div"
                className="w-full h-full"
                style={{
                    outline: 'none',
                    padding: '8px', // Apply padding here for content
                }}
            />

            {/* Invisible Row Resize Handle - Overlaps border */}
            <div
                ref={resizeHandleRef}
                className="group absolute left-0 right-0 z-20 resize-handle-row"
                style={{
                    bottom: '-4px', // Center over the 1px border
                    height: '8px',
                    cursor: 'row-resize',
                    backgroundColor: 'transparent',
                }}
                onMouseDown={onMouseDown}
            >
                {/* Blue Guide Line - Visible on Hover or Resizing */}
                <div
                    className={`absolute left-0 right-0 bg-blue-500 transition-opacity duration-150 ${isResizing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{
                        height: '2px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                />
            </div>
        </NodeViewWrapper>
    )
}

export const EnhancedTableCell = TableCell.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CellNodeView, { as: 'td' })
    }
})

export const EnhancedTableHeader = TableHeader.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CellNodeView, { as: 'th' })
    }
})
