import "./globals.css";

export const metadata = {
    title: "AI Translator",
    description: "A powerful AI-driven translation tool that supports multiple languages. Translate text instantly with accuracy and ease.",
    openGraph: {
        type: 'website',
        url: 'https://quick-lang-r1zg6mumv-samuel-fuentes-genius-projects.vercel.app/',
        title: 'AI Translator',
        description: 'A powerful AI-driven translation tool that supports multiple languages. Translate text instantly with accuracy and ease.',
        images: [
            {
                url: 'https://quick-lang-r1zg6mumv-samuel-fuentes-genius-projects.vercel.app/assets/ai-translator.png',
                width: 1200,
                height: 630,
                alt: 'AI Translator interface showcasing language selection, translation input, and output',
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />

                {/* Open Graph metadata */}
                <meta property="og:type" content={metadata.openGraph.type} />
                <meta property="og:url" content={metadata.openGraph.url} />
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
                <meta property="og:image" content={metadata.openGraph.images[0].url} />
                <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
                <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
                <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />

                {/* Twitter Card metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadata.openGraph.title} />
                <meta name="twitter:description" content={metadata.openGraph.description} />
                <meta name="twitter:image" content={metadata.openGraph.images[0].url} />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
