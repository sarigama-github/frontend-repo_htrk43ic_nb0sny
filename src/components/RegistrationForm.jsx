import React, { useMemo, useState } from 'react'
import { Eye, EyeOff, Calendar, RefreshCw } from 'lucide-react'

const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/
const nameRegex = /^[A-Za-z\s]+$/
const passwordRegex = /^(?=^[A-Za-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,10}$/

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm text-[#B30000]">{message}</p>
}

function Label({ children, required }) {
  return (
    <label className="block text-[15px] font-medium text-[#333333] mb-1">
      {children}{required && <span className="text-[#B30000]"> *</span>}
    </label>
  )
}

function Input({ className = '', hasError, ...props }) {
  return (
    <input
      className={`w-full bg-[#F5F5F5] border ${hasError ? 'border-[#B30000]' : 'border-[#E0E0E0]'} rounded px-3 py-2 text-[15px] text-[#333333] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
      {...props}
    />
  )
}

function PasswordInput({ value, onChange, hasError, placeholder }) {
  const [show, setShow] = useState(false)
  return (
    <div className={`relative`}>
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        hasError={hasError}
        aria-invalid={!!hasError}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}

function DateInput({ value, onChange, hasError, placeholder }) {
  const handleInput = (e) => {
    // Enforce dd/mm/yyyy format mask lightly
    let v = e.target.value.replace(/[^0-9/]/g, '')
    if (v.length === 2 && !v.includes('/')) v += '/'
    if (v.length === 5 && v.split('/').length - 1 === 1) v += '/'
    onChange({ target: { value: v } })
  }
  const openPicker = (e) => {
    // Fallback: try native date input in a hidden control
  }
  return (
    <div className="relative">
      <Input
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        hasError={hasError}
        inputMode="numeric"
        aria-invalid={!!hasError}
      />
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-600">
        <Calendar size={18} />
      </div>
    </div>
  )
}

function Captcha({ value, onChange, hasError, onRefresh }) {
  return (
    <div className="flex items-center gap-3">
      <div className="select-none inline-flex items-center justify-center w-28 h-10 bg-gray-200 text-gray-800 font-mono tracking-widest text-sm rounded border border-[#E0E0E0]">
        8PHCTe
      </div>
      <button type="button" onClick={onRefresh} className="text-gray-700 hover:text-gray-900 transition transform active:rotate-180">
        <RefreshCw size={18} />
      </button>
      <div className="flex-1">
        <Input
          placeholder="Enter Captcha"
          value={value}
          onChange={onChange}
          hasError={hasError}
        />
      </div>
    </div>
  )
}

export default function RegistrationForm() {
  const [form, setForm] = useState({
    applicationNumber: '',
    name: '',
    email: '',
    password: '',
    dob: '',
    mobile: '',
    reEmail: '',
    rePassword: '',
    captcha: '',
  })

  const [serverError, setServerError] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const reset = () => {
    setForm({
      applicationNumber: '', name: '', email: '', password: '', dob: '', mobile: '', reEmail: '', rePassword: '', captcha: ''
    })
    setErrors({})
    setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!form.applicationNumber.trim()) e.applicationNumber = 'Application number is required.'
    if (!form.name.trim()) e.name = 'Name is required.'
    else if (!nameRegex.test(form.name.trim())) e.name = 'Only alphabets are allowed.'

    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!emailRegex.test(form.email)) e.email = 'Invalid email address.'

    if (!form.reEmail.trim()) e.reEmail = 'Please re-enter email.'
    else if (form.email !== form.reEmail) e.reEmail = 'Email and Re-enter Email do not match.'

    if (!form.password) e.password = 'Password is required.'
    else if (!passwordRegex.test(form.password)) e.password = 'Password does not meet criteria.'

    if (!form.rePassword) e.rePassword = 'Please re-enter password.'
    else if (form.password !== form.rePassword) e.rePassword = 'Passwords do not match.'

    // DOB validation dd/mm/yyyy
    if (!form.dob.trim()) e.dob = 'Date of birth is required.'
    else {
      const m = form.dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
      if (!m) e.dob = 'Invalid date format.'
    }

    // Mobile
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required.'
    else if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile number.'

    if (!form.captcha.trim()) e.captcha = 'Captcha is required.'
    else if (form.captcha !== '8PHCTe') e.captcha = 'Captcha incorrect.'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    // Here we would call backend; for now just simulate
    // setServerError('Application number not found.')
    alert('Registered successfully (demo).')
  }

  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        {serverError && (
          <div className="bg-[#FEE2E2] text-[#B30000] border border-[#B30000] rounded px-4 py-2 mb-4">
            {serverError}
          </div>
        )}
        <form onSubmit={onSubmit} className="mx-auto bg-white rounded border border-[#E0E0E0] w-full md:w-4/5 lg:w-4/5 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#333333] mb-4">New User Registration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div>
                <Label required>Application Number</Label>
                <Input
                  placeholder="Enter application number"
                  value={form.applicationNumber}
                  onChange={handleChange('applicationNumber')}
                  hasError={!!errors.applicationNumber}
                />
                <FieldError message={errors.applicationNumber} />
              </div>

              <div>
                <Label required>Enter Name</Label>
                <Input
                  placeholder="Enter Name"
                  value={form.name}
                  onChange={handleChange('name')}
                  hasError={!!errors.name}
                />
                <FieldError message={errors.name} />
              </div>

              <div>
                <Label required>Enter Email Address / Username</Label>
                <Input
                  placeholder="Enter E-Mail Address"
                  value={form.email}
                  onChange={handleChange('email')}
                  hasError={!!errors.email}
                />
                <p className="text-xs text-gray-600 mt-1">Please enter a correct email for verification.</p>
                <FieldError message={errors.email} />
              </div>

              <div>
                <Label required>Enter Password</Label>
                <PasswordInput
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange('password')}
                  hasError={!!errors.password}
                />
                <div className="mt-2 text-sm text-[#B30000] bg-[#FEE2E2] border border-[#B30000] rounded p-2">
                  Password should start with a Letter, should contain <br />
                  1 Uppercase Letter, 1 Lowercase Letter, 1 Numeric and <br />
                  1 Special Character. Minimum Length is 8 and Max Length is 10.
                </div>
                <FieldError message={errors.password} />
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div>
                <Label required>Date of Birth</Label>
                <DateInput
                  placeholder="dd/mm/yyyy"
                  value={form.dob}
                  onChange={handleChange('dob')}
                  hasError={!!errors.dob}
                />
                <FieldError message={errors.dob} />
              </div>

              <div>
                <Label required>Mobile Number</Label>
                <Input
                  placeholder="Enter Mobile"
                  value={form.mobile}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, '').slice(0, 10)
                    handleChange('mobile')({ target: { value: v } })
                  }}
                  inputMode="numeric"
                  hasError={!!errors.mobile}
                />
                <FieldError message={errors.mobile} />
              </div>

              <div>
                <Label required>Re-enter Email Address</Label>
                <Input
                  placeholder="Enter E-Mail Address"
                  value={form.reEmail}
                  onChange={handleChange('reEmail')}
                  hasError={!!errors.reEmail}
                />
                <FieldError message={errors.reEmail} />
              </div>

              <div>
                <Label required>Re-enter Password</Label>
                <PasswordInput
                  placeholder="Enter Password"
                  value={form.rePassword}
                  onChange={handleChange('rePassword')}
                  hasError={!!errors.rePassword}
                />
                <FieldError message={errors.rePassword} />
              </div>
            </div>
          </div>

          {/* Captcha */}
          <div className="mt-6">
            <Label>Captcha</Label>
            <Captcha
              value={form.captcha}
              onChange={handleChange('captcha')}
              hasError={!!errors.captcha}
              onRefresh={() => {}}
            />
            <FieldError message={errors.captcha} />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button type="button" onClick={() => window.history.back()} className="px-6 py-2 rounded bg-[#B30000] text-white hover:bg-[#990000] transition">
              Back
            </button>
            <button type="button" onClick={reset} className="px-6 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition">
              Reset
            </button>
            <button type="submit" className="px-6 py-2 rounded bg-[#557A1F] text-white hover:bg-[#456217] transition">
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
