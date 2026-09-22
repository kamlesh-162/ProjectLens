import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Info, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import Logo from '../components/Logo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      addToast('Please fill in all fields', 'error')
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    const result = login(email, password, role)
    setLoading(false)

    if (result.success) {
      addToast(`Welcome back, ${result.user.name}!`, 'success')
      navigate(`/${role}/dashboard`)
    } else {
      addToast(result.error, 'error')
    }
  }

  const fillDemo = (demoRole) => {
    const creds = {
      student: { email: 'student@projectlense.com', password: 'student123' },
      faculty: { email: 'faculty@projectlense.com', password: 'faculty123' },
      admin: { email: 'admin@projectlense.com', password: 'admin123' },
    }
    setEmail(creds[demoRole].email)
    setPassword(creds[demoRole].password)
    setRole(demoRole)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7fa3d1] via-[#a9c3e0] to-[#eef4fa] flex items-center justify-center p-4 sm:p-6">
      
      {/* Container Frame Panel */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-[24px] border border-white shadow-[0_20px_60px_-15px_rgba(18,38,70,0.18)] overflow-hidden grid grid-cols-1 md:grid-cols-12"
      >
        
        {/* Left Informational Sidebar */}
        <div className="hidden md:flex md:col-span-5 bg-[#12161f] p-8 flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/">
              <Logo className="w-8 h-8 bg-blue-600" textClassName="text-xl font-bold tracking-tight text-white" />
            </Link>
            <div className="mt-12 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full">
                Evaluation Portal
              </span>
              <h2 className="text-2xl font-bold leading-snug">
                Academic Project Assessment Platform
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                Log in to review automated AI rubric breakdowns, examine similarity metrics, and submit or grade capstone evaluations.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-gray-800 text-xs text-gray-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> Standardized rubric validation
          </div>
        </div>

        {/* Right Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          <div className="md:hidden mb-6">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h1 className="text-2xl font-extrabold text-[#12161f]">Sign In to ProjectLense</h1>
          <p className="text-xs text-gray-500 mt-1 mb-6">Select your academic role and enter credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Switcher */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Select Role</label>
              <div className="grid grid-cols-3 gap-2">
                {['student', 'faculty', 'admin'].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition capitalize ${
                      role === r
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-sm pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12161f] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 !mt-5"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">Create Account</Link>
          </p>

          {/* 1-Click Demo Credentials Autofill */}
          <div className="mt-6 p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
            <div className="flex items-center gap-1.5 mb-2 text-blue-900 font-semibold text-xs">
              <Info className="w-3.5 h-3.5 text-blue-600" /> Demo Accounts (Click to Autofill)
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-left">
              {[
                { r: 'student', label: 'Student' },
                { r: 'faculty', label: 'Faculty' },
                { r: 'admin', label: 'Admin' }
              ].map(d => (
                <button
                  key={d.r}
                  type="button"
                  onClick={() => fillDemo(d.r)}
                  className="p-1.5 bg-white border border-blue-200/80 rounded-lg hover:border-blue-400 transition text-center"
                >
                  <p className="text-[11px] font-bold text-[#12161f]">{d.label}</p>
                  <p className="text-[9px] text-gray-500">1-Click Fill</p>
                </button>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  )
}
