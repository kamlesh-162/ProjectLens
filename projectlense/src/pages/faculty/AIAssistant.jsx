import React from 'react'
import { LayoutDashboard, FolderOpen, Brain, ClipboardCheck, BarChart3, Bot } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import AIChatAssistant from '../../components/AIChatAssistant'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/faculty/dashboard' },
  { icon: Bot, label: 'AI Review Copilot', path: '/faculty/ai-assistant' },
  { icon: FolderOpen, label: 'Projects Queue', path: '/faculty/dashboard' },
  { icon: Brain, label: 'AI Evaluations', path: '/faculty/dashboard' },
  { icon: ClipboardCheck, label: 'Final Evaluations', path: '/faculty/dashboard' },
  { icon: BarChart3, label: 'Analytics', path: '/faculty/dashboard' },
]

export default function FacultyAIAssistant() {
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Faculty AI Review Copilot</h1>
        <p className="text-gray-500 text-sm mt-1">
          Perform automated multi-modal grading recommendations, inspect source code architectures, and review similarity indices.
        </p>
      </div>

      <AIChatAssistant userRole="faculty" />
    </DashboardLayout>
  )
}
