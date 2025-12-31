import React from 'react';
import { GraduationCap, Heart, Plane, Users } from 'lucide-react';

const chapters = [
    {
        icon: GraduationCap,
        label: "Academics",
        position: "top-16 left-[20%]",
        rotate: "-rotate-2"
    },
    {
        icon: Heart,
        label: "Love Life",
        position: "top-[40%] left-[45%]",
        rotate: "rotate-2"
    },
    {
        icon: Users,
        label: "Travel Adventures",
        position: "top-[25%] right-[15%]",
        rotate: "-rotate-1"
    },
    {
        icon: Users,
        label: "Family & Friends",
        position: "bottom-[25%] left-[30%]",
        rotate: "rotate-1"
    },
];

const LifeChapters = () => {
    return (
        <section id="chapters" className="relative py-20 px-4">
            {/* Floating Header Banner */}
            <div className="relative z-10 flex justify-center -mb-8">
                <div className="relative transform hover:scale-105 transition-transform duration-300">
                    {/* Scroll/Ribbon SVG or CSS shape */}
                    <div className="absolute inset-0 bg-[#c5a059] shadow-lg transform skew-x-12 rounded-sm border-2 border-[#8a6e3e]" />
                    <div className="relative bg-[#e8dcb8] px-16 py-4 shadow-[0_5px_15px_rgba(0,0,0,0.3)] border-y-[3px] border-[#c5a059] transform -skew-x-12">
                        <h2 className="font-magical text-3xl md:text-4xl text-[#3a2f20] transform skew-x-12 tracking-wider drop-shadow-sm">
                            Life Chapters
                        </h2>
                        <div className="absolute -left-2 top-0 bottom-0 w-2 bg-[#8a6e3e] transform skew-x-12 origin-right" />
                        <div className="absolute -right-2 top-0 bottom-0 w-2 bg-[#8a6e3e] transform skew-x-12 origin-left" />
                    </div>
                </div>
            </div>

            <div className="text-center mt-6 mb-12 relative z-10">
                <div className="inline-block px-4 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#c5a059]/30">
                    <span className="text-[#c5a059] font-elegant italic tracking-widest text-sm">
                        Explore Kaye's Storybook ✦
                    </span>
                </div>
            </div>

            {/* Main Map Scroll Container */}
            <div className="max-w-6xl mx-auto relative">
                {/* Scroll Ends Effects */}
                <div className="absolute -left-4 top-4 bottom-4 w-8 bg-paper-pattern bg-contain shadow-2xl z-20 rounded-l-lg border-l-4 border-[#5c4d3c]"
                    style={{ backgroundImage: "url('/images/parchment-texture.jpg')" }} />
                <div className="absolute -right-4 top-4 bottom-4 w-8 bg-paper-pattern bg-contain shadow-2xl z-20 rounded-r-lg border-r-4 border-[#5c4d3c]"
                    style={{ backgroundImage: "url('/images/parchment-texture.jpg')" }} />

                {/* Map Content */}
                <div className="relative aspect-[16/9] md:aspect-[2.2/1] bg-[#e6dcc5] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border-y-8 border-[#3a2f20] group mx-2">

                    {/* Parchment Texture Overlay */}
                    <div className="absolute inset-0 opacity-40 mix-blend-multiply"
                        style={{
                            backgroundImage: `url("https://www.transparenttextures.com/patterns/old-paper.png")`,
                            filter: 'sepia(0.5) contrast(1.2)'
                        }}
                    />

                    {/* Map Terrain/Background Image - Fantasy Map Style */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-70 grayscale-[0.3] sepia-[0.4]" />

                    {/* Dotted Path */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md opacity-80">
                        <path
                            d="M 200 120 Q 450 280 650 150 T 950 250"
                            fill="none"
                            stroke="#5c4d3c"
                            strokeWidth="3"
                            strokeDasharray="8 6"
                            className="hidden md:block"
                        />
                    </svg>

                    {/* Interactive Nodes */}
                    <div className="absolute inset-0">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter.label}
                                className={`absolute ${chapter.position} group/node cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 ${chapter.rotate}`}
                            >
                                {/* Node Ribbon */}
                                <div className="relative flex flex-col items-center">
                                    <div className="relative z-10 px-6 py-2 bg-[#f0e6d2] border-2 border-[#8b7355] shadow-[0_4px_6px_rgba(0,0,0,0.3)] min-w-[140px] text-center transform hover:scale-105 transition-transform">
                                        {/* Inner Border */}
                                        <div className="absolute inset-[2px] border border-[#8b7355]/30" />

                                        {chapter.label === "Love Life" && (
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                                                ❤️
                                            </div>
                                        )}

                                        <span className="font-magical text-[#3a2f20] font-bold text-sm md:text-base tracking-wide whitespace-nowrap">
                                            {chapter.label}
                                        </span>
                                    </div>

                                    {/* Ribbon Tails */}
                                    <div className="absolute top-1/2 -left-3 w-4 h-6 bg-[#d4c5a0] transform -translate-y-1/2 skew-y-[30deg] border-l border-b border-[#8b7355] -z-10" />
                                    <div className="absolute top-1/2 -right-3 w-4 h-6 bg-[#d4c5a0] transform -translate-y-1/2 -skew-y-[30deg] border-r border-b border-[#8b7355] -z-10" />
                                </div>
                            </div>
                        ))}

                        {/* Taurus Sign Watermark */}
                        <div className="absolute top-8 right-12 text-[#5c4d3c] opacity-60 mix-blend-overlay pointer-events-none">
                            <span className="font-magical text-6xl">♉</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifeChapters;
