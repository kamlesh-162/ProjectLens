import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, FolderOpen, ClipboardCheck, Settings, BarChart3, TrendingUp, FileText, CheckCircle, Clock, UserCheck, GraduationCap, Award } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useAuth } from '../../contexts/AuthContext'
import { getAllProjectsForFaculty, initializeDemoData } from '../../services/storage'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Users', path: '/admin/dashboard' },
  { icon: FolderOpen, label: 'Projects', path: '/admin/dashboard' },
  { icon: ClipboardCheck, label: 'Evaluations', path: '/admin/dashboard' },
  { icon: Settings, label: 'Settings', path: '/admin/dashboard' },
]

const statusConfig = {
  'submitted': { label: 'Submitted', class: 'badge-submitted' },
  'under-review': { label: 'Under Review', class: 'badge-review' },
  'evaluated': { label: 'Evaluated', class: 'badge-evaluated' },
  'approved': { label: 'Approved', class: 'badge-approved' },
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    initializeDemoData()
    const p = getAllProjectsForFaculty()
    setProjects(p)
  }, [])

  const stats = [
    { label: 'Total Students', value: 15, icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
    { label: 'Total Faculty', value: 5, icon: Award, color: 'from-purple-500 to-indigo-600' },
    { label: 'Total Projects', value: projects.length, icon: FileText, color: 'from-cyan-500 to-blue-600' },
    { label: 'Completed Evaluations', value: projects.filter(p => p.status === 'approved').length, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
  ]

  const statusCounts = {
    submitted: projects.filter(p => p.status === 'submitted').length,
    'under-review': projects.filter(p => p.status === 'under-review').length,
    evaluated: projects.filter(p => p.status === 'evaluated').length,
    approved: projects.filter(p => p.status === 'approved').length,
  }

  const demoUsers = [
    { name: 'Rahul Sharma', email: 'student@projectlense.com', role: 'Student', department: 'Computer Science', status: 'Active' },
    { name: 'Ananya Patel', email: 'ananya@university.edu', role: 'Student', department: 'Computer Science', status: 'Active' },
    { name: 'Vikram Singh', email: 'vikram@university.edu', role: 'Student', department: 'Computer Science', status: 'Active' },
    { name: 'Meera Krishnan', email: 'meera@university.edu', role: 'Student', department: 'Information Technology', status: 'Active' },
    { name: 'Dr. Priya Nair', email: 'faculty@projectlense.com', role: 'Faculty', department: 'Computer Science', status: 'Active' },
    { name: 'Dr. Amit Kumar', email: 'amit@university.edu', role: 'Faculty', department: 'Electronics', status: 'Active' },
  ]

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">System overview and management.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Projects by Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Projects by Status</h2>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const total = projects.length || 1
              const pct = Math.round((count / total) * 100)
              const colors = {
                submitted: 'bg-blue-500',
                'under-review': 'bg-yellow-500',
                evaluated: 'bg-purple-500',
                approved: 'bg-green-500',
              }
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600 capitalize">{status.replace('-', ' ')}</span>
                    <span className="text-sm font-semibold text-navy-900">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${colors[status]}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-navy-900 mb-4">Evaluation Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
              <p className="text-sm text-blue-700 mt-1">Total Submissions</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{projects.filter(p => p.status === 'approved').length}</p>
              <p className="text-sm text-green-700 mt-1">Approved</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {projects.length > 0 ? Math.round(projects.reduce((s, p) => s + (p.aiEvaluation?.overallScore || 0), 0) / projects.length) : 0}
              </p>
              <p className="text-sm text-purple-700 mt-1">Avg. AI Score</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">
                {projects.length > 0 ? Math.round(projects.reduce((s, p) => s + (p.aiEvaluation?.similarity || 0), 0) / projects.length) : 0}%
              </p>
              <p className="text-sm text-orange-700 mt-1">Avg. Similarity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-navy-900">Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demoUsers.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-navy-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${u.role === 'Faculty' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{u.department}</td>
                  <td className="px-6 py-4">
                    <span className="badge bg-green-100 text-green-700">{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-navy-900">Recent Projects</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Student</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-navy-900">{p.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{p.studentName}</td>
                  <td className="px-6 py-4">
                    <span className={statusConfig[p.status]?.class || 'badge-submitted'}>
                      {statusConfig[p.status]?.label || p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-navy-900 hidden md:table-cell">{p.aiEvaluation?.overallScore || '-'}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
