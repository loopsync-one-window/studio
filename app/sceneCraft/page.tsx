import { Metadata } from 'next'
import SceneCraftLayout from "@/components/sceneCraft/SceneCraftLayout"

export const metadata: Metadata = {
    title: 'SceneCraft Studio - AI Movie Generation',
    description: 'Generate professional movie scripts and cinematic videos using AI-powered tools.',
}

export default function Page() {
    return <SceneCraftLayout />
}
