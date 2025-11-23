import { memo } from 'react';
import { Hexagon, Activity, Shield, Zap } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-gray-900 bg-black/90 relative z-10 py-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0 flex items-center gap-2">
         <Hexagon className="w-6 h-6 text-gray-600" />
         <span className="text-gray-500 font-['Share_Tech_Mono'] tracking-widest">IRIS PROJECT © 8004</span>
      </div>
      <div className="flex gap-6">
         <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors"><Activity className="w-5 h-5" /></a>
         <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors"><Shield className="w-5 h-5" /></a>
         <a href="#" className="text-gray-600 hover:text-cyan-400 transition-colors"><Zap className="w-5 h-5" /></a>
      </div>
    </div>
  </footer>
);

export default memo(Footer);