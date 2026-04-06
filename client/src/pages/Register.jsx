import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.signup(formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-mesh relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-tertiary/5 blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}></div>
      </div>

      <motion.main 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] z-10 pt-20"
      >
        {/* Brand Header */}
        <div className="text-center mb-10">
          <h1 className="font-headline font-black text-5xl tracking-tighter text-white mb-2">CHILLPAD</h1>
          <p className="font-body text-on-surface-variant tracking-wide">Luxury stays for the modern wanderer.</p>
        </div>

        {/* Glass Login Card */}
        <div className="glass-panel rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Decorative Accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
          
          <header className="mb-8 relative z-10">
            <h2 className="font-headline font-bold text-3xl text-white tracking-tight leading-tight">Create Account</h2>
            <p className="text-on-surface-variant font-body text-sm mt-2">Join the community and verify your sanctuary.</p>
          </header>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-error-container/20 border border-error/50 text-error text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Username Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Full Name</label>
              <div className="relative flex items-center coral-glow-focus transition-all duration-300 rounded-full border border-outline-variant bg-surface-container-highest">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 py-4 pl-12 pr-6 text-on-surface placeholder:text-outline/50 font-body outline-none" 
                  placeholder="John Doe" 
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Email Address</label>
              <div className="relative flex items-center coral-glow-focus transition-all duration-300 rounded-full border border-outline-variant bg-surface-container-highest">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 py-4 pl-12 pr-6 text-on-surface placeholder:text-outline/50 font-body outline-none" 
                  placeholder="hello@chillpad.com" 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Secure Password</label>
              <div className="relative flex items-center coral-glow-focus transition-all duration-300 rounded-full border border-outline-variant bg-surface-container-highest">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/50 font-body outline-none" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  className="absolute right-4 text-on-surface-variant hover:text-white transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center p-1" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? "visibility" : "visibility_off"}</span>
                </button>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold py-5 rounded-full shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg uppercase tracking-tight flex items-center justify-center border-none cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                    "Get Started"
                )}
              </button>
            </div>
          </form>

          {/* Social Auth Divider */}
          <div className="flex items-center gap-4 my-8 relative z-10">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <span className="text-[10px] font-bold text-outline/40 uppercase tracking-[0.2em]">Or connect with</span>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-outline-variant hover:bg-surface-bright transition-colors text-sm font-medium bg-transparent text-white cursor-pointer hover:border-white/40">
              <span className="material-symbols-outlined text-lg">brand_awareness</span>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-outline-variant hover:bg-surface-bright transition-colors text-sm font-medium bg-transparent text-white cursor-pointer hover:border-white/40">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
              Apple
            </button>
          </div>
        </div>

        {/* Footer Toggle */}
        <div className="mt-10 text-center relative z-10">
          <p className="font-body text-on-surface-variant flex items-center justify-center gap-1">
            Already a member?
            <Link to="/login" className="text-white font-bold hover:text-primary transition-colors inline-flex items-center gap-1 group ml-1">
              Sign in instead
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </p>
        </div>
      </motion.main>
    </div>
  );
};

export default Register;
