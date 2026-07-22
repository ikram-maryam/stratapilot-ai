import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-6 md:mb-0">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]">
               S
             </div>
             <span className="text-lg font-semibold tracking-tight text-white">
               StrataPilot AI
             </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} StrataPilot AI. All rights reserved.</p>
          <p>Proudly built for Australian Strata Management.</p>
        </div>
      </div>
    </footer>
  );
}