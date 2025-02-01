"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
]

export default function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    if (!mounted) {
        return null
    }

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">TranslateAI</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-medium transition-colors duration-300 ${
                                pathname === item.path
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Theme Toggle and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Theme"
                        onClick={toggleTheme}
                        className="hover:bg-transparent focus:ring-0 focus:outline-none"
                    >
                        {theme === "dark" ? (
                            <SunIcon className="h-6 w-6 text-yellow-500" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                        )}
                        <span className="sr-only">Toggle Theme</span>
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Menu"
                        onClick={toggleMenu}
                        className="md:hidden hover:bg-transparent focus:ring-0 focus:outline-none"
                    >
                        <HamburgerMenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 border-t border-gray-200 dark:border-gray-700">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block py-2 text-sm font-medium transition-colors duration-300 ${
                                pathname === item.path
                                    ? "text-blue-500 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                            }`}
                            onClick={toggleMenu}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}