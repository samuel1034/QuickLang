export default function useTranslator() {
    const translateText = async (text, srcLang, tgtLang) => {
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source: text, srcLang, tgtLang }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Translation failed");
            }

            console.log("🔍 API Response:", data);

            return data.output; // ✅ Ensure correct extraction
        } catch (error) {
            console.error("❌ Translation Error:", error);
            return "Error translating text";
        }
    };

    return { translateText };
}
