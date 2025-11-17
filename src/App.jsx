import React from 'react'
import Header from './components/Header'
import Notice from './components/Notice'
import RegistrationForm from './components/RegistrationForm'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-white text-[#333333]">
      <Header />
      <Notice />
      <main>
        <RegistrationForm />
      </main>
    </div>
  )
}

export default App
