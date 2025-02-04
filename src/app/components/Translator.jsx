"use client"
import { useState } from "react";
import useTranslator from "../../../utils/translate";

export default function Translator() {
    const { translateText } = useTranslator(); // 🛠️ 确保解构 `translateText`
    const [text, setText] = useState("");
    const [translated, setTranslated] = useState("");

    const handleTranslate = async () => {
        const result = await translateText(text, "eng", "fra"); // 示例：英翻法
        setTranslated(result);
    };

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleTranslate}>Translate</button>
            <p>{translated}</p>
        </div>
    );
}
