"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="border-b dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex h-16 items-center px-4 container mx-auto">
                {/* Brand Logo */}
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">AI Translator</span>
                </Link>



            </div>
        </nav>
    );
}