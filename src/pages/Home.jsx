import { useState } from "react";

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "Java Developer",
  "Python Developer",
  "Data Analyst",
  "Software Tester",
];

const interviewTypes = [
  {
    title: "Technical Interview",
    description: "Test your technical knowledge with role-specific questions.",
    icon: "💻",
  },
  {
    title: "HR Interview",
    description: "Practice common HR and behavioral interview questions.",
    icon: "🤝",
  },
  {
    title: "Mixed Interview",
    description: "Experience a realistic technical + HR interview.",
    icon: "🎯",
  },
];

export default function App() {
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedType, setSelectedType] = useState("Mixed Interview");

  return (
    <div className="min-h-screen bg-[#070b16] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#070b16]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-bold shadow-lg shadow-violet-500/20">
              P
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">PrepAI</h1>
              <p className="text-xs text-gray-500">AI Interview Coach</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#practice" className="transition hover:text-white">
              Practice
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how" className="transition hover:text-white">
              How it works
            </a>
          </div>

          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                AI-powered interview practice
              </div>

              <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                Practice smarter.
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Interview better.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
                Practice realistic interviews with an AI coach that evaluates
                your answers, communication, speaking style and interview
                presence.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                 href="/interview-setup"
                 className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:scale-[1.02]"
                 >
                 Start Mock Interview →
               </a>

                <a
                  href="#features"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Features
                </a>
              </div>
            </div>

            {/* Preview Card */}
            <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.035] p-3 shadow-2xl shadow-violet-950/20">
              <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5 md:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm text-gray-500">Current session</p>
                    <h3 className="mt-1 text-lg font-semibold">
                      Frontend Developer Interview
                    </h3>
                  </div>

                  <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    ● AI Interviewer Ready
                  </div>
                </div>

                <div className="grid gap-4 pt-5 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs text-gray-500">Technical</p>
                    <p className="mt-2 text-3xl font-bold">84%</p>
                    <p className="mt-1 text-xs text-emerald-400">
                      Strong performance
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs text-gray-500">Communication</p>
                    <p className="mt-2 text-3xl font-bold">78%</p>
                    <p className="mt-1 text-xs text-yellow-400">
                      Room to improve
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs text-gray-500">Interview readiness</p>
                    <p className="mt-2 text-3xl font-bold">81%</p>
                    <p className="mt-1 text-xs text-violet-400">
                      Good progress
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Setup */}
        <section id="practice" className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10">
              <p className="text-sm font-medium text-violet-400">
                GET STARTED
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                Build your interview session
              </h2>
              <p className="mt-3 max-w-2xl text-gray-400">
                Choose your target role and interview style. Your AI coach will
                personalize the session.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Role */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-4 text-sm font-semibold">Target role</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`rounded-xl border p-4 text-left text-sm transition ${
                        selectedRole === role
                          ? "border-violet-400/50 bg-violet-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interview type */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="mb-4 text-sm font-semibold">Interview type</p>

                <div className="space-y-3">
                  {interviewTypes.map((type) => (
                    <button
                      key={type.title}
                      onClick={() => setSelectedType(type.title)}
                      className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                        selectedType === type.title
                          ? "border-violet-400/50 bg-violet-500/10"
                          : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>

                      <div>
                        <p className="font-medium">{type.title}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {type.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-5">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <p className="text-sm text-gray-500">Your selection</p>
                  <p className="mt-1 font-semibold">
                    {selectedRole} · {selectedType}
                  </p>
                </div>

                <button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]">
                  Start Interview →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-violet-400">
                SMART COACHING
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                More than just interview questions
              </h2>
              <p className="mt-4 text-gray-400">
                PrepAI helps you understand not only what to answer, but how
                to present yourself professionally.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["🤖", "AI Interviewer", "Realistic role-specific questions and follow-ups."],
                ["📊", "Answer Evaluation", "Get technical, relevance and clarity scores."],
                ["🗣️", "Speaking Feedback", "Improve pace, pauses and filler words."],
                ["🎥", "Interview Presence", "Feedback on observable posture and camera behavior."],
                ["💡", "Better Answers", "Learn how to structure and deliver stronger answers."],
                ["📈", "Progress Tracking", "Compare interviews and identify improvement areas."],
              ].map(([icon, title, description]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.05]"
                >
                  <div className="text-3xl">{icon}</div>
                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t border-white/10 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <p className="text-sm font-medium text-violet-400">HOW IT WORKS</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                From practice to confidence
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
              {[
                ["01", "Choose your role", "Tell PrepAI what job you're preparing for."],
                ["02", "Take the interview", "Answer realistic AI-generated questions."],
                ["03", "Get feedback", "Understand exactly what to improve."],
                ["04", "Practice again", "Target your weak areas and improve."],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-gray-900 transition hover:scale-[1.02]"
                >
                  <span className="text-sm font-bold text-violet-400">
                    {number}
                  </span>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 PrepAI. AI Interview Coach.</p>
          <p>Practice. Improve. Get interview-ready.</p>
        </div>
      </footer>
    </div>
  );
}