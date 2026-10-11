import { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "Java Developer",
  "Python Developer",
  "Data Analyst",
  "Software Tester",
];

const interviewTypes = [
  "Technical Interview",
  "HR Interview",
  "Mixed Interview",
];

const difficulties = ["Easy", "Medium", "Hard"];

export default function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Frontend Developer");
  const [type, setType] = useState("Mixed Interview");
  const [difficulty, setDifficulty] = useState("Medium");

  const handleStart = () => {
    navigate("/interview", {
      state: {
        role,
        type,
        difficulty,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#070b16] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-violet-400">
            INTERVIEW SETUP
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Build your mock interview
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            Customize your interview and let PrepAI create a personalized
            practice session.
          </p>
        </div>

        <div className="space-y-6">

          {/* Role */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              1. Choose your role
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map((item) => (
                <button
                  key={item}
                  onClick={() => setRole(item)}
                  className={`rounded-xl border p-4 text-left text-sm transition ${
                    role === item
                      ? "border-violet-400/50 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Interview Type */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              2. Choose interview type
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {interviewTypes.map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`rounded-xl border p-5 text-left transition ${
                    type === item
                      ? "border-violet-400/50 bg-violet-500/10"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <p className="font-medium text-white">
                    {item}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {item === "Technical Interview" &&
                      "Questions focused on your technical skills."}

                    {item === "HR Interview" &&
                      "Practice behavioral and HR questions."}

                    {item === "Mixed Interview" &&
                      "A realistic combination of technical and HR questions."}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Difficulty */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              3. Select difficulty
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {difficulties.map((item) => (
                <button
                  key={item}
                  onClick={() => setDifficulty(item)}
                  className={`rounded-xl border p-4 transition ${
                    difficulty === item
                      ? "border-violet-400/50 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/5"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-3xl border border-violet-400/20 bg-violet-500/5 p-6">
            <p className="text-sm text-gray-500">
              Your interview
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                {role}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                {type}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                {difficulty}
              </span>
            </div>

            <button
              onClick={handleStart}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-violet-500/20 transition hover:scale-[1.01]"
            >
              Start Interview →
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}