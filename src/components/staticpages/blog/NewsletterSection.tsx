'use client'
import React, { useState } from 'react'

interface NewsletterSectionProps {
  title?: string
  description?: string
}

export default function NewsletterSection({
  title = 'Sign up for our newsletter!',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
}: NewsletterSectionProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: '6931b904386182e7c9a990f6',
          submissionData: [
            { field: 'Name...', value: name },
            { field: 'E-mail...', value: email },
          ],
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setName('')
        setEmail('')
      } else {
        setError('A apărut o eroare. Vă rugăm încercați din nou.')
      }
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm încercați din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-16 px-8 lg:px-16" style={{ backgroundColor: '#434343' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text */}
          <div className="lg:w-1/2">
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: '#D9D9D9' }}
            >
              {title}
            </h2>
            <p 
              className="text-base"
              style={{ color: '#D9D9D9' }}
            >
              {description}
            </p>
          </div>
    
          {/* Right side - Form */} 
          <div className="lg:w-1/2 w-full max-w-md">
            {isSuccess ? (
              <div 
                className="text-center py-8 px-4 rounded-2xl"
                style={{ color: '#D9D9D9' }}
              >
                <p className="text-xl font-semibold">Înregistrat cu succes!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name..."
                    required
                    className="w-full px-6 py-3 rounded-full text-gray-700 placeholder:text-gray-500 focus:outline-none"
                    style={{
                      backgroundColor: '#3B3B3B',
                      boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.1)',
                      color: '#D9D9D9',
                    }}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                    className="w-full px-6 py-3 rounded-full text-gray-700 placeholder:text-gray-500 focus:outline-none"
                    style={{
                      backgroundColor: '#3B3B3B',
                      boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.1)',
                      color: '#D9D9D9',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                    style={{
                      backgroundColor: '#D9D9D9',
                      color: '#4A4A4A',
                      boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.15), inset 2px 2px 4px rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {isSubmitting ? 'Se trimite...' : 'Sign Up'}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
