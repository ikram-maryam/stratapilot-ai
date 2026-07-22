"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Boutique",
    description: "For smaller independent strata agencies.",
    price: "$499",
    period: "/mo",
    features: [
      "Up to 50 Buildings",
      "AI Invoice Extraction",
      "Basic Email Drafting",
      "Standard Support"
    ],
    buttonText: "Get Started",
    buttonStyle: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    popular: false
  },
  {
    name: "Agency",
    description: "For established strata management firms.",
    price: "$999",
    period: "/mo",
    features: [
      "Up to 200 Buildings",
      "Advanced Workflow Automation",
      "Custom By-Law AI Training",
      "Priority Support"
    ],
    buttonText: "Start Free Trial",
    buttonStyle: "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For national scale operations.",
    price: "Custom",
    period: "",
    features: [
      "Unlimited Buildings",
      "Dedicated AI Model Tuning",
      "White-label Client Portal",
      "24/7 Phone Support"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
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
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Scale your strata business without scaling your headcount.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 flex flex-col ${
                plan.popular
                  ? "bg-blue-900/10 border border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-white">{plan.name}</h3>
                <p className="text-sm text-gray-400 h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-gray-400 font-medium">{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check size={20} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`w-full py-3 rounded-lg font-medium text-center transition-all duration-200 block ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}