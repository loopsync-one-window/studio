import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dithering } from "@paper-design/shaders-react"

export default function Page() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Dithering Effect */}
            <div className="absolute inset-0 z-0">
                <Dithering
                    style={{ height: "100%", width: "100%" }}
                    colorBack="hsl(0, 0%, 0%)"
                    colorFront="#e60076"
                    shape={"cat" as any}
                    type="4x4"
                    pxSize={3}
                    offsetX={0}
                    offsetY={0}
                    scale={0.8}
                    rotation={0}
                    speed={0.1}
                />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white text-center">
                    Studio 3.0
                </h1>

                {/* <p className="text-xl md:text-2xl text-white max-w-2xl text-center font-light leading-relaxed px-4">
                    Studio 3.0 is a cinematic creation system where films are built as scenes and shots, not files. It combines professional editing with AI-assisted direction, giving a single creator the control of an entire studio.
                </p> */}


                <Link href="/home">
                    <Button
                        size="lg"
                        className="text-lg px-8 py-6 cursor-pointer rounded-full bg-white text-black hover:bg-white/95 transition-all"
                    >
                        Try Free
                    </Button>
                </Link>
            </div>

            <footer className="absolute bottom-0 w-full bg-black py-4 z-20 text-center">
                <p className="text-white font-semibold text-sm">
                    LoopSync Studio · An Intellaris Private Limited Company
                </p>
            </footer>
        </div>
    )
}
