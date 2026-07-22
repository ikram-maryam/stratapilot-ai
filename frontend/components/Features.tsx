"use client";

import { motion } from "framer-motion";
import { Receipt, Mail, ShieldCheck, Wrench } from "lucide-react";

const features = [
  {
    icon: <Receipt className="text-blue-400" size={24} />,
    title: "Automated Invoice Processing",
    description: "AI extracts data from contractor invoices, cross-references work orders, and prepares them for OC approval instantly."
  },
  {
    icon: <Mail className="text-blue-400" size={24} />,
    title: "Smart Committee Comms",
    description: "Draft responses to lot owners regarding levies, by-laws, and AGM minutes using context-aware AI."
  },
  {
    icon: <ShieldCheck className="text-blue-400" size={24} />,
    title: "BCA & Local Law Compliance",
    description: "Automated checking of essential safety measures and compliance certificates specific to your state."
  },
  {
    icon: <Wrench className="text-blue-400" size={24} />,
    title: "Maintenance Triage",
    description: "Automatically categorize and assign maintenance requests from owners to the correct preferred contractors."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Subtle background divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white"
          >
            Everything you need to scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Stop drowning in admin. StrataPilot AI handles the repetitive, high-volume tasks so your managers can focus on building relationships.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}