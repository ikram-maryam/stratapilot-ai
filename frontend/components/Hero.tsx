"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400 mb-8 backdrop-blur-sm">
            <Sparkles size={16} className="text-blue-400" />
            <span>Purpose-built for Australian Strata</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 max-w-4xl">
            The AI Back Office for <br className="hidden md:block" />
            Modern Strata Managers
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Automate invoice processing, compliance checks, and lot owner communications.
            Reclaim 20+ hours a week per portfolio manager.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/login"
              className="bg-white text-black px-8 py-3.5 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              href="#features"
              className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200 flex items-center justify-center backdrop-blur-sm"
            >
              Explore Features
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}