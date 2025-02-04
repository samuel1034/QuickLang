export default function useTranslator() {
    const translateText = async (source, srcLang, tgtLang) => {
        try {
            const response = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source, srcLang, tgtLang }),
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            return data.output;
        } catch (error) {
            console.error("Translation Error:", error);
            return "Translation failed";
        }
    };

    return { translateText }; // 确保返回的是 `{ translateText }`
}
