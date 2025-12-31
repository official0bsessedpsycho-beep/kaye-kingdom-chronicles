import React from 'react';

const celebrations = [
    {
        title: "Pasko",
        englishTitle: "Pasko na Naman!",
        image: "/images/pasko.png",
        glow: "shadow-[0_0_30px_rgba(255,215,0,0.3)]",
    },
    {
        title: "Flores de Mayo",
        image: "/images/flores.png",
        glow: "shadow-[0_0_30px_rgba(255,255,255,0.4)]",
    },
    {
        title: "Sinulog Festival",
        image: "/images/sinulog.png",
        glow: "shadow-[0_0_30px_rgba(255,50,50,0.3)]",
    },
];

const FestiveCelebrations = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden">
            {/* Background Decorative Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-gold/50 rounded-full animate-twinkle" />
                <div className="absolute bottom-1/4 right-20 w-3 h-3 bg-gold/30 rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 text-center mb-16">
                <h2 className="font-magical text-3xl md:text-4xl text-[#e8dcb8] mb-3 text-shadow-magical">
                    Festive Celebrations
                </h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#c5a059]" />
                    <span className="text-[#c5a059] font-elegant italic tracking-wider">Pasko na Naman!</span>
                    <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#c5a059]" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 pb-12">
                {celebrations.map((item, index) => (
                    <div
                        key={item.title}
                        className="group relative aspect-[3/4] cursor-pointer"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        {/* Card Frame/Border - Ornate Gold */}
                        <div className="absolute -inset-[3px] bg-gradient-to-tr from-[#8a6e3e] via-[#ffd700] to-[#8a6e3e] rounded-xl opacity-80 group-hover:opacity-100 transition-opacity p-[1px]">
                            <div className="absolute inset-0 bg-[#06140b] rounded-xl m-[2px]" />
                        </div>

                        {/* Inner Card Content */}
                        <div className={`relative h-full w-full rounded-xl overflow-hidden border border-[#c5a059]/30 group-hover:border-[#c5a059] transition-all duration-500 transform group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-center transfrom translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="font-magical text-2xl text-[#ffd700] drop-shadow-[0_2px_4px_rgba(0,0,0,1)] mb-2 tracking-wide">
                                    {item.title}
                                </h3>
                                {item.englishTitle && (
                                    <p className="font-elegant text-white/90 text-sm italic">
                                        {item.englishTitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Corner Bells/Decor for Christmas vibe if applicable, simplified clearly here */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="text-2xl drop-shadow-lg">✨</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FestiveCelebrations;
