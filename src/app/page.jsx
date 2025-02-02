import Navbar from "./components/Navbar"
import Translator from "./components/Translator"

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-100">
            <Navbar />
            <Translator />
        </main>
    )
}

