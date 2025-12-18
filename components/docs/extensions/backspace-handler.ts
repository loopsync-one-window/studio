import { Extension } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'

export const BackspaceHandler = Extension.create({
    name: 'customBackspace',

    addKeyboardShortcuts() {
        return {
            Backspace: () => {
                const { state, view } = this.editor
                const { dispatch } = view
                const { selection, doc } = state
                const { $from, empty } = selection

                if (!empty) return false

                // Find the Page Node we are in
                let pageNode = null
                let pagePos = -1

                for (let d = $from.depth; d > 0; d--) {
                    const node = $from.node(d)
                    if (node.type.name === 'page') {
                        pageNode = node
                        pagePos = $from.before(d)
                        break
                    }
                }

                if (!pageNode) return false

                // Check if we are at the start of the first block in the page
                // The page's content starts at pagePos + 1.
                // The first block starts at pagePos + 1.
                // We are inside the first block if $from.before() === pagePos + 1.
                // (before() gives the start position of the current block)
                if ($from.before() !== pagePos + 1) return false

                // Check parent offset to ensure we are at the start of that block
                if ($from.parentOffset > 0) return false

                // We are at the very start of the page content.

                // Condition: New page has NO content.
                // We check if the page has any text content.
                if (pageNode.textContent.trim().length > 0) {
                    return false
                }

                // Check for non-text content (like images)
                let hasContent = false
                pageNode.descendants(node => {
                    // Check if node is a leaf and not a paragraph/text
                    if (node.isLeaf && !node.isText && node.type.name !== 'paragraph') {
                        hasContent = true
                    }
                })

                if (hasContent) return false

                // Ensure it's not the first page
                // The first page starts at position 1 (usually).
                // Let's check nodeBefore.
                const prevNode = doc.resolve(pagePos).nodeBefore
                if (!prevNode || prevNode.type.name !== 'page') return false

                if (dispatch) {
                    const tr = state.tr

                    // Delete the current page node
                    tr.delete(pagePos, pagePos + pageNode.nodeSize)

                    // Move selection to the end of the previous page
                    // The previous page ends at pagePos. 
                    // Content ends at pagePos - 1.
                    const prevPageEndPos = pagePos - 1

                    // We need valid selection inside. 
                    const newSelection = TextSelection.near(tr.doc.resolve(prevPageEndPos), -1)

                    tr.setSelection(newSelection)
                    tr.scrollIntoView()
                    dispatch(tr)
                }

                return true
            }
        }
    }
})
