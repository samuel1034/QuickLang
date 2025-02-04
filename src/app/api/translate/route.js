import { HfInference } from "@huggingface/inference";

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
                status: 405,
                headers: { "Content-Type": "application/json" },
            });
        }

        const body = await req.json(); // Parse request JSON

        if (!body.source || !body.srcLang || !body.tgtLang) {
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

        console.log("📡 Requesting translation from Hugging Face...");
        console.log("🔹 Input Text:", body.source);
        console.log("🔹 Source Lang:", body.srcLang, "| Target Lang:", body.tgtLang);

        const translation = await hf.translation({
            model: "Helsinki-NLP/opus-mt-en-es",
            inputs: body.source,
            parameters: { src_lang: body.srcLang, tgt_lang: body.tgtLang },
        });

        console.log("✅ Translation Response:", translation);

        return new Response(
            JSON.stringify({ ok: true, output: translation.translation_text || translation }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("❌ Translation Error:", error);
        return new Response(JSON.stringify({ error: "Failed to query Hugging Face" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
