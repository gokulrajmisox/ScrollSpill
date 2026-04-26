import { login } from './actions'

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden px-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accentDark/20 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="w-full max-w-md z-10">
        <div className="bg-light/5 dark:bg-dark/40 backdrop-blur-xl border border-light/10 dark:border-light/5 p-8 rounded-3xl shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gradient tracking-tight">Uploader Portal</h1>
            <p className="text-gray dark:text-light/60 font-medium">Please sign in to your account</p>
          </div>

          <form action={login} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-light/80 ml-1" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full px-5 py-4 bg-light/5 border border-light/10 rounded-2xl text-light placeholder:text-light/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-light/80 ml-1" htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-5 py-4 bg-light/5 border border-light/10 rounded-2xl text-light placeholder:text-light/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-accent to-accentDark text-white font-bold rounded-2xl shadow-lg hover:shadow-accent/40 transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="pt-6 text-center border-t border-light/5">
            <p className="text-xs text-light/30 uppercase tracking-widest font-bold">Authorized Access Only</p>
          </div>
        </div>
      </div>
    </div>
  )
}
