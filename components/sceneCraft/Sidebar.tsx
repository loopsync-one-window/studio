"use client"

import React, { useState } from "react"
import { ChevronRight, Folder, FileVideo, FileText, Search, Video, Clapperboard, Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface Node {
    id: string
    name: string
    type: "folder" | "script" | "scene" | "asset"
    children?: Node[]
    expanded?: boolean
}

const initialTree: Node[] = [
    {
        id: "root",
        name: "Project: Dark Matter",
        type: "folder",
        expanded: true,
        children: [
            {
                id: "scripts",
                name: "Screenplays",
                type: "folder",
                expanded: true,
                children: [
                    { id: "sc-01", name: "Episode 1: Awakening", type: "script" },
                    { id: "sc-02", name: "Episode 2: The Fall", type: "script" },
                ]
            },
            {
                id: "scenes",
                name: "Scenes",
                type: "folder",
                expanded: true,
                children: [
                    { id: "vid-01", name: "Opening Shot (EXT)", type: "scene" },
                    { id: "vid-02", name: "Chase Sequence", type: "scene" },
                ]
            }
        ]
    }
]

export default function Sidebar({ activeNodeId, onSelect }: { activeNodeId: string | null, onSelect: (node: Node) => void }) {
    const [tree, setTree] = useState(initialTree)

    const toggleNode = (nodeId: string) => {
        const updateTree = (nodes: Node[]): Node[] => {
            return nodes.map(node => {
                if (node.id === nodeId) return { ...node, expanded: !node.expanded }
                if (node.children) return { ...node, children: updateTree(node.children) }
                return node
            })
        }
        setTree(updateTree(tree))
    }

    const renderNode = (node: Node, depth: number = 0) => {
        const isActive = activeNodeId === node.id
        const paddingLeft = depth * 12 + 12

        return (
            <div key={node.id}>
                <div
                    className={cn(
                        "flex items-center gap-2 py-1 pr-2 text-xs cursor-pointer select-none border-l-2 border-transparent transition-colors",
                        isActive ? "bg-indigo-500/10 text-white border-indigo-500" : "text-zinc-400 hover:text-zinc-200 hover:bg-[#2A2A2A]"
                    )}
                    style={{ paddingLeft: `${paddingLeft}px` }}
                    onClick={() => {
                        if (node.children) toggleNode(node.id)
                        else onSelect(node)
                    }}
                >
                    {node.children ? (
                        <ChevronRight className={cn("w-3 h-3 transition-transform text-zinc-500", node.expanded && "rotate-90")} />
                    ) : (
                        <div className="w-3" /> // Spacer
                    )}

                    {node.type === 'folder' && <Folder className="w-3.5 h-3.5 fill-zinc-700 text-zinc-500" />}
                    {node.type === 'script' && <FileText className="w-3.5 h-3.5 text-indigo-500" />}
                    {node.type === 'scene' && <Clapperboard className="w-3.5 h-3.5 text-yellow-500" />}

                    <span className="truncate flex-1 font-medium">{node.name}</span>
                </div>
                {node.children && node.expanded && (
                    <div>{node.children.map(child => renderNode(child, depth + 1))}</div>
                )}
            </div>
        )
    }

    return (
        <aside className="w-[280px] h-full bg-[#000000] border-r border-white/5 flex flex-col shrink-0">
            {/* Title Bar */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 justify-between bg-[#000000]">
                <span className="text-xs font-bold text-zinc-100 uppercase tracking-wide">Scene Explorer</span>
            </div>

            {/* Search */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                        className="w-full bg-[#0F0F0F] border border-white/5 rounded-full text-xs text-zinc-300 pl-7 py-2 focus:border-white/5 focus:outline-none placeholder:text-zinc-700"
                        placeholder="Search assets..."
                    />
                </div>
            </div>

            {/* Tree View */}
            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                {tree.map(node => renderNode(node))}
            </div>

            {/* Bottom Status */}
            <div className="h-8 border-t border-white/5 flex items-center px-3 text-[10px] text-zinc-500 gap-2">
                <span className="text-xs font-bold text-zinc-100 uppercase tracking-wide">Loopsync Compute-Enterprise</span>
            </div>
        </aside>
    )
}
