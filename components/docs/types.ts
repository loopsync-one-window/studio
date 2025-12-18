
export type BlockType = "paragraph" | "heading-1" | "heading-2" | "heading-3" | "bullet-list" | "numbered-list" | "image" | "table"

export interface BlockAttributes {
    align?: "left" | "center" | "right" | "justify"
    bold?: boolean
    italic?: boolean
    underline?: boolean
    color?: string
    backgroundColor?: string
}

export interface Block {
    id: string
    type: BlockType
    content: string // HTML or Text content
    attributes?: BlockAttributes
    children?: Block[] // For nested lists or logic
}

export interface DocSelection {
    startBlockId: string
    startOffset: number
    endBlockId: string
    endOffset: number
}

export interface PageDimension {
    width: number // in px (96 DPI usually or CSS pixels)
    height: number // in px
    marginTop: number
    marginBottom: number
    marginLeft: number
    marginRight: number
}
