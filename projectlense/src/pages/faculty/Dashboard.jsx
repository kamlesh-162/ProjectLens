import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, FolderOpen, Brain, ClipboardCheck, BarChart3, FileText, TrendingUp, Clock, CheckCircle, Eye, Users, Shield, Bot, Sparkles, ArrowRight } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../contexts/AuthContext'
import { getAllProjectsForFaculty, initializeDemoData } from '../../services/storage'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/faculty/dashboard' },
  { icon: Bot, label: 'AI Review Copilot', path: '/faculty/ai-assistant' },
  { icon: FolderOpen, label: 'Projects', path: '/faculty/dashboard' },
  { icon: Brain, label: 'AI Evaluations', path: '/faculty/dashboard' },
  { icon: ClipboardCheck, label: 'Final Evaluations', path: '/faculty/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/faculty/dashboard' },
]

const statusConfig = {
  'submitted': { label: 'Submitted', class: 'badge-submitted' },
  'under-review': { label: 'Under Review', class: 'badge-review' },
  'evaluated': { label: 'Evaluated', class: 'badge-evaluated' },
  'approved': { label: 'Approved', class: 'badge-approved' },
}

export default function FacultyDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    initializeDemoData()
    const p = getAllProjectsForFaculty()
    setProjects(p)
  }, [])

  const stats = [
    { label: 'Assigned Projects', value: projects.length, icon: FileText, color: 'from-blue-500 to-indigo-600' },
    { label: 'Pending Review', value: projects.filter(p => p.status !== 'approved').length, icon: Clock, color: 'from-yellow-500 to-orange-500' },
    { label: 'Completed', value: projects.filter(p => p.status === 'approved').length, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
    { label: 'Average Score', value: projects.length > 0 ? Math.round(projects.reduce((sum, p) => sum + (p.aiEvaluation?.overallScore || 0), 0) / projects.length) + '%' : 'N/A', icon: BarChart3, color: 'from-purple-500 to-indigo-600' },
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Faculty Review Workbench 👋</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome, {user.name}. Review student submissions and verify AI rubric marks.</p>
        </div>
        <Link 
          to="/faculty/ai-assistant"
          className="bg-[#12161f] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-black transition flex items-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Launch Review Copilot</span>
        </Link>
      </div>

      {/* AI Copilot Highlight Banner */}
      <div className="mb-6 bg-gradient-to-r from-[#12161f] to-navy-900 text-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>Automated Faculty AI Copilot</span>
              <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Pro</span>
            </h3>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Use the AI Copilot to run instant multi-criteria rubric assessments, spot code duplication, and auto-draft faculty revision comments.
            </p>
          </div>
        </div>
        <Link
          to="/faculty/ai-assistant"
          className="bg-white text-navy-900 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 transition whitespace-nowrap flex items-center gap-1.5 shrink-0"
        >
          <span>Open Review Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-navy-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-navy-900">All Assigned Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">AI Score</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Similarity</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((project, i) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50/50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {project.studentName?.charAt(0) || 'S'}
                      </div>
                      <span className="text-sm font-medium text-navy-900">{project.studentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-900 font-medium truncate max-w-[200px]">{project.title}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-navy-900 hidden md:table-cell">{project.aiEvaluation?.overallScore || '-'}/100</td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                      (project.aiEvaluation?.similarity || 0) <= 15 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {project.aiEvaluation?.similarity || 0}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={statusConfig[project.status]?.class || 'badge-submitted'}>
                      {statusConfig[project.status]?.label || project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/faculty/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> Review
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
