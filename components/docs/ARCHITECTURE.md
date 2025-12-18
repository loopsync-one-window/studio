
# Docs Editor Architecture

## High-Level Architecture

The Docs Editor is built using a **Hybrid Layout Engine** approach with React.

1.  **Document Model (Source of Truth)**:
    -   A linear array of `Block` objects (Paragraphs, Headings, Images).
    -   State is managed in `DocsEditor` (or Context).
    -   Type: `Block[]`

2.  **Layout Engine (`layout-engine.ts`)**:
    -   Pure function that takes `Block[]` + `PageSetup`.
    -   Returns `RenderedPage[]`.
    -   Logic:
        -   Iterates through blocks.
        -   Measures block height (estimated or measured).
        -   Accumulates height for the current page.
        -   **Splitting**: If a block overflows, it splits the text content into two parts.
        -   Assigns parts to `Page N` and `Page N+1`.

3.  **Rendering (`docs-editor.tsx`)**:
    -   Renders `RenderedPage[]` as separate React components (`PageView`).
    -   Each `PageView` has fixed dimensions (A4/Letter) and margins.
    -   Blocks are rendered inside the margin box.

## Data Structures

```typescript
// Core Block
interface Block {
    id: string
    type: "paragraph" | "heading" | "image"
    content: string
    attributes?: Record<string, any>
}

// Rendered Page (Visual)
interface RenderedPage {
    index: number
    blocks: Block[] // Subset or split blocks
    heightUsed: number
}
```

## Pagination Algorithm

1.  Initialize `pages = []`, `currentHeight = 0`.
2.  For each `block` in `blocks`:
    a. Measure `height` of `block`.
    b. If `currentHeight + height < PageHeight`:
       - Add block to current page.
       - `currentHeight += height`
    c. Else (Overflow):
       - Calculate `availableSpace = PageHeight - currentHeight`
       - Find split index in text where it fits `availableSpace`.
       - Create `part1` (fits) and `part2` (overflows).
       - Add `part1` to current page.
       - Push current page to `pages`.
       - Reset `currentHeight = 0`.
       - Recurse with `part2` (it might overwrite next page too).

## Cursor & Selection Strategy (Planned)

1.  **Virtual Input**:
    -   Use `contentEditable` on rendered blocks to catch Input events.
    -   Pro: Native IME and cursor navigation within a block.
    -   Con: Splits break selection.

2.  **Selection Restoration**:
    -   When `blocks` state updates (splitting occurs), React re-renders.
    -   We store `lastSelection` ({ blockId, offset }).
    -   `useLayoutEffect` runs after render.
    -   Find the DOM node for `blockId` (or mapped part ID).
    -   Call `window.getSelection().setBaseAndExtent(...)` to restore cursor.

## Pseudocode: Page Overflow Handling

```typescript
function handleOverflow(block, remainingHeight) {
    if (block.height <= remainingHeight) {
        return { fits: block, remainder: null }
    }
    
    // Binary search for split point
    let start = 0, end = block.content.length
    let bestSplit = 0
    
    while (start < end) {
        let mid = (start + end) / 2
        if (measure(block.content.slice(0, mid)) <= remainingHeight) {
            bestSplit = mid
            start = mid + 1
        } else {
            end = mid
        }
    }
    
    return {
        fits: block.content.slice(0, bestSplit),
        remainder: block.content.slice(bestSplit)
    }
}
```
