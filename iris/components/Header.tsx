'use client';
import { memo, useState } from 'react';
import { useRouter } from "next/navigation";
import { Hexagon, Zap, Menu, X } from 'lucide-react';
import { usePrivy, useLogin } from '@privy-io/react-auth';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  
  const { login } = useLogin({
    onComplete: ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod, loginAccount }) => {
    },
    onError: (error) => {
      console.log("Login failed:", error);
      // maybe show a message
    }
  });
  const handleLogin = () => {
    if (authenticated){
      router.push('/dashboard');
      return;
    }else{
      login();
    }
    
  };

  const {  logout } = usePrivy();
  const handleLogout = async () => {
    try {
      await logout();
      
      // Optional: Redirect the user back to the homepage or login page after successful logout
      router.push('/'); 
    } catch (error) {
      console.error("Privy logout failed:", error);
      // Handle error if necessary
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full  border-b border-cyan-900/50 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center bg-cyan-900/20 border border-cyan-500/50 rounded transform group-hover:rotate-45 transition-transform duration-500">
              <Hexagon className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider text-white group-hover:text-cyan-400 transition-colors font-['Rajdhani']">IRIS</span>
              <span className="text-[10px] font-['Share_Tech_Mono'] text-cyan-500 tracking-[0.2em]">PROTOCOL</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Protocol', 'Ecosystem', 'Governance', 'Docs'].map((item) => (
              <a key={item} href="#" className="relative text-sm font-medium text-gray-300 hover:text-cyan-400 uppercase tracking-widest transition-colors group font-['Rajdhani']">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Connect Button */}
          <div className="hidden md:flex">
             <button onClick={handleLogin} className="relative px-6 py-2 font-['Share_Tech_Mono'] text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/10 transition-all group overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-cyan-400/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="relative flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Register Agent 
                </span>
             </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-900/50 font-['Rajdhani']">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {['Protocol', 'Ecosystem', 'Governance', 'Docs'].map((item) => (
              <a key={item} href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/20">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// const Header = () => {
//   const router = useRouter();
//   const { authenticated, ready } = usePrivy();
  
//   const { login } = useLogin({
//     onComplete: ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod, loginAccount }) => {
//     },
//     onError: (error) => {
//       console.log("Login failed:", error);
//       // maybe show a message
//     }
//   });
//   const handleLogin = () => {
//     login();
//   };

//   const {  logout } = usePrivy();
//   const handleLogout = async () => {
//     try {
//       await logout();
      
//       // Optional: Redirect the user back to the homepage or login page after successful logout
//       router.push('/'); 
//     } catch (error) {
//       console.error("Privy logout failed:", error);
//       // Handle error if necessary
//     }
//   };

//   return (
//     <div className='w-full px-8 py-4 flex justify-between border-b border-gray-400 items-center'>
//       <h2 className='font-bold  text-xl'>IRIS Protocol</h2>
//       <div className='flex justify-between gap-4'>
//         <button
//       onClick={handleLogout}
//       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
//     >
//       Logout
//     </button>
//         <Link href="/" className='p-4 font-bold '>Whitepaper</Link>
//               {!authenticated ? (
//                     <button onClick={handleLogin}>Login</button>
//                   ) : (
//                     <button onClick={() => router.push("/dashboard")}>App</button>
//                   )}

//       </div>
//     </div>
//   );
// };

export default memo(Header);