"use client"

import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { useDocs } from './docs-context'
import { useEffect, useState, useCallback } from 'react'
import { Document } from './extensions/document'
import { Page } from './extensions/page'
import { BackspaceHandler } from './extensions/backspace-handler'
import { FontSize } from './extensions/font-size'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import { flushSync } from 'react-dom'

export function DocsEditor() {
    const { setEditor, pageSetup, isDarkMode } = useDocs()
    const [isPaginating, setIsPaginating] = useState(false)

    // Helper to get raw dimensions in pixels
    const getPageDimensionsPx = useCallback(() => {
        let wCm = 21
        let hCm = 29.7

        if (pageSetup.paperSize === 'Letter') {
            wCm = 21.59
            hCm = 27.94
        } else if (pageSetup.paperSize === 'Legal') {
            wCm = 21.59
            hCm = 35.56
        }

        if (pageSetup.orientation === 'landscape') {
            [wCm, hCm] = [hCm, wCm]
        }

        // 96 DPI approximation (1cm = 37.795px)
        return {
            width: wCm * 37.795,
            height: hCm * 37.795
        }
    }, [pageSetup])


    const editor = useEditor({
        extensions: [
            Document, // Custom Document
            Page,     // Custom Page
            BackspaceHandler, // Custom Backspace
            TextStyle,
            FontFamily,
            FontSize,
            StarterKit.configure({
                document: false, // Disable default Document
            }),
            Placeholder.configure({
                placeholder: 'Type something...',
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image,
            Link,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            CharacterCount,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: `
        <div class="page-node">
            <h1>Untitled Document</h1>
            <p>Start typing to create your document...</p>
        </div>
        `,
        editorProps: {
            attributes: {
                class: 'outline-none',
            },
        },
        immediatelyRender: false
    })

    const paginate = useCallback(() => {
        if (!editor || isPaginating) return

        const { height: MAX_HEIGHT } = getPageDimensionsPx()
        // Add a small buffer to prevent infinite loops on exact matches
        const HEADER_FOOTER_BUFFER = (pageSetup.margins.top + pageSetup.margins.bottom) * 37.795

        if (MAX_HEIGHT < 100) return

        const pages = editor.view.dom.querySelectorAll('.page-node')
        if (pages.length === 0) return

        let changed = false
        const currentDoc = editor.state.doc

        // Note: This is an expensive operation. We are reading DOM and then dispatching.
        // We should debounce this in a real app.

        // Strategy: Iterate pages. If a page is too full, move LAST child to NEXT page.
        // If a page is empty, remove it.

        // We use a simple loop. If we change something, we stop and let the update loop trigger again (to let DOM settle).
        // This creates a "smooth" animation effect as items move one by one.

        for (let i = 0; i < pages.length; i++) {
            const pageEl = pages[i] as HTMLElement
            // Check overflow
            if (pageEl.scrollHeight > MAX_HEIGHT + 5) { // 2px tolerance
                // Find node to move
                const pagePos = editor.view.posAtDOM(pageEl, 0)
                const pageNodeStart = pagePos - 1
                const pageNode = currentDoc.nodeAt(pageNodeStart)
                // posAtDOM(pageEl, 0) returns position INSIDE page.

                if (!pageNode) continue

                if (pageNode.childCount <= 1) {
                    continue
                }

                // We need to find the specific page node in the document to get its size
                // Let's rely on block count to find the last block
                const lastBlockIdx = pageNode.childCount - 1
                // if (lastBlockIdx < 0) continue // Handled by pageNode.childCount <= 1

                const lastBlock = pageNode.child(lastBlockIdx)
                const lastBlockSize = lastBlock.nodeSize

                // Calculate position of the last block
                // page start + sum of previous blocks
                let blockStart = pagePos
                for (let j = 0; j < lastBlockIdx; j++) {
                    blockStart += pageNode.child(j).nodeSize
                }
                const blockEnd = blockStart + lastBlockSize

                // Move logic:
                // 1. Cut last block
                // 2. Insert at start of next page OR create new page

                changed = true

                // Perform transaction
                editor.commands.command(({ tr, dispatch }) => {
                    if (dispatch) {
                        const contentToMove = tr.doc.slice(blockStart, blockEnd).content

                        // Delete the block from current page
                        tr.delete(blockStart, blockEnd)

                        // Insert into next page
                        const nextPageExists = i < pages.length - 1

                        // Calculated positions need to account for the deletion?
                        // Actually, 'tr' methods handle mapping if we use positions from the *original* doc 
                        // BUT only if we don't mess up the order.
                        // Ideally: Insert first, then delete? 
                        // If we insert *after* the page, the existing positions *inside* the page shouldn't change relative to start?
                        // But document structure changes.

                        // Safest: Calculate target position based on original doc, then map if needed.
                        // Or just use the logic:
                        // After delete, the page ends at `blockStart` (since we deleted up to the end).
                        // Page closing tag is at `blockStart + 1`. (Because `blockEnd` was the old content end).

                        // So insertion point is `blockStart + 1`.

                        if (nextPageExists) {
                            // Prepend to next page
                            // The next page starts immediately after the current page.
                            // Current page originally ended at `pageNodeStart + pageNode.nodeSize`.
                            // Next page content starts at `Page2_Start + 1`.
                            // So `Page1_End + 1`.

                            // Old Page1 End = `blockEnd + 1`. 
                            // So Target = `blockEnd + 2`.

                            // Since we deleted (size `lastBlockSize`), everything shifts left.
                            // Target becomes `blockEnd + 2 - lastBlockSize` = `blockStart + 2`.

                            tr.insert(blockStart + 2, contentToMove)
                        } else {
                            // Create new page
                            const newPage = editor.schema.nodes.page.create(null, contentToMove)
                            // Insert after current page.
                            // Current page ends at `blockStart` (content end).
                            // Page node ends at `blockStart + 1`.
                            // So insert at `blockStart + 1`.
                            tr.insert(blockStart + 1, newPage)
                        }
                    }
                    return true
                })
                break
            }

            // cleanup empty pages
            // Only if not focused? No, cleanup is fine.
            if (pageEl.innerText.trim() === '' && pageEl.querySelectorAll('img, table').length === 0 && pages.length > 1) {
                const pagePos = editor.view.posAtDOM(pageEl, 0)
                if (pagePos > 0) {
                    // Check if it's really the page node
                    const pageNodeStart = pagePos - 1
                    const pageNode = currentDoc.nodeAt(pageNodeStart)

                    if (pageNode && pageNode.type.name === 'page' && pageNode.childCount === 0) {
                        // Only delete if truly empty (no children blocks)
                        // Sometimes innerText is empty but it has an empty paragraph.
                        // pageNode.childCount === 1 (empty p) -> we might want to keep it if it's the only page,
                        // but here pages.length > 1.

                        // If it has an empty paragraph, we usually merge it up?
                        // "Backspace removes page if no content". 
                        // If we just have an empty P, delete the whole page.

                        changed = true
                        editor.commands.command(({ tr, dispatch }) => {
                            if (dispatch) tr.delete(pageNodeStart, pageNodeStart + pageNode.nodeSize)
                            return true
                        })
                        break
                    }
                }
            }
        }

        if (changed) {
            setIsPaginating(true)
            // Use a slightly longer timeout to let the DOM fully settle and prevent thrashing
            setTimeout(() => setIsPaginating(false), 200)
        }

    }, [editor, getPageDimensionsPx, isPaginating, pageSetup])

    useEffect(() => {
        if (!editor) return

        const onUpdate = () => {
            // Debounce pagination
            requestAnimationFrame(paginate)
        }

        editor.on('update', onUpdate)
        editor.on('selectionUpdate', onUpdate)

        return () => {
            editor.off('update', onUpdate)
            editor.off('selectionUpdate', onUpdate)
        }
    }, [editor, paginate])


    // Sync editor instance
    useEffect(() => {
        setEditor(editor)
        return () => setEditor(null)
    }, [editor, setEditor])

    if (!editor) {
        return null
    }

    // Helper to get dimensions for CSS (visual only)
    const { width, height } = getPageDimensionsPx()

    // We override the default styles. pagination is handled by nodes, but we need to ensure 
    // the page nodes *look* like pages.
    // We inject global styles for .page-node

    const pageStyle = `
        .page-node {
            background: ${isDarkMode ? '#1e1e1e' : 'white'};
            color: ${isDarkMode ? '#e2e2e2' : 'black'};
            min-height: ${height}px;
            width: ${width}px;
            padding: ${pageSetup.margins.top}cm ${pageSetup.margins.right}cm ${pageSetup.margins.bottom}cm ${pageSetup.margins.left}cm;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            overflow: hidden;
            font-family: 'Inter', sans-serif; /* Default font */
            font-size: 11pt; /* Default font size */
        }
        
        /* Typography overrides for Tailwind */
        .page-node h1 { font-size: 2.5em; font-weight: bold; margin-bottom: 0.5em; line-height: 1.2; }
        .page-node h2 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; line-height: 1.3; }
        .page-node h3 { font-size: 1.75em; font-weight: bold; margin-bottom: 0.5em; line-height: 1.4; }
        .page-node h4 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
        .page-node h5 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; }
        .page-node p { margin-bottom: 1em; line-height: 1.6; }
        .page-node ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1em; }
        .page-node ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1em; }
        .page-node ul ul, .page-node ol ul, .page-node ul ol, .page-node ol ol { margin-bottom: 0; }
        .page-node li { margin-bottom: 0.25em; }
        .page-node blockquote { border-left: 4px solid #ccc; padding-left: 1em; margin-left: 0; margin-right: 0; font-style: italic; }
        
        .ProseMirror {
            outline: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background: transparent;
        }
    `

    return (
        <div className="flex justify-center min-h-full overflow-y-auto bg-transparent relative w-full">
            <style>{pageStyle}</style>
            <div className="w-full h-full">
                <EditorContent editor={editor} className="w-full min-h-screen" />
            </div>
        </div>
    )
}
