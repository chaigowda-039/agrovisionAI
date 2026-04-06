import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Mail, User, Eye, EyeOff, Sprout, Zap, Database, ArrowRight, ChevronLeft } from 'lucide-react';

const LoginGate = ({ onAuthenticated }) => {
  const [view, setView] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated({ email: formData.email, name: formData.email.split('@')[0] });
    }, 2000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated({ email: formData.email, name: `${formData.firstName} ${formData.lastName}` });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[500] flex"
    >
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-[45%] relative overflow-hidden bg-[#050B08]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40"
            alt="Farm Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050B08] via-[#050B08]/70 to-primary/30" />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 z-[1] opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(13,99,27,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(13,99,27,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full z-[2]"
            style={{ left: `${15 + i * 15}%`, top: `${20 + i * 10}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div>
            <div className="flex items-center gap-4 mb-20">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30">
                <Sprout size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter">
                  AgroVision <span className="italic text-primary font-light">AI</span>
                </h1>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Autonomous Agriculture 3.0</p>
              </div>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-black text-white leading-[1.05] tracking-tighter mb-8"
            >
              Intelligence<br />
              That Speaks<br />
              <span className="text-primary">Your Land.</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/50 text-lg font-medium leading-relaxed max-w-md"
            >
              Access soil diagnostics, weather telemetry, and precision irrigation — all from one neural command center.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-5"
          >
            {[
              { icon: Shield, text: 'AES-256 End-to-End Encryption' },
              { icon: Database, text: 'Multi-Region Cloud Sync' },
              { icon: Zap, text: 'Sub-Second Neural Processing' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/40">
                <item.icon size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="flex-1 bg-[#F8FAF7] flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #0D631B 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <Sprout size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter">
            AgroVision <span className="text-primary italic">AI</span>
          </span>
        </div>

        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-32"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-primary/10 rounded-full" />
                  <div className="w-20 h-20 border-4 border-transparent border-t-primary rounded-full animate-spin absolute inset-0" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield size={24} className="text-primary" />
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">
                  {view === 'login' ? 'Verifying Credentials...' : 'Creating Your Profile...'}
                </p>
                <p className="text-xs text-on-surface-variant/60 mt-3 font-medium">Establishing secure handshake</p>
              </motion.div>
            ) : view === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-10">
                  <h3 className="text-5xl font-black tracking-tight text-[#1A1C19] mb-3">Welcome Back</h3>
                  <p className="text-on-surface-variant/70 text-base font-medium">Sign in to access your neural dashboard.</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-5 pl-14 pr-5 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-base shadow-sm"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-3 block ml-1">Password</label>
                    <div className="relative group">
                      <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-5 pl-14 pr-14 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-base shadow-sm"
                        placeholder="••••••••"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-white font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-3"
                  >
                    Initialize Session
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div className="mt-10 text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E0E4DE]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-[#F8FAF7] px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant/50">New to AgroVision?</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setView('register'); setError(''); }}
                    className="w-full py-5 bg-white border-2 border-[#E0E4DE] rounded-2xl text-primary font-bold text-sm uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    Create Enterprise Account
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <button 
                  onClick={() => { setView('login'); setError(''); }}
                  className="flex items-center gap-2 text-primary/60 hover:text-primary font-bold text-sm mb-8 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Login
                </button>

                <div className="mb-8">
                  <h3 className="text-4xl font-black tracking-tight text-[#1A1C19] mb-3">Create Account</h3>
                  <p className="text-on-surface-variant/70 text-base font-medium">Set up your agricultural intelligence profile.</p>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-1">First Name</label>
                      <div className="relative group">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input 
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-4 pl-11 pr-4 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-sm shadow-sm"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-1">Last Name</label>
                      <div className="relative group">
                        <input 
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-4 pl-5 pr-4 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-sm shadow-sm"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-1">Email</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-4 pl-11 pr-4 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-sm shadow-sm"
                        placeholder="john@farm.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-1">Password</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-4 pl-11 pr-12 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-sm shadow-sm"
                        placeholder="Min 6 characters"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/30 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-2 block ml-1">Confirm Password</label>
                    <div className="relative group">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="w-full bg-white border-2 border-[#E0E4DE] rounded-2xl py-4 pl-11 pr-4 outline-none focus:border-primary transition-all text-[#1A1C19] font-medium text-sm shadow-sm"
                        placeholder="Re-enter password"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-primary text-white font-black uppercase tracking-[0.3em] text-xs py-5 rounded-2xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4 flex items-center justify-center gap-3"
                  >
                    Create Account & Enter
                    <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Security Badge */}
        <div className="absolute bottom-8 inset-x-0 flex justify-center items-center gap-2 opacity-30">
          <Lock size={10} />
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-on-surface-variant">Secured by AgroVision Neural Core</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginGate;
