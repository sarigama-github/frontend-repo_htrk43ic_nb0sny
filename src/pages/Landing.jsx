import React from 'react'
import { LogIn, UserPlus } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333]">
      <Header />
      <main className="flex-1">
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-devanagari text-2xl sm:text-3xl font-bold">भारत सरकार</h1>
            <p className="text-lg sm:text-xl font-semibold -mt-1">Government of India</p>
            <p className="mt-1 text-sm sm:text-base">Ministry of Law & Justice · Department of Legal Affairs</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/login" className="group inline-flex items-center justify-center gap-2 rounded bg-[#557A1F] text-white py-3 px-6 hover:bg-[#456217] transition text-base font-medium">
                <LogIn size={18} className="transition group-hover:-translate-y-0.5" />
                Login
              </a>
              <a href="/register" className="group inline-flex items-center justify-center gap-2 rounded bg-white border border-[#557A1F] text-[#557A1F] py-3 px-6 hover:bg-[#f3f8ec] transition text-base font-medium">
                <UserPlus size={18} className="transition group-hover:-translate-y-0.5" />
                Register as Notary Applicant
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
