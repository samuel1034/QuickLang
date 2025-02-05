// Footer.js
import React from "react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                {/* Copyright Text */}
                <p className="text-sm md:text-base mb-2 md:mb-0">
                    © {new Date().getFullYear()} AI Translator. All rights reserved.
                </p>

                {/* Made with Love Credit */}
                <p className="text-sm md:text-base">
                    Made with{" "}
                    <span role="img" aria-label="heart" className="text-red-500">
            ❤️
          </span>{" "}
                    by{" "}
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                    >
                        Samuel Fuentes
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;