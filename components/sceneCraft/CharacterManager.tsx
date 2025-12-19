"use client"

import React, { useState } from "react"
import { Plus, User, Trash2, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Character = {
    id: string
    realName: string
    characterName: string
    gender: "male" | "female" | "non-binary" | "other"
    role: "lead" | "supporting" | "background"
    photo?: string
}

export default function CharacterManager() {
    const [characters, setCharacters] = useState<Character[]>([
        { id: "1", realName: "Ripun Basumatary", characterName: "Jax", gender: "male", role: "lead", photo: "/assets/characters/ripun.jpg" },
        { id: "2", realName: "Charlize Theron", characterName: "Niki", gender: "female", role: "lead", photo: "/assets/characters/niki.jpg" }
    ])

    const [isAdding, setIsAdding] = useState(false)
    const [newChar, setNewChar] = useState<Partial<Character>>({ role: "lead", gender: "male" })

    const addCharacter = () => {
        if (newChar.realName && newChar.characterName) {
            setCharacters([...characters, { ...newChar, id: Date.now().toString() } as Character])
            setNewChar({ role: "lead", gender: "male", realName: "", characterName: "" })
            setIsAdding(false)
        }
    }

    return (
        <div className="flex-1 bg-[#000000] flex flex-col items-center py-12 px-4 overflow-y-auto w-full">
            <div className="w-full max-w-5xl space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-100">Character Roster</h1>
                        <p className="text-zinc-500 text-sm mt-1">Manage cast details, roles, and assignments.</p>
                    </div>
                    <Button
                        onClick={() => setIsAdding(!isAdding)}
                        className="bg-indigo-700 hover:bg-indigo-600 text-white gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Character
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Add New Card */}
                    {isAdding && (
                        <div className="bg-[#000000] border border-indigo-500/50 rounded-xl p-4 space-y-4 shadow-lg shadow-indigo-500/10 transition-all">
                            <div className="w-full aspect-[4/5] bg-[#18181b] border border-white/5 flex flex-col items-center justify-center text-zinc-500 gap-2 cursor-pointer hover:bg-white/5 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <span className="text-xs">Upload Photo</span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Label className="text-[10px] text-zinc-500 uppercase">Real Name</Label>
                                    <Input
                                        value={newChar.realName}
                                        onChange={(e) => setNewChar({ ...newChar, realName: e.target.value })}
                                        className="h-8 bg-[#18181b] border-white/5 text-zinc-200 mt-1"
                                        placeholder="e.g. Tom Hardy"
                                    />
                                </div>
                                <div>
                                    <Label className="text-[10px] text-zinc-500 uppercase">Character Name</Label>
                                    <Input
                                        value={newChar.characterName}
                                        onChange={(e) => setNewChar({ ...newChar, characterName: e.target.value })}
                                        className="h-8 bg-[#18181b] border-white/5 text-zinc-200 mt-1"
                                        placeholder="e.g. Jax"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <Label className="text-[10px] text-zinc-500 uppercase">Gender</Label>
                                        <Select
                                            value={newChar.gender}
                                            onValueChange={(v: any) => setNewChar({ ...newChar, gender: v })}
                                        >
                                            <SelectTrigger className="h-8 bg-[#18181b] border-white/5 text-zinc-200 mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#18181b] border-white/10 text-zinc-200">
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="non-binary">Non-Binary</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-[10px] text-zinc-500 uppercase">Role</Label>
                                        <Select
                                            value={newChar.role}
                                            onValueChange={(v: any) => setNewChar({ ...newChar, role: v })}
                                        >
                                            <SelectTrigger className="h-8 bg-[#18181b] border-white/5 text-zinc-200 mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#18181b] border-white/10 text-zinc-200">
                                                <SelectItem value="lead">Lead</SelectItem>
                                                <SelectItem value="supporting">Supporting</SelectItem>
                                                <SelectItem value="background">Background</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button onClick={addCharacter} size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white h-8">Save</Button>
                                <Button onClick={() => setIsAdding(false)} size="sm" variant="outline" className="flex-1 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 h-8">Cancel</Button>
                            </div>
                        </div>
                    )}

                    {/* Character Cards */}
                    {characters.map(char => (
                        <div key={char.id} className="bg-[#000000] border border-white/10 rounded-xl p-3 space-y-3 hover:border-white/10 transition-colors group">
                            <div className="w-full aspect-[4/5] bg-[#000000] relative overflow-hidden">
                                {char.photo ? (
                                    <img src={char.photo} alt={char.characterName} className="w-full rounded-xl h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-[#18181b]">
                                        <User className="w-12 h-12 opacity-20" />
                                    </div>
                                )}

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 bg-black/60 hover:bg-red-600 text-white rounded backdrop-blur-sm transition-colors">
                                        <MoreHorizontal className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-bold text-white leading-tight">{char.characterName}</h3>
                                        <p className="text-[10px] text-zinc-500 mt-0.5">{char.realName}</p>
                                    </div>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-medium border ${char.role === 'lead' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-zinc-800 border-white/5 text-zinc-400'}`}>
                                        {char.role}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px]">
                                <div className="bg-[#18181b] rounded p-1.5 border border-white/5 text-center">
                                    <span className="text-zinc-500 block text-[9px]">GENDER</span>
                                    <span className="text-zinc-300 font-medium capitalize">{char.gender}</span>
                                </div>
                                <div className="bg-[#18181b] rounded p-1.5 border border-white/5 text-center">
                                    <span className="text-zinc-500 block text-[9px]">SCENES</span>
                                    <span className="text-zinc-300 font-medium">12</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
