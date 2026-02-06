'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { decodeLetterData } from '@/lib/shareUtils';
import { DoodleEnvelope, DoodleHeartFilled } from '@/components/DoodleIcons';
import Home from '@/app/page';

export default function ShortLinkPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [letterData, setLetterData] = useState(null);

    useEffect(() => {
        async function fetchLetter() {
            try {
                const res = await fetch(`/api/letter?id=${id}`);
                if (!res.ok) throw new Error('Letter not found');

                const { data } = await res.json();
                const decoded = decodeLetterData(data);

                if (decoded) {
                    setLetterData(decoded);
                } else {
                    throw new Error('Invalid letter data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchLetter();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen min-h-dvh flex items-center justify-center">
                <div className="grain-overlay" />
                <div className="text-center">
                    <div className="mb-4 animate-bounce text-[var(--heart-red)]">
                        <DoodleEnvelope size={60} />
                    </div>
                    <p className="font-handwritten text-xl text-[var(--ink-deep)] opacity-60">
                        Fetching your message...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen min-h-dvh flex items-center justify-center">
                <div className="grain-overlay" />
                <div className="text-center p-8 bg-white/80 backdrop-blur rounded-2xl border border-pink-100 shadow-xl">
                    <div className="mb-4 text-[var(--heart-red)]">
                        <DoodleHeartFilled size={50} color="var(--heart-red)" />
                    </div>
                    <h1 className="text-2xl font-serif text-[var(--ink-deep)] mb-2">Oops!</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-[var(--heart-red)] text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                    >
                        Create Your Own?
                    </a>
                </div>
            </main>
        );
    }

    // Pass the pre-fetched letter data to the Home component
    return <Home initialLetterData={letterData} />;
}
