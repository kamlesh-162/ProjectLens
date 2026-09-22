// Storage service for localStorage persistence

const KEYS = {
  PROJECTS: 'projectlense_projects',
  EVALUATIONS: 'projectlense_evaluations',
  USER: 'projectlense_user',
  REGISTERED_USERS: 'projectlense_registered_users',
}

export function getProjects() {
  return JSON.parse(localStorage.getItem(KEYS.PROJECTS) || '[]')
}

export function saveProject(project) {
  const projects = getProjects()
  projects.push(project)
  localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects))
  return project
}

export function updateProject(projectId, updates) {
  const projects = getProjects()
  const index = projects.findIndex(p => p.id === projectId)
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates }
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects))
    return projects[index]
  }
  return null
}

export function getProjectById(projectId) {
  const projects = getProjects()
  return projects.find(p => p.id === projectId) || null
}

export function getProjectsByStudent(studentId) {
  const projects = getProjects()
  return projects.filter(p => p.studentId === studentId)
}

export function getAllProjectsForFaculty() {
  return getProjects()
}

export function initializeDemoData() {
  const existing = getProjects()
  if (existing.length > 0) return

  const demoProjects = [
    {
      id: 'proj-1',
      title: 'Smart Agriculture System',
      description: 'An IoT-based smart agriculture monitoring system using sensors, microcontrollers and cloud computing to optimize crop yield and reduce water consumption. The system features real-time monitoring dashboards, predictive analytics for weather patterns, and automated irrigation control.',
      department: 'Computer Science',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-1',
      studentName: 'Rahul Sharma',
      status: 'evaluated',
      submittedAt: '2024-08-15T10:30:00Z',
      files: {
        report: 'Smart_Agriculture_Report.pdf',
        code: 'Smart_Agriculture_Code.zip',
        presentation: 'Smart_Agriculture_Presentation.pptx',
      },
      aiEvaluation: {
        overallScore: 82,
        similarity: 12,
        rubric: {
          problemDefinition: { score: 8, max: 10 },
          literatureReview: { score: 8, max: 10 },
          methodology: { score: 12, max: 15 },
          implementation: { score: 17, max: 20 },
          innovation: { score: 13, max: 15 },
          results: { score: 12, max: 15 },
          documentation: { score: 12, max: 15 },
        },
        feedback: {
          summary: 'Strong technical implementation and clear methodology. The results section can be improved by including more comparative analysis with existing solutions.',
          strengths: [
            'Clear and well-defined problem statement',
            'Strong technical implementation using modern IoT stack',
            'Relevant and well-explained methodology',
            'Good use of real-time data visualization',
          ],
          weaknesses: [
            'Results section needs more comparative analysis',
            'Limited discussion of scalability challenges',
            'Some references are outdated (pre-2020)',
          ],
          suggestions: [
            'Add quantitative performance metrics and benchmarks',
            'Include more recent references (2023-2024)',
            'Expand the discussion on system scalability',
            'Add a comparison table with existing solutions',
          ],
        },
      },
      facultyEvaluation: null,
    },
    {
      id: 'proj-2',
      title: 'AI Attendance System',
      description: 'A facial recognition based attendance system using deep learning models. The system uses a webcam to capture student faces and matches them against a pre-trained database using CNN architecture for accurate and fast attendance marking.',
      department: 'Computer Science',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-1',
      studentName: 'Rahul Sharma',
      status: 'approved',
      submittedAt: '2024-07-20T14:00:00Z',
      files: {
        report: 'AI_Attendance_Report.pdf',
        code: 'AI_Attendance_Code.zip',
        presentation: 'AI_Attendance_Presentation.pptx',
      },
      aiEvaluation: {
        overallScore: 88,
        similarity: 8,
        rubric: {
          problemDefinition: { score: 9, max: 10 },
          literatureReview: { score: 9, max: 10 },
          methodology: { score: 13, max: 15 },
          implementation: { score: 18, max: 20 },
          innovation: { score: 13, max: 15 },
          results: { score: 13, max: 15 },
          documentation: { score: 13, max: 15 },
        },
        feedback: {
          summary: 'Excellent project with strong implementation and innovative approach. Well-documented with comprehensive results.',
          strengths: [
            'Innovative use of deep learning for attendance',
            'Excellent implementation quality',
            'Comprehensive testing and results',
            'Well-structured documentation',
          ],
          weaknesses: [
            'Privacy considerations need more discussion',
            'Edge cases for poor lighting not fully addressed',
          ],
          suggestions: [
            'Add a section on privacy and data protection',
            'Test with larger datasets',
            'Include failure analysis for edge cases',
          ],
        },
      },
      facultyEvaluation: {
        finalScore: 90,
        comment: 'Outstanding work. The facial recognition implementation is robust and well-tested. Approved with distinction.',
        approvedAt: '2024-08-10T16:30:00Z',
        approvedBy: 'Dr. Priya Nair',
      },
    },
    {
      id: 'proj-3',
      title: 'Campus Navigation App',
      description: 'A mobile application for campus navigation using AR (Augmented Reality) and indoor positioning technology. Helps new students and visitors navigate the campus with real-time directions, building information, and event notifications.',
      department: 'Computer Science',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-1',
      studentName: 'Rahul Sharma',
      status: 'under-review',
      submittedAt: '2024-09-01T09:15:00Z',
      files: {
        report: 'Campus_Navigation_Report.pdf',
        code: 'Campus_Navigation_Code.zip',
        presentation: 'Campus_Navigation_Presentation.pptx',
      },
      aiEvaluation: {
        overallScore: 76,
        similarity: 15,
        rubric: {
          problemDefinition: { score: 8, max: 10 },
          literatureReview: { score: 7, max: 10 },
          methodology: { score: 11, max: 15 },
          implementation: { score: 15, max: 20 },
          innovation: { score: 12, max: 15 },
          results: { score: 11, max: 15 },
          documentation: { score: 12, max: 15 },
        },
        feedback: {
          summary: 'Good concept with solid foundation. Implementation needs refinement in AR accuracy and indoor positioning.',
          strengths: [
            'Innovative concept combining AR with campus navigation',
            'Good problem definition and user research',
            'Clean UI/UX design',
          ],
          weaknesses: [
            'AR accuracy needs improvement',
            'Indoor positioning has significant drift issues',
            'Limited testing with real users',
            'Higher similarity score - review referenced sections',
          ],
          suggestions: [
            'Improve AR marker detection accuracy',
            'Use WiFi fingerprinting for better indoor positioning',
            'Conduct user testing with at least 20 participants',
            'Rephrase sections flagged for similarity',
          ],
        },
      },
      facultyEvaluation: null,
    },
  ]

  // Additional projects from other students for faculty/admin views
  const additionalProjects = [
    {
      id: 'proj-4',
      title: 'Online Exam Proctoring System',
      description: 'AI-powered online examination proctoring system using computer vision for cheating detection.',
      department: 'Computer Science',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-ext-1',
      studentName: 'Ananya Patel',
      status: 'evaluated',
      submittedAt: '2024-08-20T11:00:00Z',
      files: { report: 'Exam_Proctoring_Report.pdf', code: 'Exam_Proctoring_Code.zip', presentation: 'Exam_Proctoring_Presentation.pptx' },
      aiEvaluation: {
        overallScore: 79, similarity: 10,
        rubric: { problemDefinition: { score: 8, max: 10 }, literatureReview: { score: 7, max: 10 }, methodology: { score: 12, max: 15 }, implementation: { score: 16, max: 20 }, innovation: { score: 12, max: 15 }, results: { score: 12, max: 15 }, documentation: { score: 12, max: 15 } },
        feedback: { summary: 'Good implementation with effective proctoring features.', strengths: ['Effective cheating detection', 'Good UI'], weaknesses: ['Limited browser compatibility'], suggestions: ['Test on more browsers'] }
      },
      facultyEvaluation: null,
    },
    {
      id: 'proj-5',
      title: 'Healthcare Chatbot',
      description: 'NLP-based healthcare chatbot for preliminary diagnosis and appointment scheduling.',
      department: 'Computer Science',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-ext-2',
      studentName: 'Vikram Singh',
      status: 'submitted',
      submittedAt: '2024-09-05T08:45:00Z',
      files: { report: 'Healthcare_Chatbot_Report.pdf', code: 'Healthcare_Chatbot_Code.zip', presentation: 'Healthcare_Chatbot_Presentation.pptx' },
      aiEvaluation: {
        overallScore: 74, similarity: 18,
        rubric: { problemDefinition: { score: 7, max: 10 }, literatureReview: { score: 7, max: 10 }, methodology: { score: 11, max: 15 }, implementation: { score: 15, max: 20 }, innovation: { score: 11, max: 15 }, results: { score: 11, max: 15 }, documentation: { score: 12, max: 15 } },
        feedback: { summary: 'Decent NLP implementation. Needs improvement in diagnosis accuracy.', strengths: ['Good conversation flow', 'Clean architecture'], weaknesses: ['High similarity score', 'Limited medical knowledge base'], suggestions: ['Expand medical database', 'Reduce similarity'] }
      },
      facultyEvaluation: null,
    },
    {
      id: 'proj-6',
      title: 'E-Waste Management Platform',
      description: 'Web platform for e-waste collection, recycling, and awareness using gamification.',
      department: 'Information Technology',
      academicYear: '2024-25',
      facultyGuide: 'Dr. Priya Nair',
      studentId: 'student-ext-3',
      studentName: 'Meera Krishnan',
      status: 'approved',
      submittedAt: '2024-07-10T13:20:00Z',
      files: { report: 'EWaste_Report.pdf', code: 'EWaste_Code.zip', presentation: 'EWaste_Presentation.pptx' },
      aiEvaluation: {
        overallScore: 85, similarity: 6,
        rubric: { problemDefinition: { score: 9, max: 10 }, literatureReview: { score: 8, max: 10 }, methodology: { score: 13, max: 15 }, implementation: { score: 17, max: 20 }, innovation: { score: 14, max: 15 }, results: { score: 12, max: 15 }, documentation: { score: 12, max: 15 } },
        feedback: { summary: 'Excellent social impact project with innovative gamification.', strengths: ['Strong social relevance', 'Creative gamification', 'Low similarity'], weaknesses: ['Could use more analytics'], suggestions: ['Add impact metrics dashboard'] }
      },
      facultyEvaluation: { finalScore: 87, comment: 'Great project with social impact. Well done.', approvedAt: '2024-07-25T14:00:00Z', approvedBy: 'Dr. Priya Nair' },
    },
  ]

  localStorage.setItem(KEYS.PROJECTS, JSON.stringify([...demoProjects, ...additionalProjects]))
}
