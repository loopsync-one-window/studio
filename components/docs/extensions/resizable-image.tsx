import { mergeAttributes, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import { useCallback, useEffect, useState } from 'react'

const ResizableImageComponent = (props: any) => {
    const { node, updateAttributes, selected } = props
    const [width, setWidth] = useState(node.attrs.width)
    const [height, setHeight] = useState(node.attrs.height)
    const [isCropping, setIsCropping] = useState(false)

    useEffect(() => {
        setWidth(node.attrs.width)
        setHeight(node.attrs.height)
    }, [node.attrs.width, node.attrs.height])

    // Listen for global crop mode toggle command via attribute
    useEffect(() => {
        if (!selected) {
            setIsCropping(false)
            return
        }
        setIsCropping(!!node.attrs.isCropping)
    }, [selected, node.attrs.isCropping])

    const onResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
        e.preventDefault()
        const startX = e.clientX
        const startY = e.clientY

        const container = (e.target as HTMLElement).closest('.image-container') as HTMLElement
        // Fallbacks if width/height are formatted strings or null
        const startWidth = container?.offsetWidth || 0
        const startHeight = container?.offsetHeight || 0
        const aspectRatio = startWidth / startHeight

        const onMouseMove = (e: MouseEvent) => {
            const currentX = e.clientX
            const currentY = e.clientY
            const diffX = currentX - startX
            const diffY = currentY - startY

            // Calculate Constraint
            let maxWidth = 2000 // Fallback
            const pageNode = container.closest('.page-node')
            if (pageNode) {
                const style = window.getComputedStyle(pageNode)
                const paddingLeft = parseFloat(style.paddingLeft) || 0
                const paddingRight = parseFloat(style.paddingRight) || 0
                // We want the content box width
                maxWidth = pageNode.clientWidth - paddingLeft - paddingRight
            }

            let newWidthStr = width
            let newHeightStr = height

            if (isCropping) {
                // Free resize (change width/height independently)
                // We check directions. If dragging corner, changes both.
                // If dragging right handle, changes width only.
                // If dragging bottom handle, changes height only.

                if (direction.includes('right') || direction.includes('corner')) {
                    const newWidth = Math.min(maxWidth, Math.max(100, startWidth + diffX))
                    newWidthStr = `${newWidth}px`
                    setWidth(newWidthStr)
                }
                if (direction.includes('bottom') || direction.includes('corner')) {
                    const newHeight = Math.max(100, startHeight + diffY)
                    newHeightStr = `${newHeight}px`
                    setHeight(newHeightStr)
                }
            } else {
                // Locked aspect ratio resize (standard)
                // Only uses width (X movement) to drive both unless we implement diagonal logic properly
                // For simplicity, mostly width-driven like Tiptap default
                // But dragging corner should feel natural.

                const newWidth = Math.min(maxWidth, Math.max(100, startWidth + diffX))
                newWidthStr = `${newWidth}px`
                const newHeight = newWidth / aspectRatio
                newHeightStr = `${newHeight}px`

                setWidth(newWidthStr)
                setHeight(newHeightStr)
            }

            // Note: We don't perform the commit here (onMouseUp does), but we need to pass these values or recalculate there.
            // Actually, onMouseUp recalculates using startWidth + diffX. We must clamp there too.
        }

        const onMouseUp = (e: MouseEvent) => {
            // Calculate final and update attributes
            const currentX = e.clientX
            const currentY = e.clientY
            const diffX = currentX - startX
            const diffY = currentY - startY

            // Recalculate Constraint
            let maxWidth = 2000
            const pageNode = container.closest('.page-node')
            if (pageNode) {
                const style = window.getComputedStyle(pageNode)
                const paddingLeft = parseFloat(style.paddingLeft) || 0
                const paddingRight = parseFloat(style.paddingRight) || 0
                maxWidth = pageNode.clientWidth - paddingLeft - paddingRight
            }

            let finalWidth = startWidth
            let finalHeight = startHeight

            // Re-run logic to get final numbers (avoid state closure staleness if we used local vars)
            if (isCropping) {
                if (direction.includes('right') || direction.includes('corner')) {
                    finalWidth = Math.min(maxWidth, Math.max(100, startWidth + diffX))
                }
                if (direction.includes('bottom') || direction.includes('corner')) {
                    finalHeight = Math.max(100, startHeight + diffY)
                }
            } else {
                finalWidth = Math.min(maxWidth, Math.max(100, startWidth + diffX))
                finalHeight = finalWidth / aspectRatio
            }

            updateAttributes({
                width: `${finalWidth}px`,
                height: `${finalHeight}px`
            })

            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [width, height, isCropping, updateAttributes])

    const onImagePanStart = useCallback((e: React.MouseEvent) => {
        if (!isCropping) return
        e.preventDefault()
        e.stopPropagation() // Prevent parent drag

        const startX = e.clientX
        const startY = e.clientY

        // Parse current position (default 50% 50%)
        let currentPos = node.attrs.objectPosition || '50% 50%'
        // Remove % signs and split
        let parts = currentPos.replace(/%/g, '').split(' ')
        let posX = parseFloat(parts[0])
        let posY = parseFloat(parts[1])

        if (isNaN(posX)) posX = 50;
        if (isNaN(posY)) posY = 50;

        const onMouseMove = (e: MouseEvent) => {
            const diffX = e.clientX - startX
            const diffY = e.clientY - startY

            // Convert pixels to % shift. 
            // We need to know the sensitivity. 
            // If image is larger than container (object-fit cover), moving it shifts what we see.
            // 1px mouse move != 1% shift usually.
            // Let's approximate: 1px = 0.5% shift
            const sensitivity = 0.5

            const newX = Math.min(100, Math.max(0, posX - (diffX * sensitivity)))
            const newY = Math.min(100, Math.max(0, posY - (diffY * sensitivity)))

            updateAttributes({ objectPosition: `${newX.toFixed(1)}% ${newY.toFixed(1)}%` })
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [isCropping, node.attrs.objectPosition, updateAttributes])

    // styles for alignment
    const align = node.attrs.textAlign || 'center'

    const wrapperStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
        margin: '1rem 0',
    }

    return (
        <NodeViewWrapper style={wrapperStyle}>
            <div
                className={`image-container relative group transition-all ${selected ? 'ring-2 ring-blue-500' : ''}`}
                style={{
                    // Use CSS to enforce sizes
                    width: width || 'auto',
                    height: height || 'auto',
                    maxWidth: '100%',
                    display: 'inline-block',
                    overflow: 'hidden', // Essential for crop
                    position: 'relative'
                    // Aspect ratio is naturally handled if height is auto, or forced if height is set
                }}
                draggable={!isCropping}
                data-drag-handle={!isCropping ? "true" : undefined}
            >
                {/* Image */}
                <img
                    src={node.attrs.src}
                    alt={node.attrs.alt}
                    className="block rounded-sm"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Always cover for crop effect
                        objectPosition: node.attrs.objectPosition || 'center',
                        cursor: isCropping ? 'move' : 'default',
                        pointerEvents: isCropping ? 'auto' : 'none', // Allow interaction only when cropping
                        // Ensure image fills container
                        minWidth: '100%',
                        minHeight: '100%'
                    }}
                    onMouseDown={onImagePanStart}
                    draggable="false"
                />

                {/* Overlay for Drag (if not cropping) - Capture clicks/drags on top of image */}
                {!isCropping && (
                    <div className="absolute inset-0 z-0 bg-transparent" />
                )}

                {/* Resize Handles - Only show when selected */}
                {selected && (
                    <>
                        {/* Right Handle (Width) */}
                        <div
                            className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-12 bg-blue-500 rounded-full cursor-e-resize flex items-center justify-center shadow-md z-10 border border-white"
                            onMouseDown={(e) => onResizeStart(e, 'right')}
                            title="Resize Width"
                        >
                            <div className="w-0.5 h-4 bg-white/50"></div>
                        </div>

                        {isCropping && (
                            /* Bottom Handle (Height - only in crop mode) */
                            <div
                                className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 h-3 w-12 bg-blue-500 rounded-full cursor-s-resize flex items-center justify-center shadow-md z-10 border border-white"
                                onMouseDown={(e) => onResizeStart(e, 'bottom')}
                                title="Resize Height (Crop)"
                            >
                                <div className="h-0.5 w-4 bg-white/50"></div>
                            </div>
                        )}

                        {/* Corner Handle (Scale / Free) */}
                        <div
                            className="absolute right-[-6px] bottom-[-6px] w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize border-2 border-white shadow-md z-10"
                            onMouseDown={(e) => onResizeStart(e, 'corner')}
                            title={isCropping ? "Free Resize" : "Scale Resize"}
                        />
                    </>
                )}
            </div>
        </NodeViewWrapper>
    )
}

export const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: attributes => {
                    return {
                        width: attributes.width,
                        style: `width: ${attributes.width}`
                    }
                }
            },
            height: {
                default: null,
                renderHTML: attributes => {
                    return {
                        height: attributes.height,
                        style: `height: ${attributes.height}`
                    }
                }
            },
            textAlign: {
                default: 'center',
                renderHTML: attributes => {
                    return {
                        'data-text-align': attributes.textAlign,
                        style: `text-align: ${attributes.textAlign}`
                    }
                }
            },
            objectFit: {
                default: 'cover',
                renderHTML: attributes => {
                    return {
                        style: `object-fit: ${attributes.objectFit}`
                    }
                }
            },
            objectPosition: {
                default: 'center',
                renderHTML: attributes => {
                    return {
                        style: `object-position: ${attributes.objectPosition}`
                    }
                }
            },
            isCropping: {
                default: false,
                renderHTML: () => ({}) // Don't render to DOM
            }
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageComponent)
    },
})
