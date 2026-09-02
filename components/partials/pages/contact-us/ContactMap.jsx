"use client";
import { useState } from "react";

export default function ContactMap({ src }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`ps-contact__map${loaded ? " is-loaded" : ""}`}>
            <iframe
                src={src}
                title="Healthfirst Medicorp location"
                loading="lazy"
                allowFullScreen
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
}
