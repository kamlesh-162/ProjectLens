import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import Logo from '../components/Logo'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Full name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format'
    if (!password) errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 600))

    const result = register(name, email, password, role)
    setLoading(false)

    if (result.success) {
      addToast('Account created successfully! Please sign in.', 'success')
      navigate('/login')
    } else {
      addToast(result.error, 'error')
    }
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
                Join Network
              </span>
              <h2 className="text-2xl font-bold leading-snug">
                Standardize Academic Project Assessment
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                Create your student or faculty profile to upload project files, run similarity checks, and collaborate on rubric evaluations.
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-gray-800 text-xs text-gray-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> Fast onboarding & instant activation
          </div>
        </div>

        {/* Right Form Container */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          <div className="md:hidden mb-6">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h1 className="text-2xl font-extrabold text-[#12161f]">Create an Account</h1>
          <p className="text-xs text-gray-500 mt-1 mb-6">Enter your academic details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Role Switcher */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Select Role</label>
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

            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[11px] mt-0.5">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="name@university.edu"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[11px] mt-0.5">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full text-sm pl-9 pr-9 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[11px] mt-0.5">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full text-sm pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-gray-50/50"
                  placeholder="Re-enter password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[11px] mt-0.5">{errors.confirmPassword}</p>}
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12161f] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 !mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Register Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">Sign In</Link>
          </p>

        </div>

      </motion.div>
    </div>
  )
}
