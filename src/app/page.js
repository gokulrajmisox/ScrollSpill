import { createClient } from '@/src/utils/supabase/server'
import { logout } from '@/src/app/uploader/login/actions'
import { redirect } from 'next/navigation'

export default async function UploaderDashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/uploader/login')
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header section */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-dark/10 dark:border-light/10">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gradient">Uploader Dashboard</h1>
            <p className="text-gray dark:text-light/60 font-medium">Welcome back, <span className="text-accent">{user.email}</span></p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-dark/5 dark:bg-light/5 hover:bg-red-500/10 hover:text-red-500 border border-dark/10 dark:border-light/10 transition-all duration-300 font-bold"
            >
              Log Out
            </button>
          </form>
        </header>

        {/* Dashboard Content */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-light/50 dark:bg-dark/50 border border-dark/5 dark:border-light/5 p-8 rounded-3xl shadow-xl space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-dark/10 dark:border-light/10 rounded-2xl">
                <p className="text-gray dark:text-light/40 italic">Activity log will appear here...</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-br from-accent/20 to-accentDark/20 border border-accent/20 p-8 rounded-3xl shadow-xl space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full py-4 bg-accent text-white font-bold rounded-2xl shadow-lg hover:shadow-accent/40 transition-all duration-300 active:scale-95">
                  Create New Post
                </button>
                <button className="w-full py-4 bg-light/10 dark:bg-dark/10 border border-dark/5 dark:border-light/10 font-bold rounded-2xl hover:bg-light/20 transition-all duration-300 active:scal[...]
                  Manage Media
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
