import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const DEMO_USERS = [
  { id: 'student-1', name: 'Rahul Sharma', email: 'student@projectlense.com', password: 'student123', role: 'student', department: 'Computer Science' },
  { id: 'faculty-1', name: 'Dr. Priya Nair', email: 'faculty@projectlense.com', password: 'faculty123', role: 'faculty', department: 'Computer Science' },
  { id: 'admin-1', name: 'Admin User', email: 'admin@projectlense.com', password: 'admin123', role: 'admin', department: 'Administration' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('projectlense_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (e) {
        localStorage.removeItem('projectlense_user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password, role) => {
    // Check demo users first
    const demoUser = DEMO_USERS.find(
      u => u.email === email && u.password === password && u.role === role
    )
    if (demoUser) {
      const userData = { ...demoUser }
      delete userData.password
      setUser(userData)
      localStorage.setItem('projectlense_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem('projectlense_registered_users') || '[]')
    const regUser = registeredUsers.find(
      u => u.email === email && u.password === password && u.role === role
    )
    if (regUser) {
      const userData = { ...regUser }
      delete userData.password
      setUser(userData)
      localStorage.setItem('projectlense_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }

    return { success: false, error: 'Invalid credentials or role mismatch' }
  }

  const register = (name, email, password, role) => {
    const registeredUsers = JSON.parse(localStorage.getItem('projectlense_registered_users') || '[]')
    
    // Check if email already exists
    const exists = [...DEMO_USERS, ...registeredUsers].find(u => u.email === email)
    if (exists) {
      return { success: false, error: 'Email already registered' }
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      password,
      role,
      department: 'Computer Science',
    }
    registeredUsers.push(newUser)
    localStorage.setItem('projectlense_registered_users', JSON.stringify(registeredUsers))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('projectlense_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
