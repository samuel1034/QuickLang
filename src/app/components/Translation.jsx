"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
]

export default function Translation() {
    const [sourceText, setSourceText] = useState("")
    const [targetLanguage, setTargetLanguage] = useState("")
    const [translatedText, setTranslatedText] = useState("")

    const handleTranslate = () => {
        // Here you would typically call your translation API
        // For this example, we'll just append "Translated" to the source text
        setTranslatedText(`Translated to ${targetLanguage}: ${sourceText}`)
    }

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold text-center mb-6">Translation Tool</h1>

            <div className="space-y-2">
                <label htmlFor="source-text" className="block text-sm font-medium text-gray-700">
                    Text to translate
                </label>
                <Textarea
                    id="source-text"
                    placeholder="Enter text to translate"
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    className="min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="target-language" className="block text-sm font-medium text-gray-700">
                    Target Language
                </label>
                <Select onValueChange={setTargetLanguage}>
                    <SelectTrigger id="target-language">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={handleTranslate} disabled={!sourceText || !targetLanguage} className="w-full">
                Translate
            </Button>

            {translatedText && (
                <div className="space-y-2">
                    <label htmlFor="translated-text" className="block text-sm font-medium text-gray-700">
                        Translated Text
                    </label>
                    <Textarea id="translated-text" value={translatedText} readOnly className="min-h-[100px]" />
                </div>
            )}
        </div>
    )
}

