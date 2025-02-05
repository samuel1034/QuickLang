import "./globals.css";

export const metadata = {
    title: "AI Translator",
    description: "A powerful AI-driven translation tool that supports multiple languages. Translate text instantly with accuracy and ease.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
