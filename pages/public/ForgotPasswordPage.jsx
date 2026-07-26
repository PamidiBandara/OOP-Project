import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto card p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        <form className="space-y-4">
          <p className="text-gray-600 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="your@email.com"
          />
          <button className="w-full btn btn-primary">Send Reset Link</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
