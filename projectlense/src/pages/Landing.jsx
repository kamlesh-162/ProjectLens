import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Sparkles, Brain, ClipboardCheck, Search, Code2, 
  MessageSquare, UserCheck, GraduationCap, Award, Settings, 
  ArrowRight, Menu, X, Upload, FileText, 
  BarChart3, CheckCircle, Shield, Zap, TrendingUp, Bot
} from 'lucide-react'
import Logo from '../components/Logo'

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('AI Evaluator')

  const features = [
    { icon: Brain, title: 'AI Project Evaluation', description: 'Automated analysis of project reports, code quality, and presentations using standardized models.', color: 'from-blue-500 to-indigo-600' },
    { icon: ClipboardCheck, title: 'Rubric-Based Scoring', description: 'Standardized evaluation across problem definition, methodology, implementation, and innovation.', color: 'from-indigo-500 to-purple-600' },
    { icon: Search, title: 'Semantic Similarity Detection', description: 'Detect content overlap and reference fidelity using vector-based similarity scans.', color: 'from-purple-500 to-pink-600' },
    { icon: Code2, title: 'Code Quality Analysis', description: 'Evaluate repository architecture, style conformance, complexity, and documentation completeness.', color: 'from-cyan-500 to-blue-600' },
    { icon: MessageSquare, title: 'Interactive AI Copilot', description: 'Chat with AI to summarize weaknesses, generate viva questions, and refine project documentation.', color: 'from-emerald-500 to-teal-600' },
    { icon: UserCheck, title: 'Faculty Verification', description: 'Empower professors to review, modify rubrics, adjust scores, and issue official approvals.', color: 'from-orange-500 to-red-600' },
  ]

  const steps = [
    { num: '01', title: 'Student Submits Project', description: 'Upload report PDF, source code archive, and presentation slides in one place.', icon: Upload },
    { num: '02', title: 'AI Copilot Ingestion', description: 'Documents and codebases are indexed and evaluated against department rubrics.', icon: Brain },
    { num: '03', title: 'Interactive AI Analysis', description: 'Students and faculty chat with the AI assistant to inspect rubrics, code quality, and similarity.', icon: Bot },
    { num: '04', title: 'Faculty Final Approval', description: 'Faculty guides review the AI draft, adjust marks, and issue the final grade.', icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#7fa3d1]">
      
      {/* =========================================================================
          ATMOSPHERIC SKY BACKGROUND & CLOUDS
          ========================================================================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7fa3d1] via-[#a9c3e0] via-70% to-[#eef4fa] pointer-events-none" />
      
      {/* Soft Blurred Floating Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -15, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 -left-20 w-[580px] h-[320px] rounded-full bg-white/70 blur-2xl"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 20, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-[720px] h-[380px] rounded-full bg-white/80 blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, 60, 0], y: [0, -10, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[420px] h-[220px] rounded-full bg-white/30 blur-2xl"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1220px] mx-auto px-3 sm:px-6 pt-6 sm:pt-10 pb-16">
        
        {/* =========================================================================
            GLASS FRAME CONTAINER (Matching Exact Verso Reference Layout)
            ========================================================================= */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[28px] border border-white/80 shadow-[0_24px_64px_-12px_rgba(18,38,70,0.15)] overflow-hidden">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="relative bg-[radial-gradient(#d5e2f1_1px,transparent_1px)] [background-size:28px_28px]">
            
            {/* Sparkle Stars in Background */}
            <div className="absolute top-24 left-16 text-blue-300 opacity-60 text-lg select-none">✦</div>
            <div className="absolute top-28 right-24 text-blue-300 opacity-60 text-lg select-none">✦</div>
            <div className="absolute top-72 left-28 text-blue-200 opacity-50 text-xl select-none">✦</div>
            <div className="absolute top-80 right-20 text-blue-200 opacity-50 text-xl select-none">✦</div>

            {/* Navbar */}
            <header className="px-6 sm:px-10 py-5 border-b border-gray-100/80 flex items-center justify-between">
              <Link to="/">
                <Logo />
              </Link>

              {/* Center Links */}
              <nav className="hidden md:flex items-center gap-8">
                <a href="#product" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition">Product</a>
                <a href="#features" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition">Features</a>
                <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition">How It Works</a>
                <Link to="/student/dashboard" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition">AI Copilot</Link>
              </nav>

              {/* Right Auth Action */}
              <div className="hidden md:flex items-center gap-5">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-navy-900 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-[#12161f] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-black transition shadow-sm">
                  Get Started
                </Link>
              </div>

              {/* Mobile menu toggle */}
              <button className="md:hidden p-1.5 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </header>

            {/* Mobile Dropdown */}
            {mobileOpen && (
              <div className="md:hidden bg-white/95 px-6 py-4 border-b border-gray-100 space-y-3">
                <a href="#product" className="block text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Product</a>
                <a href="#features" className="block text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>Features</a>
                <a href="#how-it-works" className="block text-sm font-medium text-gray-700" onClick={() => setMobileOpen(false)}>How It Works</a>
                <div className="pt-2 flex gap-3">
                  <Link to="/login" className="flex-1 text-center py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg">Login</Link>
                  <Link to="/register" className="flex-1 text-center py-2 text-sm font-semibold bg-[#12161f] text-white rounded-lg">Get Started</Link>
                </div>
              </div>
            )}

            {/* =========================================================================
                HERO MAIN SECTION (Exact Reference Typography & Centering)
                ========================================================================= */}
            <div className="px-6 sm:px-12 pt-12 sm:pt-16 pb-6 text-center max-w-[860px] mx-auto">
              
              {/* Eyebrow Pill */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center justify-center text-xs font-mono text-gray-500 tracking-wider mb-5"
              >
                <span>[ ai project evaluation ]</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-[54px] font-extrabold text-[#12161f] tracking-tight leading-[1.12] mb-5"
              >
                Evaluate Academic Projects.<br />
                <span className="text-navy-900">Smarter. With AI</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-base sm:text-[17px] leading-relaxed max-w-[660px] mx-auto mb-8"
              >
                ProjectLense helps faculty, guides, and reviewers evaluate project reports, codebases, and presentations in seconds — with standardized rubrics and real-time AI copilot assistance.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-3 mb-10"
              >
                <Link to="/register" className="bg-[#12161f] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-black transition shadow-sm">
                  Get Started
                </Link>
                <Link to="/login" className="bg-[#e9eff7] text-[#12161f] border border-[#d2dfef] px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#dfeaf5] transition">
                  Try Demo
                </Link>
              </motion.div>

              {/* =========================================================================
                  FLOATING COMMAND BAR (Floating over the preview window)
                  ========================================================================= */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="max-w-[620px] mx-auto relative z-20"
              >
                <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_12px_36px_-4px_rgba(28,35,51,0.09)] p-3.5 text-left">
                  {/* Top Input Row */}
                  <div className="flex items-center gap-2.5 px-2 pb-3">
                    <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-400 font-normal">What do you want to evaluate today?</span>
                  </div>

                  {/* Bottom Actions Row */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        { label: 'AI Evaluator', icon: '✦' },
                        { label: 'Rubric Check', icon: '▦' },
                        { label: 'Similarity Scan', icon: '⛶' },
                        { label: 'Viva Assistant', icon: '✨' }
                      ].map(tab => (
                        <button
                          key={tab.label}
                          type="button"
                          onClick={() => setActiveTab(tab.label)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                            activeTab === tab.label 
                              ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-semibold' 
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                          }`}
                        >
                          <span className="text-[11px] opacity-70">{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Waveform Micro-Widget */}
                    <div className="w-7 h-7 rounded-lg bg-[#12161f] flex items-center justify-center gap-[2.5px] px-1.5 shrink-0" title="AI Voice Listening">
                      <span className="w-[2px] h-2.5 bg-white rounded-full animate-pulse" />
                      <span className="w-[2px] h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-[2px] h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="w-[2px] h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* =========================================================================
                PRODUCT PREVIEW WINDOW (Matching Exact UI Reference Mockup)
                ========================================================================= */}
            <div id="product" className="px-4 sm:px-10 pb-12 max-w-[980px] mx-auto -mt-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_16px_40px_-6px_rgba(28,35,51,0.08)] overflow-hidden"
              >
                {/* Browser Chrome Header */}
                <div className="bg-[#fafbfd] border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  {/* Subtle navigation search bar wireframe */}
                  <div className="w-48 h-2 bg-gray-100 rounded-full mx-auto" />
                  <div className="w-8" />
                </div>

                {/* Sub-header navigation row with wireframe tabs */}
                <div className="px-6 py-3 border-b border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-3 bg-gray-100 rounded-md" />
                    <div className="w-20 h-3 bg-gray-100 rounded-md" />
                    <div className="w-16 h-3 bg-gray-100 rounded-md" />
                  </div>
                  <div className="w-12 h-4 bg-gray-100 rounded-md" />
                </div>

                {/* Browser Body Wireframe with Chat Bubble */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[260px] p-6 gap-6">
                  {/* Left Sidebar - Chat History / Channels */}
                  <div className="hidden md:block md:col-span-3 border-r border-gray-100 pr-4 space-y-3">
                    <div className="bg-blue-50/90 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>New evaluation</span>
                    </div>

                    {/* Placeholder chat item lines */}
                    <div className="space-y-2.5 pt-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        <div className="w-24 h-2 bg-gray-100 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        <div className="w-28 h-2 bg-gray-100 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        <div className="w-20 h-2 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Right Main Chat & Output Canvas */}
                  <div className="md:col-span-9 flex flex-col justify-between">
                    {/* User Prompt Bubble (Styled exactly like the reference image) */}
                    <div className="flex flex-col items-end space-y-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider pr-1">prompt</span>
                      <div className="bg-blue-50/90 border border-blue-200/80 rounded-xl rounded-tr-sm px-4 py-2.5 text-xs text-blue-950 max-w-[340px] text-right font-medium leading-relaxed shadow-sm">
                        Evaluate capstone project report and generate rubric score breakdown for faculty review
                      </div>
                      <div className="w-16 h-1.5 bg-gray-100 rounded mt-1 mr-1" />
                    </div>

                    {/* AI Response Wireframe Lines */}
                    <div className="space-y-2 pt-6">
                      <div className="w-full max-w-[420px] h-2.5 bg-gray-100 rounded-md" />
                      <div className="w-full max-w-[360px] h-2.5 bg-gray-100 rounded-md" />
                      <div className="w-full max-w-[280px] h-2.5 bg-gray-100 rounded-md" />
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

          {/* =========================================================================
              FEATURES SECTION
              ========================================================================= */}
          <section id="features" className="py-16 px-6 sm:px-12 border-t border-gray-100 bg-[#fafbfd]">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Zap className="w-3.5 h-3.5" /> Features
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Standardized Project Evaluation</h2>
              <p className="text-gray-500 text-sm mt-2">Comprehensive AI inspection across report documentation, source code repositories, and viva presentations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-3.5 text-white`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-1.5">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              HOW IT WORKS TIMELINE
              ========================================================================= */}
          <section id="how-it-works" className="py-16 px-6 sm:px-12 border-t border-gray-100 bg-white">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <TrendingUp className="w-3.5 h-3.5" /> Workflow
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">How ProjectLense Works</h2>
              <p className="text-gray-500 text-sm mt-2">A streamlined 4-step verification pipeline from student submission to faculty sign-off.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="bg-[#fafbfd] border border-gray-100 p-5 rounded-2xl relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold bg-navy-900 text-white px-2 py-0.5 rounded">{s.num}</span>
                    <s.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer inside Frame */}
          <footer className="px-6 sm:px-10 py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <Logo className="w-6 h-6" textClassName="text-sm font-bold text-navy-900" />
            <p>© 2024 ProjectLense. AI-Based Academic Project Evaluation System.</p>
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-navy-900">Login</Link>
              <Link to="/register" className="hover:text-navy-900">Register</Link>
            </div>
          </footer>

        </div>
      </div>
    </div>
  )
}
