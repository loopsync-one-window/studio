"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Pen, Eraser, Trash2, Download, Undo, Redo, MousePointer2, Circle as CircleIcon, Square, Minus, Type, Move, Pencil, Sidebar } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type ToolType = "select" | "pen" | "eraser" | "line" | "rect" | "circle" | "text"

interface WhiteboardElement {
    id: string
    type: ToolType
    x: number
    y: number
    width?: number
    height?: number
    endX?: number
    endY?: number
    radius?: number
    points?: { x: number, y: number }[]
    text?: string
    color: string
    lineWidth: number
}

export default function WhiteboardPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Core Data
    const [elements, setElements] = useState<WhiteboardElement[]>([])
    const [history, setHistory] = useState<WhiteboardElement[][]>([[]])
    const [historyStep, setHistoryStep] = useState(0)

    // UI State
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("#ffffffff")
    const [tool, setTool] = useState<ToolType>("pen")
    const [lineWidth, setLineWidth] = useState(3)

    // Interaction State
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [isDraggingElement, setIsDraggingElement] = useState(false)
    const [currentElement, setCurrentElement] = useState<WhiteboardElement | null>(null)

    // Text Input State
    const [textInput, setTextInput] = useState<{ x: number, y: number, text: string, visible: boolean } | null>(null)
    const textInputRef = useRef<HTMLInputElement>(null)
    const [isDraggingTextInput, setIsDraggingTextInput] = useState(false)
    const [textDragOffset, setTextDragOffset] = useState({ x: 0, y: 0 })

    // Project Name State
    const [title, setTitle] = useState("Untitled Project")
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const titleInputRef = useRef<HTMLInputElement>(null)

    const colors = [
        { name: "White", value: "#ffffffff" },
        { name: "Blue", value: "#007AFF" },
        { name: "Red", value: "#FF3B30" },
        { name: "Green", value: "#34C759" },
        { name: "Yellow", value: "#FFCC00" },
    ]

    // --- Rendering Engine ---

    const renderCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1

        // Clear entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Reset transform to identity then apply scale
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        // Draw all existing elements
        elements.forEach(el => drawElement(ctx, el))

        // Draw the element currently being created/drawn
        if (currentElement) {
            drawElement(ctx, currentElement)
        }
    }, [elements, currentElement])

    const drawElement = (ctx: CanvasRenderingContext2D, el: WhiteboardElement) => {
        ctx.strokeStyle = el.color
        ctx.fillStyle = el.color
        ctx.lineWidth = el.lineWidth
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.globalCompositeOperation = "source-over"

        if (el.type === "pen" && el.points) {
            if (el.points.length < 2) return
            ctx.beginPath()
            ctx.moveTo(el.points[0].x, el.points[0].y)
            for (let i = 1; i < el.points.length; i++) {
                ctx.lineTo(el.points[i].x, el.points[i].y)
            }
            ctx.stroke()
        } else if (el.type === "rect") {
            ctx.strokeRect(el.x, el.y, el.width || 0, el.height || 0)
        } else if (el.type === "circle" && el.radius) {
            ctx.beginPath()
            ctx.arc(el.x, el.y, el.radius, 0, 2 * Math.PI)
            ctx.stroke()
        } else if (el.type === "line" && el.endX !== undefined && el.endY !== undefined) {
            ctx.beginPath()
            ctx.moveTo(el.x, el.y)
            ctx.lineTo(el.endX, el.endY)
            ctx.stroke()
        } else if (el.type === "text" && el.text) {
            ctx.font = `${el.lineWidth * 5 + 10}px sans-serif`
            ctx.fillText(el.text, el.x, el.y + 10)
        }
    }

    // Trigger render on changes
    useEffect(() => {
        renderCanvas()
    }, [renderCanvas])

    // --- Hit Testing ---

    const distance = (a: { x: number, y: number }, b: { x: number, y: number }) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))

    const isPointInElement = (x: number, y: number, el: WhiteboardElement) => {
        const tolerance = 10

        switch (el.type) {
            case "rect":
                const minX = Math.min(el.x, el.x + (el.width || 0))
                const maxX = Math.max(el.x, el.x + (el.width || 0))
                const minY = Math.min(el.y, el.y + (el.height || 0))
                const maxY = Math.max(el.y, el.y + (el.height || 0))
                // Allow selecting by clicking border OR inside
                return x >= minX - tolerance && x <= maxX + tolerance && y >= minY - tolerance && y <= maxY + tolerance

            case "circle":
                if (!el.radius) return false
                const d = distance({ x, y }, { x: el.x, y: el.y })
                return Math.abs(d - el.radius) <= tolerance || d <= el.radius // allow inside

            case "line":
                if (el.endX === undefined || el.endY === undefined) return false
                const offset = distance({ x: el.x, y: el.y }, { x: el.endX, y: el.endY }) - (distance({ x, y }, { x: el.x, y: el.y }) + distance({ x, y }, { x: el.endX, y: el.endY }))
                return Math.abs(offset) < 1 // Simple proxy for being on line

            case "text":
                // Approx bounding box
                const fontSize = el.lineWidth * 5 + 10
                const width = (el.text?.length || 0) * (fontSize * 0.6)
                const height = fontSize
                return x >= el.x && x <= el.x + width && y >= el.y - height && y <= el.y + 10

            case "pen":
                if (!el.points) return false
                // Check if simple bounding box matches first
                const xs = el.points.map(p => p.x)
                const ys = el.points.map(p => p.y)
                if (x < Math.min(...xs) - tolerance || x > Math.max(...xs) + tolerance || y < Math.min(...ys) - tolerance || y > Math.max(...ys) + tolerance) return false

                // Detailed point check
                return el.points.some(p => distance({ x, y }, p) < tolerance)

            default:
                return false
        }
    }

    const getElementAtPosition = (x: number, y: number) => {
        // Search reverse to find top-most
        for (let i = elements.length - 1; i >= 0; i--) {
            if (isPointInElement(x, y, elements[i])) {
                return elements[i]
            }
        }
        return null
    }

    // --- Interaction Handlers ---

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return { offsetX: 0, offsetY: 0 }
        const rect = canvas.getBoundingClientRect()

        let clientX, clientY
        if ('touches' in e) {
            const touch = e.touches[0] || e.changedTouches[0]
            clientX = touch.clientX
            clientY = touch.clientY
        } else {
            clientX = (e as React.MouseEvent).clientX
            clientY = (e as React.MouseEvent).clientY
        }
        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        }
    }

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        // If text input is actively being used, specific click away logic handles it
        if (textInput?.visible) return

        const { offsetX, offsetY } = getCoordinates(e)

        if (tool === "select") {
            const el = getElementAtPosition(offsetX, offsetY)
            if (el) {
                setSelectedElementId(el.id)
                setIsDraggingElement(true)
                setDragOffset({ x: offsetX - el.x, y: offsetY - el.y })
            } else {
                setSelectedElementId(null)
            }
            return
        }

        if (tool === "eraser") {
            const el = getElementAtPosition(offsetX, offsetY)
            if (el) {
                const newEls = elements.filter(item => item.id !== el.id)
                setElements(newEls)
                saveToHistory(newEls)
            }
            return
        }

        // Start creating new shape
        setIsDrawing(true)
        const id = crypto.randomUUID()

        if (tool === "pen") {
            setCurrentElement({
                id, type: "pen", x: 0, y: 0,
                points: [{ x: offsetX, y: offsetY }],
                color, lineWidth
            })
        } else if (["rect", "circle", "line"].includes(tool)) {
            setCurrentElement({
                id, type: tool, x: offsetX, y: offsetY,
                width: 0, height: 0, endX: offsetX, endY: offsetY, radius: 0,
                color, lineWidth
            })
        }
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getCoordinates(e)

        if (isDraggingElement && selectedElementId && tool === "select") {
            setElements(prev => prev.map(el => {
                if (el.id === selectedElementId) {
                    const dx = offsetX - dragOffset.x - el.x // difference in x
                    const dy = offsetY - dragOffset.y - el.y // difference in y

                    const newEl = { ...el, x: offsetX - dragOffset.x, y: offsetY - dragOffset.y }

                    // Update composite parts relative to new x,y
                    if (el.type === "line") {
                        // For line, x/y is start, endX/endY is end. We shifted start by dx, dy. Shift end too.
                        // But wait, dx is difference between CURRENT desired x (calculated from mouse) and OLD x.
                        // Correct logic: Calculate delta movement.
                        const deltaX = (offsetX - dragOffset.x) - el.x
                        const deltaY = (offsetY - dragOffset.y) - el.y

                        newEl.x = el.x + deltaX
                        newEl.y = el.y + deltaY
                        newEl.endX = (el.endX || 0) + deltaX
                        newEl.endY = (el.endY || 0) + deltaY
                        return newEl
                    }
                    if (el.type === "pen" && el.points) {
                        const deltaX = (offsetX - dragOffset.x) - el.x
                        const deltaY = (offsetY - dragOffset.y) - el.y

                        newEl.x = el.x + deltaX
                        newEl.y = el.y + deltaY
                        newEl.points = el.points.map(p => ({ x: p.x + deltaX, y: p.y + deltaY }))
                        return newEl
                    }
                    return newEl
                }
                return el
            }))
            return
        }

        if (!isDrawing || !currentElement) return

        if (tool === "pen") {
            setCurrentElement({
                ...currentElement,
                points: [...(currentElement.points || []), { x: offsetX, y: offsetY }]
            })
        } else if (tool === "rect") {
            setCurrentElement({
                ...currentElement,
                width: offsetX - currentElement.x,
                height: offsetY - currentElement.y
            })
        } else if (tool === "circle") {
            const radius = Math.sqrt(Math.pow(offsetX - currentElement.x, 2) + Math.pow(offsetY - currentElement.y, 2))
            setCurrentElement({ ...currentElement, radius })
        } else if (tool === "line") {
            setCurrentElement({
                ...currentElement,
                endX: offsetX,
                endY: offsetY
            })
        }
    }

    const stopDrawing = () => {
        if (isDraggingElement) {
            setIsDraggingElement(false)
            saveToHistory(elements)
            return
        }

        if (isDrawing && currentElement) {
            const newElements = [...elements, currentElement]
            setElements(newElements)
            saveToHistory(newElements)
            setCurrentElement(null)
            setIsDrawing(false)
        }
    }

    // --- History & Utils ---

    const saveToHistory = (newElements: WhiteboardElement[]) => {
        const newHistory = history.slice(0, historyStep + 1)
        newHistory.push(newElements)
        if (newHistory.length > 50) newHistory.shift()
        setHistory(newHistory)
        setHistoryStep(newHistory.length - 1)
    }

    const undo = () => {
        if (historyStep > 0) {
            const newStep = historyStep - 1
            setHistoryStep(newStep)
            setElements(history[newStep])
        }
    }

    const redo = () => {
        if (historyStep < history.length - 1) {
            const newStep = historyStep + 1
            setHistoryStep(newStep)
            setElements(history[newStep])
        }
    }

    const clearCanvas = () => {
        setElements([])
        saveToHistory([])
    }

    const finalizeText = () => {
        if (!textInput || !textInput.visible) return

        if (textInput.text.trim()) {
            const newEl: WhiteboardElement = {
                id: crypto.randomUUID(),
                type: "text",
                x: textInput.x,
                y: textInput.y,
                text: textInput.text,
                color,
                lineWidth
            }
            const newElements = [...elements, newEl]
            setElements(newElements)
            saveToHistory(newElements)
        }
        setTextInput(null)
    }

    const downloadCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tCtx = tempCanvas.getContext('2d')
        if (!tCtx) return

        tCtx.fillStyle = '#000000'
        tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        tCtx.drawImage(canvas, 0, 0)

        const link = document.createElement('a')
        link.download = `whiteboard-${new Date().toISOString()}.png`
        link.href = tempCanvas.toDataURL()
        link.click()
    }

    // --- Setup Effects ---

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const updateSize = () => {
            const parent = canvas.parentElement
            const w = parent ? parent.clientWidth : window.innerWidth
            const h = 4000
            const dpr = window.devicePixelRatio || 1

            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`

            // Redraw immediately
            renderCanvas()
        }

        window.addEventListener('resize', updateSize)
        updateSize() // Initial

        return () => window.removeEventListener('resize', updateSize)
    }, [renderCanvas])

    // Text drag handling
    useEffect(() => {
        if (!isDraggingTextInput) return
        const handleMove = (e: MouseEvent) => {
            if (textInput) {
                setTextInput({ ...textInput, x: e.clientX - textDragOffset.x, y: e.clientY - textDragOffset.y })
            }
        }
        const handleUp = () => { setIsDraggingTextInput(false); textInputRef.current?.focus() }
        window.addEventListener('mousemove', handleMove)
        window.addEventListener('mouseup', handleUp)
        return () => { window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleUp) }
    }, [isDraggingTextInput, textInput, textDragOffset])


    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-black selection:bg-none">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full h-14 border-b border-white/[0.05] bg-[#000000]/50 backdrop-blur-md flex items-center justify-between px-4 z-40">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="text-zinc-500 hover:text-white transition-colors" />
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex flex-col justify-center">
                        {isEditingTitle ? (
                            <Input
                                ref={titleInputRef}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onBlur={() => { if (!title.trim()) setTitle("Untitled"); setIsEditingTitle(false) }}
                                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                                className="h-6 text-sm font-medium text-white bg-transparent border-none p-0 focus-visible:ring-0 w-[200px]"
                            />
                        ) : (
                            <div className="group flex items-center gap-2 cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                                <span className="text-sm font-medium text-white/90">{title}</span>
                                <Pencil className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={undo} disabled={historyStep <= 0} className="p-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-30"><Undo className="h-4 w-4" /></button>
                    <button onClick={redo} disabled={historyStep >= history.length - 1} className="p-2 text-zinc-500 hover:text-white transition-colors disabled:opacity-30"><Redo className="h-4 w-4" /></button>
                    <div className="w-[1px] h-4 bg-white/10 mx-2" />
                    <Link href="/home">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-md text-xs font-semibold hover:bg-zinc-200 transition-colors">
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Done</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <div className="relative w-full h-[4000px]">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    {/* Active Text Input Overlay */}
                    {textInput && textInput.visible && (
                        <>
                            <div className="absolute z-[60] p-1.5 bg-zinc-800 rounded-full cursor-move hover:bg-zinc-700 transition-colors shadow-lg border border-white/20"
                                style={{ left: textInput.x, top: textInput.y - 12, transform: "translate(-10px, -24px)" }}
                                onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); setIsDraggingTextInput(true); setTextDragOffset({ x: e.clientX - textInput.x, y: e.clientY - textInput.y }) }}
                            >
                                <Move className="h-3 w-3 text-white" />
                            </div>
                            <input
                                ref={textInputRef}
                                type="text"
                                value={textInput.text}
                                onChange={(e) => setTextInput({ ...textInput, text: e.target.value })}
                                onKeyDown={(e) => { if (e.key === "Enter") finalizeText(); e.stopPropagation() }}
                                onClick={(e) => e.stopPropagation()}
                                onBlur={() => !isDraggingTextInput && finalizeText()}
                                className="absolute bg-zinc-50 border border-zinc-200 rounded-lg outline-none px-3 py-2 shadow-2xl backdrop-blur-md z-50 placeholder:text-zinc-400 text-zinc-900"
                                placeholder="Type here..."
                                style={{ left: textInput.x, top: textInput.y, fontSize: `${lineWidth * 5 + 10}px`, minWidth: "200px" }}
                                autoFocus
                            />
                        </>
                    )}

                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className={cn("block w-full h-full touch-none", tool === "select" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair", textInput?.visible && "pointer-events-none")}
                    />
                </div>
            </div>

            {/* Toolbar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40">
                <div className={cn("flex items-center gap-4 p-2 pl-4 pr-4 backdrop-blur-md rounded-full shadow-2xl border border-white/20 ring-1 ring-black/5", textInput?.visible ? "bg-white/60" : "bg-white/80")}>
                    <div className="flex items-center gap-1 border-r border-zinc-200 pr-4 mr-0">
                        {/* Select Tool */}
                        <button onClick={() => setTool("select")} className={cn("p-3 rounded-full transition-all duration-300 relative group", tool === "select" ? "bg-black text-white shadow-lg scale-110" : "text-zinc-500 hover:bg-zinc-100")} title="Select & Move">
                            <MousePointer2 className="h-5 w-5" />
                        </button>

                        {/* Drawing Tools */}
                        <button onClick={() => setTool("pen")} className={cn("p-3 rounded-full transition-all duration-300 relative group", tool === "pen" ? "bg-black text-white shadow-lg scale-110" : "text-zinc-500 hover:bg-zinc-100")} title="Pen">
                            <Pen className="h-5 w-5" />
                        </button>
                        <button onClick={() => setTool("rect")} className={cn("p-3 rounded-full transition-all duration-300 relative group", tool === "rect" ? "bg-black text-white shadow-lg scale-110" : "text-zinc-500 hover:bg-zinc-100")} title="Rectangle">
                            <Square className="h-5 w-5" />
                        </button>
                        <button onClick={() => setTool("circle")} className={cn("p-3 rounded-full transition-all duration-300 relative group", tool === "circle" ? "bg-black text-white shadow-lg scale-110" : "text-zinc-500 hover:bg-zinc-100")} title="Circle">
                            <CircleIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => setTool("line")} className={cn("p-3 rounded-full transition-all duration-300 relative group", tool === "line" ? "bg-black text-white shadow-lg scale-110" : "text-zinc-500 hover:bg-zinc-100")} title="Line">
                            <Minus className="h-5 w-5 rotate-[-45deg]" />
                        </button>
                        <button onClick={() => { setTextInput({ x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100, text: "", visible: true }); setTimeout(() => textInputRef.current?.focus(), 10) }} className="p-3 rounded-full transition-all duration-300 relative group text-zinc-500 hover:bg-zinc-100" title="Add Text">
                            <Type className="h-5 w-5" />
                        </button>
                        <button onClick={() => setTool("eraser")} className={cn("p-3 rounded-full transition-all duration-300 relative", tool === "eraser" ? "bg-black text-white shadow-inner" : "text-zinc-500 hover:bg-zinc-100")} title="Eraser">
                            <Eraser className="h-5 w-5" />
                        </button>
                    </div>

                    <div className={cn("flex items-center gap-2 transition-all duration-300 overflow-hidden", ["pen", "rect", "circle", "line", "text"].includes(tool) ? "w-auto opacity-100" : "w-0 opacity-0")}>
                        {colors.map((c) => (
                            <button key={c.name} onClick={() => setColor(c.value)} className={cn("w-6 h-6 border-2 transition-transform hover:scale-110", color === c.value ? "border-zinc-300 scale-125" : "border-transparent")} style={{ backgroundColor: c.value }} title={c.name} />
                        ))}
                    </div>
                    <div className="w-px h-8 bg-black/50 mx-1" />
                    <div className="flex items-center gap-1">
                        <div className="flex flex-col items-center gap-1 px-1">
                            <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="w-16 h-1 bg-black/50 rounded-lg appearance-none cursor-pointer accent-black" />
                        </div>
                        <button onClick={clearCanvas} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2" title="Clear Canvas"><Trash2 className="h-5 w-5" /></button>
                        <button onClick={downloadCanvas} className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors" title="Download"><Download className="h-5 w-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
