import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Shield, CreditCard, CheckCircle, Fingerprint, Zap, User, Database, Building, MapPin, ChevronRight, Mail } from 'lucide-react';

const AuthPortal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login'); // login, register, subscribe, admin
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = (nextView) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView(nextView);
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    simulateLoading('admin');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    simulateLoading('subscribe');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#050B08]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 pointer-events-none" />
          
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="w-full max-w-5xl bg-surface/95 border border-primary/20 rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col md:flex-row min-h-[600px] z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary hover:text-white transition-all z-50 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>

            {/* Left Side Branding */}
            <div className="w-full md:w-1/3 bg-primary text-white p-12 flex flex-col justify-between relative overflow-hidden hidden md:flex">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1500&auto=format&fit=crop')] opacity-20 object-cover mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-[#050B08]" />
              
              <div className="relative z-10">
                <Shield size={48} className="mb-8 text-white/80" />
                <h2 className="text-4xl font-extrabold tracking-tighter mb-4">AgroVision <span className="italic font-light opacity-80">OS</span></h2>
                <p className="text-sm font-medium opacity-70 leading-relaxed">Secure gateway to global soil telemetry, massive satellite compute, and fleet irrigation control.</p>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 opacity-60">
                  <Database size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">AES-256 Encrypted</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <Zap size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Zero-Latency Sync</span>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-2/3 p-10 md:p-20 relative flex flex-col items-center justify-center">
              
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full space-y-6"
                  >
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary animate-pulse">Authenticating Handshake...</p>
                  </motion.div>
                ) : (
                  <>
                    {/* LOGIN VIEW */}
                    {view === 'login' && (
                      <motion.div 
                        key="login"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-sm"
                      >
                        <h3 className="text-4xl font-black tracking-tight mb-2">Executive Login</h3>
                        <p className="text-on-surface-variant font-medium text-sm mb-10 opacity-80">Access your neural dashboard.</p>
                        
                        <form onSubmit={handleLogin} className="space-y-5">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">Enterprise Email</label>
                            <div className="relative">
                              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                              <input type="email" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all text-on-surface font-medium" placeholder="admin@agrovision.ai" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">Decryption Key (Password)</label>
                            <div className="relative">
                              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" />
                              <input type="password" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all text-on-surface font-medium" placeholder="••••••••" />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                            Initialize Link
                          </button>
                        </form>

                        <div className="mt-8 text-center border-t border-primary/10 pt-8">
                          <p className="text-sm font-medium text-on-surface-variant opacity-80 mb-4">Don't have an enterprise account?</p>
                          <button onClick={() => setView('register')} className="text-primary font-bold hover:underline">Request Access</button>
                        </div>
                      </motion.div>
                    )}

                    {/* REGISTER VIEW */}
                    {view === 'register' && (
                      <motion.div 
                        key="register"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-sm"
                      >
                        <h3 className="text-4xl font-black tracking-tight mb-2">Create Account</h3>
                        <p className="text-on-surface-variant font-medium text-sm mb-10 opacity-80">Setup your agricultural profile.</p>
                        
                        <form onSubmit={handleRegister} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">First Name</label>
                               <input type="text" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-3 px-4 outline-none focus:border-primary transition-all text-on-surface text-sm font-medium" placeholder="John" />
                            </div>
                            <div>
                               <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">Last Name</label>
                               <input type="text" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-3 px-4 outline-none focus:border-primary transition-all text-on-surface text-sm font-medium" placeholder="Doe" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">Email</label>
                            <input type="email" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-3 px-4 outline-none focus:border-primary transition-all text-on-surface text-sm font-medium" placeholder="john@farm.com" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2 block ml-1">Password</label>
                            <input type="password" required className="w-full bg-surface-variant/50 border border-primary/10 rounded-2xl py-3 px-4 outline-none focus:border-primary transition-all text-on-surface text-sm font-medium" placeholder="••••••••" />
                          </div>
                          <button type="submit" className="w-full bg-primary text-white font-bold uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-6">
                            Continue to Subscription
                          </button>
                        </form>
                        <div className="mt-8 text-center">
                          <button onClick={() => setView('login')} className="text-secondary opacity-60 font-medium hover:opacity-100 text-sm">Cancel</button>
                        </div>
                      </motion.div>
                    )}

                    {/* SUBSCRIBE VIEW */}
                    {view === 'subscribe' && (
                      <motion.div 
                        key="subscribe"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-lg"
                      >
                        <div className="text-center mb-10">
                          <CreditCard size={40} className="mx-auto text-primary mb-4" />
                          <h3 className="text-4xl font-black tracking-tight mb-2">Activate Subscription</h3>
                          <p className="text-on-surface-variant font-medium text-sm opacity-80">Choose your compute plan to finalize registration.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="border border-primary/20 rounded-3xl p-6 bg-white shadow-sm cursor-pointer hover:border-primary transition-all group">
                            <h4 className="font-bold text-lg mb-1">Standard</h4>
                            <p className="text-2xl font-black tracking-tighter mb-4">$49<span className="text-sm font-medium text-on-surface-variant opacity-50">/mo</span></p>
                            <ul className="space-y-2 mb-6">
                              <li className="text-[10px] uppercase font-bold text-primary/70 flex gap-2"><CheckCircle size={12}/> 50 API Calls</li>
                              <li className="text-[10px] uppercase font-bold text-primary/70 flex gap-2"><CheckCircle size={12}/> Basic Map</li>
                            </ul>
                            <button onClick={() => simulateLoading('admin')} className="w-full py-3 bg-primary/10 text-primary rounded-xl text-xs font-bold uppercase group-hover:bg-primary group-hover:text-white transition-all">Select</button>
                          </div>
                          <div className="border-2 border-primary rounded-3xl p-6 bg-primary text-white shadow-2xl relative cursor-pointer transform scale-105">
                            <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[8px] font-black uppercase tracking-widest py-1 px-3 rounded-full">Pro Recommended</span>
                            </div>
                            <h4 className="font-bold text-lg mb-1 text-white/90">Enterprise</h4>
                            <p className="text-2xl font-black tracking-tighter mb-4">$199<span className="text-sm font-medium text-white/50">/mo</span></p>
                            <ul className="space-y-2 mb-6">
                              <li className="text-[10px] uppercase font-bold text-white/80 flex gap-2"><CheckCircle size={12}/> Unlimited AI Scans</li>
                              <li className="text-[10px] uppercase font-bold text-white/80 flex gap-2"><CheckCircle size={12}/> Live Telemetry</li>
                            </ul>
                            <button onClick={() => simulateLoading('admin')} className="w-full py-3 bg-white text-primary rounded-xl text-xs font-bold uppercase hover:bg-white/90 transition-all">Select Pro</button>
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-4 text-primary opacity-50">
                          <Lock size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Secured via Stripe Payment Network</span>
                        </div>
                      </motion.div>
                    )}

                    {/* ADMIN DASHBOARD VIEW */}
                    {view === 'admin' && (
                      <motion.div 
                        key="admin"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-8 border-b border-primary/10 pb-6">
                          <div>
                            <h3 className="text-3xl font-black tracking-tight mb-1">Global Command Hub</h3>
                            <p className="text-on-surface-variant font-medium text-xs opacity-70 uppercase tracking-widest">Administrator Privileges Enabled</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                              <p className="text-sm font-bold">Admin User</p>
                              <p className="text-[10px] text-primary uppercase font-black tracking-widest">Enterprise Plan</p>
                            </div>
                            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold">A</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                          {[
                            { label: "Active Fields", value: "24", icon: MapPin },
                            { label: "System Health", value: "99.9%", icon: Shield },
                            { label: "Data Processed", value: "1.2 TB", icon: Database }
                          ].map((stat, i) => (
                            <div key={i} className="p-6 bg-surface-variant/30 border border-primary/10 rounded-3xl flex items-center justify-between">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{stat.label}</p>
                                <p className="text-4xl font-black">{stat.value}</p>
                              </div>
                              <stat.icon className="text-primary/20" size={40} />
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 bg-white border border-primary/10 rounded-3xl p-8 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                           <h4 className="text-xl font-bold mb-6 flex items-center gap-3"><Fingerprint className="text-primary"/> Security Logs & Control</h4>
                           <div className="space-y-4 relative z-10">
                              {[
                                "Login strictly authenticated via biometric trace.",
                                "Water master valve #4 status synced successfully.",
                                "Subscription verified. Payment gateway nominal.",
                                "Soil intelligence neural network updated to v4.0."
                              ].map((log, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-primary/5 rounded-2xl transition-all cursor-default">
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <p className="text-sm font-medium opacity-80">{log}</p>
                                  <span className="ml-auto text-[9px] font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">Just now</span>
                                </div>
                              ))}
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPortal;
