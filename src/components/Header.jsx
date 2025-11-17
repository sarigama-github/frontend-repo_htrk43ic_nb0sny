import React from 'react'

function Emblem() {
  // Simple black emblem placeholder using SVG (stylized Ashoka pillar outline)
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="32" cy="32" r="30" stroke="#000" strokeWidth="2" fill="none" />
      <circle cx="32" cy="32" r="18" stroke="#000" strokeWidth="2" fill="none" />
      <line x1="32" y1="4" x2="32" y2="60" stroke="#000" strokeWidth="2" />
      <line x1="4" y1="32" x2="60" y2="32" stroke="#000" strokeWidth="2" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="w-full bg-[#557A1F] text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-4 py-4">
          <div className="flex flex-col items-center justify-center">
            <Emblem />
            <div className="text-center mt-1 leading-tight">
              <div className="font-devanagari font-semibold text-xs sm:text-sm">विधि और न्याय मंत्रालय</div>
              <div className="text-[11px] sm:text-xs">Ministry of Law & Justice</div>
              <div className="text-[11px] sm:text-xs">DEPARTMENT OF LEGAL AFFAIRS</div>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="font-devanagari font-extrabold text-white text-xl sm:text-2xl">भारत सरकार</div>
            <div className="font-semibold text-white text-lg sm:text-xl">Government of India</div>
          </div>
          <div className="w-16 sm:w-24" aria-hidden></div>
        </div>
      </div>
      <nav className="bg-[#557A1F] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 sm:gap-10 py-3 text-sm sm:text-base">
            {['Home','New User Registration','Registered User Login','Contact Us'].map((item)=> (
              <li key={item}>
                <a href="#" className="text-white hover:text-white/90 hover:underline underline-offset-4 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
