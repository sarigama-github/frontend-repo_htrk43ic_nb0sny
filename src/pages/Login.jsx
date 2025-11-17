import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Eye, EyeOff } from 'lucide-react'

function Input({ hasError, className = '', ...props }) {
  return (
    <input {...props} className={`w-full bg-[#F5F5F5] border ${hasError ? 'border-[#B30000]' : 'border-[#E0E0E0]'} rounded px-3 py-2 text-[15px] text-[#333333] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`} />
  )
}

export default function Login() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!id || !password) {
      setError('Please enter your Application Number and Password.')
      return
    }
    // Call backend later
    alert('Demo login attempt')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />
      <main className="flex-1">
        <div className="max-w-md mx-auto px-4 py-10">
          <h1 className="text-xl font-semibold mb-6 text-center">Login</h1>
          {error && <div className="bg-[#FEE2E2] text-[#B30000] border border-[#B30000] rounded px-4 py-2 mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4 bg-white border border-[#E0E0E0] rounded p-6">
            <div>
              <label className="block text-[15px] font-medium mb-1">Application Number</label>
              <Input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter Application Number" />
            </div>
            <div>
              <label className="block text-[15px] font-medium mb-1">Password</label>
              <div className="relative">
                <Input type={show ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
                <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>
            <button type="submit" className="w-full py-2 rounded bg-[#557A1F] text-white hover:bg-[#456217] transition">Login</button>
            <div className="flex items-center justify-between text-sm">
              <a href="/forgot" className="text-[#557A1F] hover:underline">Forgot Password</a>
              <a href="/register" className="text-[#557A1F] hover:underline">New User? Register</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
