"use client";
import { useState } from "react";
import useTranslator from "../../../utils/translate";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // shadcn/ui Select
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Textarea } from "@/components/ui/textarea"; // shadcn/ui Textarea
import { Alert, AlertDescription } from "@/components/ui/alert"; // shadcn/ui Alert
import { Loader2 } from "lucide-react"; // Spinner icon
import { ArrowLeftRight } from "lucide-react"; // Swap icon

// Language Code to Full Name Mapping
const LANGUAGE_MAP = {
    eng: "English",
    fra: "French",
    spa: "Spanish",
    deu: "German",
    zho: "Chinese",
    nld: "Dutch",
    ita: "Italian",
    rus: "Russian",
    jpn: "Japanese",
};

// Valid Language Combinations (Updated to Remove Unsupported Pairs)
const VALID_COMBINATIONS = {
    eng: ["fra", "spa", "deu", "zho", "nld", "ita", "rus"], // Removed "jpn" (English to Japanese)
    fra: ["eng", "spa", "deu"],
    spa: ["eng", "fra", "deu", "ita"],
    deu: ["eng", "fra", "spa", "ita"],
    zho: ["eng"],
    nld: ["eng"],
    ita: ["eng", "spa", "deu"],
    rus: ["eng"],
    jpn: [], // Japanese has no valid target languages in this configuration
};

export default function Translator() {
    const { translateText } = useTranslator();
    const [text, setText] = useState("");
    const [translated, setTranslated] = useState("");
    const [srcLang, setSrcLang] = useState("eng");
    const [tgtLang, setTgtLang] = useState("fra");
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            const result = await translateText(text, srcLang, tgtLang);
            setTranslated(result);
        } catch (error) {
            setTranslated("⚠️ Translation failed. Please try again.");
        }
        setLoading(false);
    };

    const swapLanguages = () => {
        const temp = srcLang;
        setSrcLang(tgtLang);
        setTgtLang(temp);
        setTranslated(""); // Clear previous translation when swapping languages
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            {/* Header */}
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700 dark:text-white">🌍 AI Translator</h2>

            {/* Language Selection */}
            <div className="flex items-center gap-2 mb-4">
                {/* Source Language Dropdown */}
                <Select value={srcLang} onValueChange={(value) => setSrcLang(value)}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 dark:text-white">
                        <SelectValue placeholder="Source Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 dark:text-white">
                        {Object.keys(VALID_COMBINATIONS).map((lang) => (
                            <SelectItem key={lang} value={lang}>
                                {LANGUAGE_MAP[lang]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Swap Languages Button */}
                <Button variant="ghost" size="icon" onClick={swapLanguages}>
                    <ArrowLeftRight className="h-4 w-4 dark:text-white" />
                </Button>

                {/* Target Language Dropdown */}
                <Select value={tgtLang} onValueChange={(value) => setTgtLang(value)}>
                    <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 dark:text-white">
                        <SelectValue placeholder="Target Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 dark:text-white">
                        {VALID_COMBINATIONS[srcLang].map((lang) => (
                            <SelectItem key={lang} value={lang}>
                                {LANGUAGE_MAP[lang]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Input Textarea */}
            <Textarea
                className="w-full border p-3 rounded-lg bg-gray-50 text-gray-700 resize-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="Enter text to translate..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* Translate Button */}
            <Button
                className="w-full mt-4 py-3 rounded-lg text-white font-medium transition bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleTranslate}
                disabled={loading || !text.trim()}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating...
                    </>
                ) : (
                    "Translate"
                )}
            </Button>

            {/* Translated Text */}
            <div className="mt-4 p-3 bg-gray-100 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700">
                <h3 className="font-medium text-gray-700 dark:text-white">🔹 Translated Text:</h3>
                {translated ? (
                    <p className="mt-1 text-gray-900 font-semibold dark:text-white">{translated}</p>
                ) : (
                    <Alert className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                        <AlertDescription>No translation yet.</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
}