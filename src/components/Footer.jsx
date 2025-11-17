import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-[#333333] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <a href="/terms" className="hover:underline">Terms & Conditions</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
        <div className="text-gray-600">Support: <a href="mailto:support@notary.gov.in" className="text-[#557A1F] hover:underline">support@notary.gov.in</a></div>
      </div>
    </footer>
  )
}
