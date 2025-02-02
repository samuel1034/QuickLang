"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Settings, History, BookMarked } from "lucide-react"

export default function Navbar() {
    const { theme, setTheme } = useTheme()

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-2xl font-bold">AI Translator</span>
                </Link>

                <div className="ml-auto flex items-center space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/history">
                            <History className="h-5 w-5" />
                            <span className="sr-only">History</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/favorites">
                            <BookMarked className="h-5 w-5" />
                            <span className="sr-only">Favorites</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/settings">
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

