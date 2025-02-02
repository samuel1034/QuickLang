"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Copy, Mic, Volume2, ThumbsUp, ThumbsDown, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import useTranslator from "../../../utils/translate.js"; // Import the custom hook

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
];

export default function Translator() {
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("es");
    const { translateText, isLoading, error } = useTranslator(sourceLang, targetLang);

    const handleTranslate = async () => {
        if (!sourceText) return;
        setTranslatedText("");  // Clear previous translation
        const translation = await translateText(sourceText);
        setTranslatedText(translation);
    };

    const swapLanguages = () => {
        const temp = sourceLang;
        setSourceLang(targetLang);
        setTargetLang(temp);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <div className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="flex items-center gap-2 justify-center">
                    <Select value={sourceLang} onValueChange={setSourceLang}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={swapLanguages}>
                        <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                    <Select value={targetLang} onValueChange={setTargetLang}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select language" />
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
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <Textarea
                                value={sourceText}
                                onChange={(e) => setSourceText(e.target.value)}
                                placeholder="Enter text to translate"
                                className="min-h-[200px] pr-12"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => {
                                    /* Implement mic input */
                                }}
                            >
                                <Mic className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex justify-between items-center px-2">
                            <Button variant="ghost" size="icon">
                                <Volume2 className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">{sourceText.length}/5000</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Textarea value={translatedText} readOnly placeholder="Translation" className="min-h-[200px]" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2"
                                onClick={() => navigator.clipboard.writeText(translatedText)}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex justify-between items-center px-2">
                            <Button variant="ghost" size="icon">
                                <Volume2 className="h-4 w-4" />
                            </Button>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                    <ThumbsUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <ThumbsDown className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button onClick={handleTranslate} disabled={!sourceText || isLoading} className="w-full">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Translating...
                        </>
                    ) : (
                        "Translate"
                    )}
                </Button>
                {isLoading && <Progress value={45} className="w-full" />}
            </div>
        </div>
    );
}
