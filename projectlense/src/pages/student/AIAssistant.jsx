import React from 'react'
import { LayoutDashboard, FolderOpen, Upload, ClipboardList, MessageSquare, User, Bot } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import AIChatAssistant from '../../components/AIChatAssistant'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
  { icon: Bot, label: 'AI Copilot Chat', path: '/student/ai-assistant' },
  { icon: FolderOpen, label: 'My Projects', path: '/student/projects' },
  { icon: Upload, label: 'Submit Project', path: '/student/submit' },
  { icon: ClipboardList, label: 'Evaluations', path: '/student/projects' },
  { icon: MessageSquare, label: 'Feedback', path: '/student/projects' },
]

export default function StudentAIAssistant() {
  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">AI Project Assistant & Copilot</h1>
        <p className="text-gray-500 text-sm mt-1">
          Chat with the AI assistant to analyze rubric criteria, test code quality, check similarity, and prepare for viva examinations.
        </p>
      </div>

      <AIChatAssistant userRole="student" />
    </DashboardLayout>
  )
}
