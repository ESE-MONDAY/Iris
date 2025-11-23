'use client';
import { memo, useState } from 'react';
import Link from 'next/link';
import { 
  Loader,
  Cpu, 
  Coins,
  Key,
  Star,
  MessageSquare,
  Globe, 
  Shield, 
  Briefcase,
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
  CheckCircle,
  Users,
  Code,
  Hash,
  Server,
  LayoutDashboard,
  Wallet,
  Settings,
  Bell,
  LogOut,
  Wifi,
  Radio,
  Bot,
  Plus,
  BrainCircuit,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface Review {
  user: string;
  score: number;
  comment: string;
  date: string;
}
interface Agent {
  id: string;
  name: string;
  type: 'DeFi Validator' | 'Data Oracle' | 'Identity Resolver' | 'Neural Trainer';
  status: 'active' | 'idle' | 'deploying';
  score: number;
  uptime: string;
  category?: string; 
  capabilities?: string;
  mode?: 'onchain' | 'web2';
  contractAddress?: string;
  endpoint?: string;
  price?: string;
  reviews: Review[];
}
const NeonButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const colors = {
    primary: 'text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/10',
    secondary: 'text-pink-400 border-pink-500/50 hover:bg-pink-500/10',
    danger: 'text-red-400 border-red-500/50 hover:bg-red-500/10',
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-2 font-['Share_Tech_Mono'] border transition-all group overflow-hidden ${colors[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <span className={`absolute inset-0 w-full h-full bg-opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${variant === 'primary' ? 'bg-cyan-400' : variant === 'secondary' ? 'bg-pink-400' : 'bg-red-400'}`}></span>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};


const CreateAgentModal = ({ isOpen, onClose, onDeploy }: { isOpen: boolean, onClose: () => void, onDeploy: (agent: any) => void }) => {
  const [mode, setMode] = useState<'onchain' | 'web2'>('onchain');
  
  // Common Fields
  const [name, setName] = useState('');
  const [type, setType] = useState<Agent['type']>('DeFi Validator');
  const [category, setCategory] = useState('');
  const [capabilities, setCapabilities] = useState('');
  const [price, setPrice] = useState('');

  // On-Chain Specific
  const [contractAddress, setContractAddress] = useState('');
  const [abi, setAbi] = useState('');

  // Web2 Specific
  const [endpoint, setEndpoint] = useState('');
  const [authToken, setAuthToken] = useState('');

  if (!isOpen) return null;

  const handleDeploy = () => {
    const agentData = {
      name,
      type,
      category,
      capabilities,
      price,
      mode,
      ...(mode === 'onchain' ? { contractAddress, abi } : { endpoint, authToken })
    };
    onDeploy(agentData);
    // Reset
    setName('');
    setCategory('');
    setCapabilities('');
    setPrice('');
    setContractAddress('');
    setAbi('');
    setEndpoint('');
    setAuthToken('');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0a0a15] border border-cyan-500/30 rounded-lg p-6 relative shadow-[0_0_50px_rgba(0,243,255,0.1)] flex flex-col max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-bold font-['Rajdhani'] text-white mb-1 flex items-center gap-2">
          <Plus className="w-5 h-5 text-cyan-500" /> DEPLOY NEW AGENT
        </h2>
        <p className="text-xs text-gray-500 font-mono mb-6">Configure parameters for your autonomous unit.</p>
        
        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setMode('onchain')}
            className={`flex-1 py-3 text-xs font-mono border rounded-sm transition-all flex items-center justify-center gap-2 ${mode === 'onchain' ? 'bg-cyan-900/30 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.2)]' : 'bg-black/50 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
          >
            <Link href='/' className="w-4 h-4" /> ON-CHAIN AGENT
          </button>
          <button 
            onClick={() => setMode('web2')}
            className={`flex-1 py-3 text-xs font-mono border rounded-sm transition-all flex items-center justify-center gap-2 ${mode === 'web2' ? 'bg-pink-900/30 border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(255,0,255,0.2)]' : 'bg-black/50 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
          >
            <Globe className="w-4 h-4" /> WEB2 API AGENT
          </button>
        </div>
        
        <div className="overflow-y-auto custom-scroll pr-2 space-y-4 flex-1">
          {/* Common Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-mono text-cyan-500 mb-2">AGENT_NAME</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alpha-V2"
                className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-mono text-cyan-500 mb-2">CATEGORY</label>
              <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Finance / Governance"
                className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700"
              />
            </div>
             <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-mono text-cyan-500 mb-2">PRICE_PER_HIRE (IRIS)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700 pl-10"
                />
                <Coins className="w-4 h-4 text-gray-600 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-mono text-cyan-500 mb-2">OPERATIONAL_ROLE</label>
            <div className="grid grid-cols-2 gap-2">
              {['DeFi Validator', 'Data Oracle', 'Identity Resolver', 'Neural Trainer'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as Agent['type'])}
                  className={`px-3 py-2 text-xs font-mono border rounded-sm transition-all text-left ${type === t ? 'bg-cyan-900/30 border-cyan-500 text-white' : 'bg-black/50 border-gray-800 text-gray-500 hover:border-gray-600'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-cyan-500 mb-2">CAPABILITIES (COMMA_SEPARATED)</label>
            <input 
              type="text" 
              value={capabilities}
              onChange={(e) => setCapabilities(e.target.value)}
              placeholder="e.g. read_price, execute_swap, sign_tx"
              className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700"
            />
          </div>

          {/* Conditional Fields */}
          {mode === 'onchain' ? (
            <>
              <div className="pt-4 border-t border-gray-800 mt-4">
                 <h3 className="text-sm font-bold font-['Rajdhani'] text-cyan-400 mb-3 flex items-center gap-2">
                    <Link href='/' className="w-4 h-4" /> SMART CONTRACT CONFIG
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">CONTRACT_ADDRESS</label>
                      <input 
                        type="text" 
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">CONTRACT_ABI (JSON)</label>
                      <textarea 
                        value={abi}
                        onChange={(e) => setAbi(e.target.value)}
                        placeholder='[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'
                        className="w-full bg-black/50 border border-gray-800 focus:border-cyan-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-xs transition-colors placeholder:text-gray-700 h-24 custom-scroll"
                      />
                    </div>
                 </div>
              </div>
            </>
          ) : (
            <>
              <div className="pt-4 border-t border-gray-800 mt-4">
                 <h3 className="text-sm font-bold font-['Rajdhani'] text-pink-400 mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> WEB2 ENDPOINT CONFIG
                 </h3>
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">API_ENDPOINT</label>
                      <input 
                        type="text" 
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        placeholder="https://api.agent-network.io/v1/execute"
                        className="w-full bg-black/50 border border-gray-800 focus:border-pink-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">AUTH_TOKEN</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          value={authToken}
                          onChange={(e) => setAuthToken(e.target.value)}
                          placeholder="sk_live_..."
                          className="w-full bg-black/50 border border-gray-800 focus:border-pink-500 text-white px-4 py-2 rounded-sm outline-none font-mono text-sm transition-colors placeholder:text-gray-700 pl-10"
                        />
                        <Key className="w-4 h-4 text-gray-600 absolute left-3 top-2.5" />
                      </div>
                    </div>
                 </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex gap-3 pt-4 border-t border-gray-800">
          <NeonButton onClick={onClose} variant="danger" className="flex-1">
            CANCEL
          </NeonButton>
          <NeonButton 
            onClick={handleDeploy} 
            disabled={!name}
            className="flex-1"
            variant={mode === 'web2' ? 'secondary' : 'primary'}
          >
            <Zap className="w-4 h-4" />
            DEPLOY {mode === 'onchain' ? 'CONTRACT' : 'SERVICE'}
          </NeonButton>
        </div>
      </div>
    </div>
  );
};
interface Agent {
  id: string;
  name: string;
  type: 'DeFi Validator' | 'Data Oracle' | 'Identity Resolver' | 'Neural Trainer';
  status: 'active' | 'idle' | 'deploying';
  score: number;
  uptime: string;
  category?: string; 
  capabilities?: string;
  mode?: 'onchain' | 'web2';
  contractAddress?: string;
  endpoint?: string;
}


const DashboardSidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void; onLogout: () => void }> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Command Center' },
    { id: 'agents', icon: Bot, label: 'Agent Fleet' },
    { id: 'identity', icon: Fingerprint, label: 'Identity Matrix' },
    { id: 'wallet', icon: Wallet, label: 'Neural Wallet' },
    { id: 'nodes', icon: Server, label: 'Node Status' },
  ];

  return (
    <div className="w-20 lg:w-64 border-r border-cyan-900/30 bg-black/40 backdrop-blur-xl flex flex-col h-screen sticky top-0 z-40 transition-all duration-300">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-cyan-900/30">
         <div className="relative w-8 h-8 flex items-center justify-center bg-cyan-900/20 border border-cyan-500/50 rounded transform hover:rotate-45 transition-transform duration-500 cursor-pointer">
            <Hexagon className="w-5 h-5 text-cyan-400" />
         </div>
         <span className="hidden lg:block ml-3 text-xl font-bold text-white font-['Rajdhani'] tracking-wider">IRIS<span className="text-cyan-500">.OS</span></span>
      </div>

      <div className="flex-1 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 lg:px-6 py-3 transition-all relative group ${
              activeTab === item.id ? 'text-cyan-400 bg-cyan-900/20' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_#00f3ff]"></div>
            )}
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'animate-pulse' : ''}`} />
            <span className="hidden lg:block ml-3 font-['Share_Tech_Mono'] text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-cyan-900/30">
        {/* <button onClick={onLogout} className="w-full flex items-center justify-center lg:justify-start px-2 lg:px-4 py-2 text-red-400 hover:bg-red-900/20 rounded transition-colors group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden lg:block ml-3 font-['Share_Tech_Mono'] text-sm">DISCONNECT</span>
        </button> */}
      </div>
    </div>
  );
};
const NetworkMap = () => (
  <div className="bg-black/40 border border-gray-800 rounded-lg p-6 backdrop-blur-md h-full min-h-[250px] relative overflow-hidden flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-bold font-['Rajdhani'] flex items-center gap-2 text-gray-300">
        <Globe className="w-4 h-4 text-cyan-500" /> NETWORK TOPOLOGY
      </h3>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      </div>
    </div>
    
    {/* Abstract Map Visualization */}
    <div className="relative flex-1 border border-cyan-900/30 rounded bg-cyan-900/5 grid grid-cols-6 grid-rows-4 gap-1">
       {[...Array(24)].map((_, i) => (
         <div key={i} className={`relative group border border-cyan-900/10 hover:bg-cyan-500/20 transition-colors duration-300 ${Math.random() > 0.7 ? 'bg-cyan-500/10' : ''}`}>
            {Math.random() > 0.8 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
            )}
         </div>
       ))}
       <div className="absolute top-0 bottom-0 w-[1px] bg-cyan-500/50 shadow-[0_0_15px_#00f3ff] animate-[scanline_4s_linear_infinite] left-0 pointer-events-none" style={{animationName: 'slideRight', animationDuration: '4s', animationIterationCount: 'infinite'}}></div>
    </div>
  </div>
);
const AgentFleet = ({ agents, onCreate, onSelectAgent }: { agents: Agent[], onCreate: () => void, onSelectAgent: (agent: Agent) => void }) => {
  return (
    <div className="bg-black/40 border border-gray-800 rounded-lg p-6 backdrop-blur-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold font-['Rajdhani'] flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-500" /> ACTIVE AGENT FLEET
        </h3>
        <button 
          onClick={onCreate}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-900/20 hover:bg-cyan-500/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 rounded-sm font-['Share_Tech_Mono'] text-xs transition-all group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          DEPLOY NEW AGENT
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll pr-2 space-y-3">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            onClick={() => onSelectAgent(agent)}
            className="p-4 border border-gray-800 bg-gray-900/30 hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-all group rounded-sm cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded bg-black border ${agent.status === 'active' ? 'border-green-500/30' : 'border-yellow-500/30'}`}>
                  <BrainCircuit className={`w-5 h-5 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`} />
                </div>
                <div>
                  <div className="text-white font-bold font-['Rajdhani'] flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    {agent.name}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-mono">{agent.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-cyan-500 font-mono">{agent.type}</div>
                    {agent.category && <span className="text-[10px] text-gray-500 font-mono border border-gray-800 px-1 rounded">[{agent.category}]</span>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                 <div className={`text-xs font-bold font-mono uppercase flex items-center justify-end gap-1 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                   {agent.status === 'active' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                   {agent.status}
                 </div>
                 <div className="text-[10px] text-gray-500 font-mono">UPTIME: {agent.uptime}</div>
              </div>
            </div>
            
            {/* Identity Score Bar */}
            <div className="space-y-1 relative z-10">
              <div className="flex justify-between text-[10px] font-mono text-gray-400">
                <span>IDENTITY_SCORE</span>
                <div className="flex gap-3">
                  {agent.price && <span className="text-cyan-400 font-bold">{agent.price} IRIS</span>}
                  <span className="text-white">{agent.score}%</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${agent.score > 90 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`} 
                  style={{ width: `${agent.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const AgentDetailsModal = ({ 
  agent, 
  onClose, 
  onHire, 
  isHired, 
  onSubmitReview 
}: { 
  agent: Agent | null, 
  onClose: () => void, 
  onHire: () => void, 
  isHired: boolean,
  onSubmitReview: (score: number, comment: string) => void
}) => {
  const [reviewScore, setReviewScore] = useState<string>('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!agent) return null;

  const handleSubmit = () => {
    const score = parseInt(reviewScore);
    if (score > 0 && score <= 10 && reviewComment) {
      setIsSubmitting(true);
      
      // Simulate network request
      setTimeout(() => {
        onSubmitReview(score, reviewComment);
        setReviewScore('');
        setReviewComment('');
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#0a0a15] border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,243,255,0.15)] relative flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10">
          <X className="w-6 h-6" />
        </button>

        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-cyan-900/20 via-black to-black relative border-b border-gray-800 flex items-end p-8">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80')] bg-cover opacity-10 mix-blend-screen pointer-events-none"></div>
           <div className="flex items-end gap-6 relative z-10">
              <div className="w-20 h-20 bg-black border-2 border-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                 <Bot className="w-10 h-10 text-cyan-400" />
              </div>
              <div className="mb-1">
                 <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-bold font-['Rajdhani'] text-white tracking-wide">{agent.name}</h2>
                    <span className="text-xs font-mono bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">{agent.id}</span>
                 </div>
                 <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                    <span className="flex items-center gap-1.5 text-cyan-500">
                       {agent.mode === 'onchain' ? <Link href='/' className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                       {agent.mode === 'onchain' ? 'ON-CHAIN ENTITY' : 'WEB2 SERVICE'}
                    </span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span>{agent.type}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto custom-scroll">
           {/* Identity Column */}
           <div className="md:col-span-1 space-y-6">
              <div className="bg-gray-900/30 border border-gray-800 p-6 rounded-lg text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                 <h3 className="text-sm font-bold text-gray-400 font-['Rajdhani'] mb-4 flex items-center justify-center gap-2">
                    <Fingerprint className="w-4 h-4" /> IDENTITY TRUST SCORE
                 </h3>
                 <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                       <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.86} strokeDashoffset={351.86 - (351.86 * agent.score) / 100} className="text-cyan-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-3xl font-bold text-white font-['Rajdhani']">{agent.score}</span>
                       <span className="text-[10px] text-cyan-400 font-mono">VERIFIED</span>
                    </div>
                 </div>
              </div>

              <div className="bg-gray-900/30 border border-gray-800 p-4 rounded-lg space-y-3">
                 <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500">STATUS</span>
                    <span className={`flex items-center gap-1.5 ${agent.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                       <span className="relative flex h-2 w-2">
                          {agent.status === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                       </span>
                       {agent.status.toUpperCase()}
                    </span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500">UPTIME</span>
                    <span className="text-white">{agent.uptime}</span>
                 </div>
                 <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500">RATE</span>
                    <span className="text-cyan-400 font-bold">{agent.price || 'FREE'} IRIS</span>
                 </div>
              </div>
           </div>

           {/* Specs Column */}
           <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 font-mono mb-1">CATEGORY</div>
                    <div className="text-lg font-bold text-white font-['Rajdhani']">{agent.category || 'General Purpose'}</div>
                 </div>
                 <div className="bg-black/40 border border-gray-800 p-4 rounded-lg">
                    <div className="text-xs text-gray-500 font-mono mb-1">CAPABILITIES</div>
                    <div className="text-sm text-cyan-300 font-mono truncate">{agent.capabilities || 'Standard Execution'}</div>
                 </div>
              </div>

              {/* Hire / Review Section */}
              <div className="bg-black/40 border border-cyan-500/20 p-5 rounded-lg relative overflow-hidden">
                 {isHired && <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 font-mono">HIRED</div>}
                 
                 {!isHired ? (
                   <>
                      <h3 className="text-sm font-bold text-white font-['Rajdhani'] mb-4 flex items-center gap-2">
                         <Briefcase className="w-4 h-4 text-cyan-500" /> HIRING CONTRACT
                      </h3>
                      <p className="text-xs text-gray-400 font-mono mb-4">Initiate a neural handshake to utilize this agent's services. Payment is processed in IRIS tokens.</p>
                      <NeonButton onClick={onHire} className="w-full h-12 text-lg">
                         HIRE AGENT <span className="ml-2 text-sm opacity-70">[{agent.price || 'FREE'} IRIS]</span>
                      </NeonButton>
                   </>
                 ) : (
                   <>
                      <h3 className="text-sm font-bold text-white font-['Rajdhani'] mb-4 flex items-center gap-2">
                         <MessageSquare className="w-4 h-4 text-purple-500" /> LEAVE A REVIEW
                      </h3>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={reviewScore}
                            onChange={(e) => setReviewScore(e.target.value)}
                            placeholder="Score (1-10)" 
                            disabled={isSubmitting}
                            className="bg-black/50 border border-gray-700 text-white p-2 rounded w-24 text-sm font-mono focus:border-cyan-500 outline-none disabled:opacity-50"
                          />
                          <input 
                            type="text" 
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Comment on performance..." 
                            disabled={isSubmitting}
                            className="bg-black/50 border border-gray-700 text-white p-2 rounded flex-1 text-sm font-mono focus:border-cyan-500 outline-none disabled:opacity-50"
                          />
                        </div>
                        <NeonButton 
                           onClick={handleSubmit} 
                           variant="secondary" 
                           className="w-full" 
                           disabled={!reviewScore || !reviewComment || isSubmitting}
                        >
                           {isSubmitting ? (
                              <>
                                 <Loader className="w-4 h-4 animate-spin" /> PROCESSING TRANSACTION...
                              </>
                           ) : (
                              'SUBMIT FEEDBACK'
                           )}
                        </NeonButton>
                      </div>
                   </>
                 )}
              </div>

              {/* Reviews List */}
              <div className="border-t border-gray-800 pt-4">
                 <h4 className="text-xs font-bold text-gray-500 font-mono mb-3">RECENT_LOGS // REVIEWS</h4>
                 {agent.reviews && agent.reviews.length > 0 ? (
                   <div className="space-y-3 max-h-40 overflow-y-auto custom-scroll pr-2">
                     {agent.reviews.map((review, idx) => (
                       <div key={idx} className="bg-gray-900/30 p-3 rounded border border-gray-800">
                         <div className="flex justify-between items-center mb-1">
                           <span className="text-xs text-cyan-400 font-mono">{review.user}</span>
                           <div className="flex items-center gap-1 text-xs text-yellow-500 font-bold">
                             <Star className="w-3 h-3 fill-current" /> {review.score}/10
                           </div>
                         </div>
                         <p className="text-sm text-gray-300 font-['Rajdhani']">{review.comment}</p>
                         <div className="text-[10px] text-gray-600 mt-1 text-right">{review.date}</div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-xs text-gray-600 font-mono italic">No reviews logged for this unit yet.</div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatWidget: React.FC<{ label: string; value: string; sub?: string; icon: React.ElementType; color: string }> = ({ label, value, sub, icon: Icon, color }) => (
  <div className="relative group">
    <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 group-hover:opacity-20 transition-opacity duration-500 rounded-lg blur`}></div>
    <div className="relative bg-black/40 border border-gray-800 p-6 rounded-lg hover:border-gray-600 transition-all backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-gray-500 text-xs font-['Share_Tech_Mono'] uppercase tracking-wider mb-1">{label}</div>
          <div className="text-2xl font-bold text-white font-['Rajdhani']">{value}</div>
        </div>
        <div className={`p-2 rounded bg-gray-900/50 ${color.replace('from-', 'text-').split(' ')[0]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {sub && <div className="text-xs text-gray-400 font-mono flex items-center gap-1">
        <Activity className="w-3 h-3" /> {sub}
      </div>}
    </div>
  </div>
);


const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
 const [activeTab, setActiveTab] = useState('overview');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [hiredAgentIds, setHiredAgentIds] = useState<string[]>([]);
  
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: 'AG-01', name: 'Oracle-X', type: 'Data Oracle', status: 'active', score: 98.5, uptime: '42d 12h', category: 'Data', mode: 'onchain', capabilities: 'Fetch Price, Verify Sig', contractAddress: '0x8a2...b1e', price: '50',
      reviews: [
        { user: '0x12...3a', score: 10, comment: 'Extremely fast updates.', date: '2024-02-14' },
        { user: '0x44...9b', score: 9, comment: 'Solid oracle service.', date: '2024-01-10' }
      ]
    },
    { 
      id: 'AG-02', name: 'Sentinel-9', type: 'Identity Resolver', status: 'active', score: 99.9, uptime: '115d 4h', category: 'Security', mode: 'onchain', capabilities: 'KYC Check, Soulbound Mint', contractAddress: '0x1c4...9f2', price: '120',
      reviews: [] 
    },
    { 
      id: 'AG-03', name: 'Trader-Bot', type: 'DeFi Validator', status: 'idle', score: 84.2, uptime: '12h 30m', category: 'Finance', mode: 'web2', capabilities: 'Exec Swap, Arb Check', endpoint: 'https://api.trader.bot/v1', price: '25',
      reviews: [
        { user: '0x88...22', score: 7, comment: 'Works okay but high latency.', date: '2024-03-01' }
      ] 
    },
  ]);

   const handleDeploy = (newAgent: any) => {
    const agent: Agent = {
      id: `AG-0${agents.length + 1}`,
      name: newAgent.name || 'Unknown Unit',
      type: newAgent.type || 'Neural Trainer',
      category: newAgent.category || 'General',
      status: 'active',
      score: 100, 
      uptime: '0s',
      mode: newAgent.mode,
      capabilities: newAgent.capabilities,
      contractAddress: newAgent.contractAddress,
      endpoint: newAgent.endpoint,
      price: newAgent.price,
      reviews: []
    };
    setAgents([...agents, agent]);
    setIsDeployModalOpen(false);
  };
    const handleHireAgent = () => {
    if (selectedAgent && !hiredAgentIds.includes(selectedAgent.id)) {
      setHiredAgentIds([...hiredAgentIds, selectedAgent.id]);
      alert(`Agent ${selectedAgent.name} hired for ${selectedAgent.price || '0'} IRIS successfully! Neural handshake initiated.`);
    }
  };
  const handleAddReview = (score: number, comment: string) => {
    if (selectedAgent) {
      const newReview: Review = {
        user: 'You (0x8a...9f2)',
        score,
        comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      const updatedAgents = agents.map(a => {
        if (a.id === selectedAgent.id) {
          // Calculate new score: Weighted average (90% old, 10% new) for simulation impact
          // Score is 0-100, review is 1-10. Map review to 10-100.
          const normalizedReviewScore = score * 10;
          const newScore = ((a.score * 9) + normalizedReviewScore) / 10;
          
          return { 
            ...a, 
            score: parseFloat(newScore.toFixed(1)),
            reviews: [newReview, ...a.reviews] 
          };
        }
        return a;
      });
      
      setAgents(updatedAgents);
      // Update selected agent reference as well to show instant feedback
      const updatedSelected = updatedAgents.find(a => a.id === selectedAgent.id);
      if (updatedSelected) setSelectedAgent(updatedSelected);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050510] text-white font-sans">
       <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
       
       <main className="flex-1 p-4 lg:p-6 overflow-y-auto h-screen scrollbar-hide relative flex flex-col">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 shrink-0">
             <div>
               <h1 className="text-3xl font-bold font-['Rajdhani'] tracking-wide text-white flex items-center gap-2">
                 <span className="text-cyan-500">/</span> {activeTab.toUpperCase().replace('-', ' ')}
               </h1>
               <p className="text-gray-500 text-sm font-mono mt-1">Welcome back, Commander 0x8a...9f2</p>
             </div>
             
             <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="h-8 w-[1px] bg-gray-800"></div>
                <div className="flex items-center gap-3 pl-2">
                   <div className="text-right hidden md:block">
                      <div className="text-sm font-bold text-white font-['Rajdhani']">ERC-8004 NODE</div>
                      <div className="text-xs text-green-400 font-mono">ONLINE</div>
                   </div>
                   <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-purple-600 rounded-lg border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                      <Cpu className="w-6 h-6 text-white" />
                   </div>
                </div>
             </div>
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 shrink-0">
             <StatWidget 
               label="Total Fleet Power" 
               value={`${agents.length} UNITS`} 
               sub="All Systems Nominal" 
               icon={Bot} 
               color="from-cyan-500 to-blue-500" 
             />
             <StatWidget 
               label="Avg Identity Score" 
               value={`${(agents.reduce((acc, curr) => acc + curr.score, 0) / agents.length).toFixed(1)}%`} 
               sub="Verification Level: High" 
               icon={Shield} 
               color="from-purple-500 to-pink-500" 
             />
             <StatWidget 
               label="Transactions (24h)" 
               value="8,942" 
               sub="+12% Activity" 
               icon={Activity} 
               color="from-green-500 to-emerald-500" 
             />
             <StatWidget 
               label="Network Latency" 
               value="12ms" 
               sub="Global Sync Active" 
               icon={Wifi} 
               color="from-yellow-500 to-orange-500" 
             />
          </div>

          {/* Main Dashboard Layout */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
             {/* Left Column: Agent Fleet (Takes up more space now) */}
             <div className="lg:col-span-2 h-full min-h-[400px]">
                <AgentFleet 
                  agents={agents} 
                  onCreate={() => setIsDeployModalOpen(true)} 
                  onSelectAgent={(agent) => setSelectedAgent(agent)}
                />
             </div>
             
             {/* Right Column: Supporting Info */}
             <div className="flex flex-col gap-6 h-full">
                <div className="flex-1">
                   <NetworkMap />
                </div>
                <div className="flex-1 bg-black/40 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-md flex flex-col">
                   <div className="bg-gray-900/50 px-4 py-2 border-b border-gray-800 flex items-center gap-2 shrink-0">
                      <Terminal className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-mono text-gray-500">SYSTEM_LOGS</span>
                   </div>
                   <div className="p-4 font-['Share_Tech_Mono'] text-xs space-y-1 overflow-y-auto text-gray-300 flex-1 custom-scroll">
                      <div className="text-green-400">success: node_sync_complete (14ms)</div>
                      <div>info: verifying_identity_shards [0x4f...a2]</div>
                      <div className="text-cyan-400">event: agent_AG-02 verified block #9921</div>
                      <div className="text-yellow-400">warn: latency_spike_detected (region: eu-west)</div>
                      <div>info: optimizing_routes...</div>
                      <div className="text-green-400">success: routes_optimized</div>
                      <div className="animate-pulse text-cyan-500">_</div>
                   </div>
                </div>
             </div>
          </div>
       </main>

       <CreateAgentModal 
         isOpen={isDeployModalOpen} 
         onClose={() => setIsDeployModalOpen(false)}
         onDeploy={handleDeploy}
       />

        <AgentDetailsModal 
          agent={selectedAgent} 
          isHired={selectedAgent ? hiredAgentIds.includes(selectedAgent.id) : false}
          onClose={() => setSelectedAgent(null)} 
          onHire={handleHireAgent}
          onSubmitReview={handleAddReview}
       />
    </div>
  );
};

export default memo(Dashboard);