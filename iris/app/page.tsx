'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Activity, 
  Terminal, 
  Fingerprint, 
  Layers,
  Menu,
  X,
  ChevronRight,
  Hexagon,
  Database,
  Lock,
  Share2,
  FileText,
  CheckCircle,
  Clock,
  Users,
  Code,
  Server
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const minimalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;700&family=Share+Tech+Mono&display=swap');

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes scanline {
    0% { bottom: 100%; }
    100% { bottom: -100%; }
  }
  
  /* Custom utility for the glitch hover effect */
  .hover-glitch:hover {
    animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
  }
`;

// --- Components ---

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ERC8004IRIS0101IDENTITYAIZXY';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 16, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.98 ? '#ff00ff' : '#00f3ff';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0" />;
};



const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Tailwind-based Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 mb-8 border border-cyan-500/30 rounded-full bg-cyan-900/10 backdrop-blur-sm animate-pulse">
          <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]"></div>
          <span className="text-xs font-['Share_Tech_Mono'] text-cyan-300 tracking-widest">SYSTEM ONLINE // V.2.0.45</span>
        </div>

        {/* Main Title Structure */}
        <div className="relative mb-12 group">
            {/* Rotating Holographic Rings using Tailwind arbitrary animation values */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[180%] border border-cyan-500/20 rounded-[40%] animate-[spin_20s_linear_infinite] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[160%] border border-pink-500/20 rounded-[45%] animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
            
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 relative z-20 font-['Rajdhani']">
              {/* Using Tailwind arbitrary values for text-shadow */}
              <span className="block md:inline hover-glitch cursor-default [text-shadow:0_0_10px_rgba(0,243,255,0.7),0_0_20px_rgba(0,243,255,0.5)] hover:text-[#00f3ff]">ERC</span>
              <span className="text-cyan-500 mx-2">-</span>
              <span className="block md:inline hover-glitch cursor-default [text-shadow:0_0_10px_rgba(255,0,255,0.7),0_0_20px_rgba(255,0,255,0.5)] hover:text-[#ff00ff]">8004</span>
            </h1>
            
            {/* Decorative lines */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyan-500 shadow-[0_0_15px_#00f3ff]"></div>
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-light font-['Rajdhani']">
          The backbone of <span className="text-white font-semibold">Autonomous Identity</span>. 
          Bridging AI Agents and decentralized packet verification on the immutable ledger.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-['Rajdhani']">
          <button className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-wider uppercase transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.4)] flex items-center justify-center gap-2 [clip-path:polygon(10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%)]">
            <Terminal className="w-5 h-5" />
            Initiate Sequence
          </button>
          <button className="w-full sm:w-auto px-8 py-4 border border-pink-500/50 hover:border-pink-500 text-pink-400 hover:text-pink-300 font-bold tracking-wider uppercase transition-all hover:shadow-[0_0_30px_rgba(255,0,255,0.2)] flex items-center justify-center gap-2 [clip-path:polygon(10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%)]">
            <Layers className="w-5 h-5" />
            View Whitepaper
          </button>
        </div>

        {/* Floating Data Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
            {[
                { label: 'Active Agents', val: '4,023', color: 'text-cyan-400' },
                { label: 'Block Height', val: '18.2M', color: 'text-pink-400' },
                { label: 'Identity Packets', val: '892K', color: 'text-purple-400' },
                { label: 'Network Status', val: 'OPTIMAL', color: 'text-green-400' }
            ].map((stat, i) => (
                <div key={i} className="p-4 border-l-2 border-gray-800 hover:border-cyan-500 bg-gray-900/30 backdrop-blur hover:bg-gray-800/50 transition-all duration-300 group">
                    <div className="text-xs font-['Share_Tech_Mono'] text-gray-500 uppercase mb-1 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                    <div className={`text-2xl font-['Share_Tech_Mono'] font-bold ${stat.color}`}>{stat.val}</div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}


const FeatureCard: React.FC<FeatureCardProps>  = ({ icon: Icon, title, desc, color }) => (
  <div className="relative p-1 group">
    {/* Animated Border Gradient */}
    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 group-hover:opacity-100 blur transition-opacity duration-500`}></div>
    
    <div className="relative h-full bg-black border border-gray-800 p-8 hover:border-transparent transition-colors overflow-hidden">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="mb-6 inline-block p-3 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors flex items-center gap-2 font-['Rajdhani']">
        {title}
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
      </h3>
      
      <p className="text-gray-400 font-light leading-relaxed font-['Rajdhani']">
        {desc}
      </p>
    </div>
  </div>
);


const Features = () => {
  const features = [
    {
      icon: Cpu,
      title: "Autonomous AI Agents",
      desc: "Deploy self-sovereign agents capable of executing complex logic on-chain with minimal latency.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Fingerprint,
      title: "Identity Packets",
      desc: "Secure, decentralized verification packets allowing seamless cross-chain identity synthesis.",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Universal Sync",
      desc: "Real-time synchronization across distributed ledgers ensuring atomic consistency for data states.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <h2 className="text-4xl font-bold mb-4 font-['Rajdhani']"><span className="text-cyan-500">CORE</span> MODULES</h2>
                <div className="h-1 w-20 bg-pink-500"></div>
            </div>
            <p className="text-gray-400 font-['Share_Tech_Mono'] mt-4 md:mt-0 text-right hidden md:block">
                // ACCESSING NEURAL DATABASE...<br/>
                // LOADING MODULES COMPLETE
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
};

const IdentityArchitecture = () => {
  const layers = [
    { name: 'Application Layer', detail: 'User Interfaces, Wallets, dApps', icon: Layers },
    { name: 'Packet Verification', detail: 'ERC-8004 Consensus Mechanism', icon: Shield },
    { name: 'Data Availability', detail: 'IPFS / Arweave Storage Bridges', icon: Database },
    { name: 'Settlement Layer', detail: 'Ethereum Mainnet / L2 Rollups', icon: Server },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="text-4xl font-bold mb-6 font-['Rajdhani'] text-white">NEURAL <span className="text-pink-500">ARCHITECTURE</span></h2>
             <p className="text-gray-400 mb-8 text-lg leading-relaxed font-light">
               The IRIS protocol stack is designed for modularity and high-throughput verification. 
               By separating the settlement logic from the data availability layer, we ensure that 
               AI agents can operate with <span className="text-cyan-400">sub-millisecond</span> latency while maintaining full cryptographic proofs.
             </p>
             <ul className="space-y-4">
               {[
                 "Zero-Knowledge Proof Verification",
                 "Cross-Chain State Merkle Roots",
                 "Optimistic Agent Rollups"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-gray-300">
                   <CheckCircle className="w-5 h-5 text-green-400" />
                   <span className="font-mono text-sm tracking-wider">{item}</span>
                 </li>
               ))}
             </ul>
             
             <button className="mt-10 px-6 py-3 border border-gray-700 hover:border-cyan-500 text-cyan-400 font-mono text-sm tracking-widest hover:bg-cyan-900/20 transition-all flex items-center gap-2">
               <Code className="w-4 h-4" />
               VIEW SOURCE CODE
             </button>
          </div>

          {/* Visual Stack */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
            
            <div className="space-y-6">
              {layers.map((layer, index) => (
                <div key={index} className="relative pl-20 group">
                   {/* Connecting Dot */}
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-gray-700 rounded-full group-hover:border-cyan-400 group-hover:bg-cyan-900 transition-colors z-10"></div>
                   
                   <div className="bg-gray-900/40 border border-gray-800 p-6 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 group-hover:translate-x-2">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white font-['Rajdhani']">{layer.name}</h3>
                        <layer.icon className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-400 font-['Share_Tech_Mono']">{layer.detail}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const steps = [
    { phase: "PHASE 01", title: "Genesis Block", date: "Q3 2024", status: "COMPLETED" },
    { phase: "PHASE 02", title: "Node Synchronization", date: "Q4 2024", status: "ACTIVE" },
    { phase: "PHASE 03", title: "Identity Sharding", date: "Q2 2025", status: "PENDING" },
    { phase: "PHASE 04", title: "Global Neural Link", date: "Q4 2025", status: "LOCKED" },
  ];

  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-16 font-['Rajdhani'] tracking-wide">PROTOCOL <span className="text-cyan-500">ROADMAP</span></h2>
        
        <div className="relative">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Vertical Line (Mobile) */}
                <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2 z-0"></div>
                
                <div className="relative z-10 bg-black border border-gray-800 p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]">
                  <div className="text-xs font-mono text-cyan-500 mb-2">{step.phase}</div>
                  <h3 className="text-xl font-bold text-white mb-1 font-['Rajdhani']">{step.title}</h3>
                  <div className="text-gray-500 text-sm font-mono mb-4">{step.date}</div>
                  
                  <span className={`inline-block px-2 py-1 text-[10px] font-bold tracking-widest border ${
                    step.status === 'COMPLETED' ? 'border-green-500 text-green-500' :
                    step.status === 'ACTIVE' ? 'border-cyan-500 text-cyan-500 animate-pulse' :
                    'border-gray-700 text-gray-600'
                  }`}>
                    {step.status}
                  </span>
                </div>
                
                {/* Connector Node */}
                <div className="hidden md:block absolute top-1/2 left-1/2 w-4 h-4 bg-black border-2 border-gray-600 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:border-cyan-400 group-hover:bg-cyan-500 shadow-[0_0_10px_rgba(0,0,0,1)] transition-all z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GovernanceStats = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-800 bg-gray-900/30 p-8 md:p-12 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 font-['Rajdhani'] flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-500" />
                DAO GOVERNANCE
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                The IRIS protocol is governed by a decentralized collective of node operators and token holders.
                Vote on protocol upgrades, treasury allocation, and parameter adjustments directly through the neural interface.
              </p>
              
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider text-sm clip-path-slant transition-colors">
                  View Proposals
                </button>
                <button className="px-6 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white font-bold uppercase tracking-wider text-sm clip-path-slant transition-colors">
                  Delegate Votes
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-black/50 p-4 border-l-2 border-purple-500">
                 <div className="text-gray-500 text-xs font-mono mb-1">TOTAL VOTES LOCKED</div>
                 <div className="text-2xl font-bold text-white font-mono">14.2M IRIS</div>
               </div>
               <div className="bg-black/50 p-4 border-l-2 border-cyan-500">
                 <div className="text-gray-500 text-xs font-mono mb-1">ACTIVE PROPOSALS</div>
                 <div className="text-2xl font-bold text-white font-mono">03</div>
               </div>
               <div className="bg-black/50 p-4 border-l-2 border-pink-500">
                 <div className="text-gray-500 text-xs font-mono mb-1">TREASURY BALANCE</div>
                 <div className="text-2xl font-bold text-white font-mono">$42.8M</div>
               </div>
               <div className="bg-black/50 p-4 border-l-2 border-green-500">
                 <div className="text-gray-500 text-xs font-mono mb-1">QUORUM REACHED</div>
                 <div className="text-2xl font-bold text-white font-mono">98.2%</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InteractiveTerminal = () => {
    const [logs, setLogs] = useState([
        "> Initializing IRIS Protocol...",
        "> Establishing connection to ERC-8004...",
        "> Handshake verified.",
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLogs = [
                `> Validating packet hash: 0x${Math.random().toString(16).substr(2, 8)}...`,
                "> Node synchronized.",
                "> AI Agent heartbeat detected.",
                "> Block confirmed."
            ];
            const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
            
            setLogs(prev => {
                const updated = [...prev, randomLog];
                if (updated.length > 6) updated.shift();
                return updated;
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 relative z-10">
            <div className="max-w-5xl mx-auto px-4">
                <div className="border border-gray-800 bg-black/80 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]">
                    <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs font-['Share_Tech_Mono'] text-gray-500">root@iris-node:~</span>
                    </div>
                    <div className="p-6 font-['Share_Tech_Mono'] text-sm h-64 flex flex-col justify-end">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-cyan-500 mr-2">$</span>
                                <span className="text-green-400">{log}</span>
                            </div>
                        ))}
                        <div className="animate-pulse text-cyan-500">_</div>
                    </div>
                </div>
            </div>
        </section>
    );
};



const App = () => {
  return (
    <div className="relative min-h-screen bg-[#050510] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      <style>{minimalStyles}</style>
      
      {/* CRT Grid Background: Recreated using Tailwind Utility Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none 
        bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] 
        bg-[size:40px_40px] [perspective:1000px] [transform-style:preserve-3d]"></div>
      
      {/* Scanline using arbitrary animation value pointing to keyframes defined in style tag */}
      <div className="fixed w-full h-[100px] z-10 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,243,255,0.1)_50%,rgba(0,0,0,0)_100%)] opacity-10 pointer-events-none animate-[scanline_10s_linear_infinite]"></div>
      
      <MatrixRain />
      
      {/* Content */}
      <Header />
      <Hero />
      <Features />
      <IdentityArchitecture />
      <Roadmap />
      <GovernanceStats />
      <InteractiveTerminal />
      <Footer />
    </div>
  );
};

export default App;