import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Input(props){
  return <input {...props} className={`w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded px-3 py-2 text-[15px] text-[#333333] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`} />
}

export default function ForgotPassword(){
  const [step, setStep] = useState(1)
  const [appNo, setAppNo] = useState('')
  const [otp, setOtp] = useState(['','','','','',''])
  const [timer, setTimer] = useState(120)

  React.useEffect(()=>{
    if(step===2 && timer>0){
      const t=setTimeout(()=>setTimer(timer-1),1000)
      return ()=>clearTimeout(t)
    }
  },[step,timer])

  const sendOtp = (e)=>{
    e.preventDefault()
    if(!appNo) return
    setStep(2)
    setTimer(120)
  }

  const verifyOtp = (e)=>{
    e.preventDefault()
    if(otp.join('').length!==6) return
    setStep(3)
  }

  const resetPwd = (e)=>{
    e.preventDefault()
    alert('Password reset (demo)')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />
      <main className="flex-1">
        <div className="max-w-xl mx-auto px-4 py-10">
          <h1 className="text-xl font-semibold mb-6 text-center">Forgot Password</h1>
          {step===1 && (
            <form onSubmit={sendOtp} className="space-y-4 bg-white border border-[#E0E0E0] rounded p-6">
              <div>
                <label className="block text-[15px] font-medium mb-1">Application Number</label>
                <Input value={appNo} onChange={(e)=>setAppNo(e.target.value)} placeholder="Enter Application Number" />
              </div>
              <button className="w-full py-2 rounded bg-[#557A1F] text-white hover:bg-[#456217] transition">Send OTP</button>
            </form>
          )}
          {step===2 && (
            <form onSubmit={verifyOtp} className="space-y-4 bg-white border border-[#E0E0E0] rounded p-6">
              <div>
                <label className="block text-[15px] font-medium mb-1">Enter OTP</label>
                <div className="flex items-center gap-2">
                  {otp.map((d,idx)=> (
                    <input key={idx} maxLength={1} value={d} onChange={(e)=>{
                      const v=e.target.value.replace(/[^0-9]/g,'')
                      const n=[...otp]; n[idx]=v; setOtp(n)
                    }} className="w-10 h-10 text-center bg-[#F5F5F5] border border-[#E0E0E0] rounded" />
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">Time left: {Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')} <button type="button" disabled={timer>0} onClick={()=>setTimer(120)} className={`ml-2 ${timer>0 ? 'text-gray-400' : 'text-[#557A1F] underline'}`}>Resend OTP</button></div>
              </div>
              <button className="w-full py-2 rounded bg-[#557A1F] text-white hover:bg-[#456217] transition">Verify OTP</button>
            </form>
          )}
          {step===3 && (
            <form onSubmit={resetPwd} className="space-y-4 bg-white border border-[#E0E0E0] rounded p-6">
              <div>
                <label className="block text-[15px] font-medium mb-1">New Password</label>
                <Input type="password" placeholder="Enter New Password" />
              </div>
              <div>
                <label className="block text-[15px] font-medium mb-1">Confirm Password</label>
                <Input type="password" placeholder="Confirm New Password" />
              </div>
              <button className="w-full py-2 rounded bg-[#557A1F] text-white hover:bg-[#456217] transition">Reset Password</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
