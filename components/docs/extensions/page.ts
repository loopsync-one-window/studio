import { Node, mergeAttributes } from '@tiptap/core'

export const Page = Node.create({
    name: 'page',

    group: 'block',

    content: 'block+',

    defining: true,
    isolating: true,

    addAttributes() {
        return {
            class: {
                default: 'page-node',
            },
            style: {
                default: null,
            }
        }
    },

    parseHTML() {
        return [
            { tag: 'div[class="page-node"]' },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    },
})
