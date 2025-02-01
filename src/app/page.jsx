import Navbar from "./components/Navbar"
import Translation from "./components/Translation"

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100 py-8">
            <Navbar />
            <Translation />
        </main>
    )
}

