import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Send, Bot, User, Brain, ClipboardCheck, 
  Search, Code2, HelpCircle, Shield, CheckCircle, 
  Lightbulb, RefreshCw, FolderOpen, ArrowRight 
} from 'lucide-react'
import { getProjects } from '../services/storage'

export default function AIChatAssistant({ initialProjectId = null, userRole = 'student' }) {
  const [projects, setProjects] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId || '')
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const p = getProjects()
    setProjects(p)
    if (!selectedProjectId && p.length > 0) {
      setSelectedProjectId(p[0].id)
    }
  }, [])

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0]

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Hello! I am your ProjectLense AI Copilot. I can evaluate your capstone projects, inspect source code quality, run similarity scans, and generate viva exam questions. Select a project or click a quick prompt below to start.`,
      chips: [
        'Run Rubric Evaluation',
        'Analyze Code Quality',
        'Check Similarity Scan',
        'Generate Viva Questions'
      ]
    }
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim() || !selectedProject) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    }

    setMessages(prev => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI Copilot analysis response tailored to selected project
    setTimeout(() => {
      const lower = textToSend.toLowerCase()
      let aiResponse = {}

      if (lower.includes('rubric') || lower.includes('evaluat') || lower.includes('score')) {
        aiResponse = {
          text: `Here is the comprehensive rubric evaluation for "${selectedProject.title}":`,
          data: {
            type: 'rubric',
            overall: selectedProject.aiEvaluation?.overallScore || 82,
            similarity: selectedProject.aiEvaluation?.similarity || 12,
            items: [
              { label: 'Problem Definition', score: '8/10', pct: '80%' },
              { label: 'Literature Review', score: '8/10', pct: '80%' },
              { label: 'Methodology', score: '12/15', pct: '80%' },
              { label: 'Implementation', score: '17/20', pct: '85%' },
              { label: 'Innovation', score: '13/15', pct: '87%' },
              { label: 'Results & Benchmarks', score: '12/15', pct: '80%' },
              { label: 'Documentation & Style', score: '12/15', pct: '80%' }
            ]
          },
          chips: ['Suggest Score Improvements', 'Generate Viva Questions', 'Inspect Code Quality']
        }
      } else if (lower.includes('similar') || lower.includes('plagiar') || lower.includes('scan')) {
        aiResponse = {
          text: `Semantic similarity analysis complete for "${selectedProject.title}":`,
          data: {
            type: 'similarity',
            similarityScore: `${selectedProject.aiEvaluation?.similarity || 12}%`,
            status: (selectedProject.aiEvaluation?.similarity || 12) <= 15 ? 'Passed Verification' : 'Needs Citation Review',
            notes: [
              'Methodology section is 94% original wording with standard mathematical formulations.',
              'Literature review references are verified against IEEE & ACM standard papers.',
              'No significant code duplication detected in uploaded repository archive.'
            ]
          },
          chips: ['Analyze Code Quality', 'Run Rubric Evaluation']
        }
      } else if (lower.includes('code') || lower.includes('quality') || lower.includes('repo')) {
        aiResponse = {
          text: `Static code quality assessment for repository "${selectedProject.files?.code || 'Source Code Archive'}":`,
          data: {
            type: 'code_quality',
            rating: 'Grade A-',
            metrics: [
              { name: 'Modularity & Architecture', val: '9.0/10' },
              { name: 'Documentation Coverage', val: '8.5/10' },
              { name: 'Exception Handling', val: '7.5/10' },
              { name: 'Code Style Conformance', val: '9.2/10' }
            ],
            recommendation: 'Add unit tests for edge-case sensor inputs and include a requirements.txt / package.json lockfile.'
          },
          chips: ['Check Similarity Scan', 'Generate Viva Questions']
        }
      } else if (lower.includes('viva') || lower.includes('question') || lower.includes('defense')) {
        aiResponse = {
          text: `Here are 4 expected Faculty Viva / Defense Examination questions for "${selectedProject.title}":`,
          data: {
            type: 'viva',
            questions: [
              '1. How does your system architecture handle real-time latency when scaling to concurrent edge nodes?',
              '2. What validation methodology did you use to compare your experimental results against baseline models?',
              '3. Why did you choose this specific framework over existing alternatives discussed in your Literature Review?',
              '4. What are the key hardware/software limitations you encountered during the implementation phase?'
            ]
          },
          chips: ['Suggest Score Improvements', 'Run Rubric Evaluation']
        }
      } else {
        aiResponse = {
          text: `I've analyzed your query regarding "${selectedProject.title}". The technical report demonstrates solid methodology with an AI evaluation score of ${selectedProject.aiEvaluation?.overallScore || 82}/100 and a low similarity index of ${selectedProject.aiEvaluation?.similarity || 12}%. Let me know if you would like me to evaluate rubrics, inspect code, or generate viva defense practice.`,
          chips: ['Run Rubric Evaluation', 'Analyze Code Quality', 'Check Similarity Scan', 'Generate Viva Questions']
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ...aiResponse
        }
      ])
      setIsTyping(false)
    }, 800)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col h-[640px]">
      
      {/* Copilot Header */}
      <div className="px-6 py-4 bg-[#fafbfd] border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#12161f] text-white flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-navy-900">ProjectLense AI Copilot</h2>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active
              </span>
            </div>
            <p className="text-xs text-gray-500">Autonomous evaluation, rubric scoring & viva generation</p>
          </div>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-gray-400" />
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded-xl px-3 py-1.5 outline-none focus:border-blue-500"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/40">
        {messages.map((m) => {
          const isAi = m.sender === 'ai'
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                isAi ? 'bg-[#12161f] text-blue-400' : 'bg-blue-600 text-white'
              }`}>
                {isAi ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-3 ${
                isAi 
                  ? 'bg-white border border-gray-200/90 text-navy-900 rounded-2xl rounded-tl-sm p-4 shadow-sm' 
                  : 'bg-[#12161f] text-white rounded-2xl rounded-tr-sm p-4 shadow-sm'
              }`}>
                <div className="flex items-center justify-between gap-4 text-[10px] text-gray-400 pb-1 border-b border-gray-100">
                  <span className="font-semibold">{isAi ? 'ProjectLense AI' : 'You'}</span>
                  <span>{m.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{m.text}</p>

                {/* Structured Rich Output Data */}
                {m.data?.type === 'rubric' && (
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 space-y-3 mt-2 text-left">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                      <span className="text-xs font-bold text-blue-950">AI Score Recommendation</span>
                      <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {m.data.overall} / 100
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.data.items.map((item, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-lg border border-blue-100">
                          <div className="flex justify-between text-[11px] font-medium text-gray-600 mb-1">
                            <span>{item.label}</span>
                            <span className="font-bold text-navy-900">{item.score}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: item.pct }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.data?.type === 'similarity' && (
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 space-y-2 mt-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-950">Similarity Index</span>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md">
                        {m.data.similarityScore} · {m.data.status}
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-blue-900 pt-1">
                      {m.data.notes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.data?.type === 'code_quality' && (
                  <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-3.5 space-y-2 mt-2 text-left">
                    <div className="flex items-center justify-between border-b border-purple-100 pb-1.5">
                      <span className="text-xs font-bold text-purple-950">Architecture Rating</span>
                      <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-md">{m.data.rating}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {m.data.metrics.map((met, mIdx) => (
                        <div key={mIdx} className="bg-white p-2 rounded-lg border border-purple-100">
                          <span className="text-[10px] text-gray-500 block">{met.name}</span>
                          <span className="font-bold text-navy-900">{met.val}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-purple-900 pt-1 leading-relaxed">
                      <strong>Suggestion:</strong> {m.data.recommendation}
                    </p>
                  </div>
                )}

                {m.data?.type === 'viva' && (
                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-3.5 space-y-2 mt-2 text-left">
                    <span className="text-xs font-bold text-indigo-950 block">Viva Examination Prep Questions</span>
                    <div className="space-y-2 text-xs text-indigo-950">
                      {m.data.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-white p-2.5 rounded-lg border border-indigo-100 font-medium leading-relaxed">
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Action Chips */}
                {m.chips && m.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                    {m.chips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => handleSendMessage(chip)}
                        className="text-[11px] font-medium bg-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-lg transition"
                      >
                        ✦ {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-200 w-fit px-3 py-2 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
            <span>AI Copilot is evaluating project metrics...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Row */}
      <div className="p-3.5 bg-white border-t border-gray-100">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition"
        >
          <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder={`Ask AI to evaluate "${selectedProject?.title || 'project'}" or inspect rubrics...`}
            className="w-full bg-transparent text-xs sm:text-sm text-navy-900 placeholder:text-gray-400 outline-none py-1.5"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-[#12161f] text-white p-2 rounded-lg hover:bg-black transition disabled:opacity-40 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  )
}
