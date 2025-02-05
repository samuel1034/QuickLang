import Navbar from "./components/Navbar";
import Translator from "./components/Translator";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content (Flexible Grow Area) */}
            <main className="flex-grow p-4 bg-black">
                <Translator />
            </main>

            {/* Footer (Stays at the Bottom) */}
            <Footer />
        </div>
    );
}