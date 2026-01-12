function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Ozi Starter
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
          React + Vite + Tailwind
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Clean setup with Tailwind ready to build. Start editing{' '}
          <code className="rounded bg-slate-800 px-2 py-1 text-sm text-slate-200">
            src/App.jsx
          </code>{' '}
          and watch the UI update instantly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-white/20">
            Get Started
          </button>
          <button className="rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
            View Docs
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
