import { HfInference } from "@huggingface/inference";

const LANG_MAP = {
    eng: "en", fra: "fr", spa: "es", deu: "de", zho: "zh",
    ita: "it", nld: "nl", rus: "ru", jpn: "ja",
};

const VALID_COMBINATIONS = {
    eng: ["fra", "spa", "deu", "zho", "nld", "ita", "rus", "jpn"],
    fra: ["eng", "spa", "deu", "ita"],
    spa: ["eng", "fra", "deu", "ita"],
    deu: ["eng", "fra", "spa", "ita"],
    zho: ["eng"],
    nld: ["eng"],
    ita: ["eng", "fra", "spa", "deu"],
    rus: ["eng"],
    jpn: ["eng"],
};

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
                status: 405,
                headers: { "Content-Type": "application/json" },
            });
        }

        const body = await req.json();
        const { source, srcLang, tgtLang } = body;

        if (!source || !srcLang || !tgtLang) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const apiKey = process.env.HF_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API key not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const hf = new HfInference(apiKey);

        // Convert to ISO-639-1 codes
        const srcCode = LANG_MAP[srcLang] || srcLang;
        const tgtCode = LANG_MAP[tgtLang] || tgtLang;

        // Check if language combination is valid
        if (!VALID_COMBINATIONS[srcLang] || !VALID_COMBINATIONS[srcLang].includes(tgtLang)) {
            return new Response(JSON.stringify({ error: "Unsupported language pair" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const model = `Helsinki-NLP/opus-mt-${srcCode}-${tgtCode}`;
        console.log("📡 Using Model:", model);
        console.log("🔹 Input Text:", source);
        console.log("🔹 Source Lang:", srcCode, "| Target Lang:", tgtCode);

        const translation = await hf.translation({
            model,
            inputs: source,
        });

        console.log("✅ Translation Response:", translation);

        return new Response(
            JSON.stringify({ ok: true, output: translation.translation_text || translation }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("❌ Translation Error:", error);
        return new Response(JSON.stringify({ error: "Failed to query Hugging Face", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}