// Mock AI Evaluation Service
// This module simulates AI-based project evaluation
// In production, this will connect to the FastAPI backend with FAISS and LLM integration

export function generateAIEvaluation(project) {
  // Simulate AI processing delay
  const rubric = {
    problemDefinition: { score: randomScore(6, 10), max: 10 },
    literatureReview: { score: randomScore(6, 10), max: 10 },
    methodology: { score: randomScore(9, 15), max: 15 },
    implementation: { score: randomScore(13, 20), max: 20 },
    innovation: { score: randomScore(9, 15), max: 15 },
    results: { score: randomScore(9, 15), max: 15 },
    documentation: { score: randomScore(9, 15), max: 15 },
  }

  const overallScore = Object.values(rubric).reduce((sum, r) => sum + r.score, 0)
  const similarity = randomScore(5, 20)

  return {
    overallScore,
    similarity,
    rubric,
    feedback: {
      summary: `The project "${project.title}" demonstrates a solid understanding of the problem domain. The implementation shows good technical competency with room for improvement in results analysis and documentation.`,
      strengths: [
        'Clear problem definition and scope',
        'Good technical implementation approach',
        'Relevant methodology chosen for the problem',
        'Adequate use of modern technologies',
      ],
      weaknesses: [
        'Results section needs more comparative analysis',
        'Literature review could include more recent publications',
        'Some sections could benefit from better organization',
      ],
      suggestions: [
        'Add quantitative performance metrics and benchmarks',
        'Include more recent references (2023-2024)',
        'Expand the discussion on limitations and future work',
        'Add comparison with at least 2-3 existing solutions',
      ],
    },
  }
}

function randomScore(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const RUBRIC_LABELS = {
  problemDefinition: 'Problem Definition',
  literatureReview: 'Literature Review',
  methodology: 'Methodology',
  implementation: 'Implementation',
  innovation: 'Innovation',
  results: 'Results',
  documentation: 'Documentation',
}
