"use client"; // Ensure this runs only in the client

import { useState } from "react";
import Groq from "groq-sdk";

const apiKey = process.env.API_KEY

const groq = new Groq({ apiKey: apiKey });

export default function useTranslator(sourceLang = "en", targetLang = "es") {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const translateText = async (text) => {
        setIsLoading(true);
        setError("");

        try {
            // Make the translation request using Groq SDK
            const chatCompletion = await groq.chat.completions.create({
                messages: [
                    { role: "user", content: text },
                ],
                model: "llama-3.3-70b-versatile", // Ensure the model is correct
            });

            const translated = chatCompletion.choices[0]?.message?.content || "No translation available";
            setTranslatedText(translated);
            return translated;
        } catch (err) {
            console.error("Translation error:", err);
            setError("Translation failed. Please try again.");
            setTranslatedText("");
            return "";
        } finally {
            setIsLoading(false);
        }
    };

    return { translateText, isLoading, error, translatedText };
}
