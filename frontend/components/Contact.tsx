"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Subtle background divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-white/5 to-black/20 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl shadow-blue-900/10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
              Ready to automate your strata business?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join forward-thinking Australian strata managers who are reducing admin overhead and increasing portfolio capacity.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Work Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Work Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="sr-only">Company Name</label>
              <input
                type="text"
                id="company"
                placeholder="Strata Company Name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-6"
            >
              Request Personalized Demo <Send size={18} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            No credit card required. We&apos;ll be in touch within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}