import React from 'react';
import { Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const FacebookConnect = () => {
    return (
        <section id="family" className="relative py-12 px-4 text-center scroll-mt-24">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40" />
                    <p className="font-elegant text-lg text-[#d4c5a0] italic">
                        Import Your Memories from Facebook
                    </p>
                    <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40" />
                </div>

                <Button
                    size="lg"
                    onClick={() => toast.info('Coming soon: Facebook import is not available yet.')}
                    className="w-full sm:w-auto bg-[#1877F2] hover:bg-[#166fe5] text-white font-clean rounded-full px-8 shadow-lg hover:shadow-[#1877F2]/30 transition-all duration-300 gap-3"
                >
                    <span className="font-bold tracking-wide">Connect & Share</span>
                    <Facebook className="w-5 h-5 fill-current" />
                </Button>

                <p className="text-xs text-white/40 font-clean tracking-wider uppercase">
                    I-share ang iyong mga alaala mula sa Facebook
                </p>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#1877F2]/5 blur-3xl rounded-full -z-10" />
        </section>
    );
};

export default FacebookConnect;
