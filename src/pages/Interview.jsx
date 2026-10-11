
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const makeQuestions = (role, type) => {
  const hrQuestions = [
    "Tell me about yourself and why you are interested in this role.",
    "What are your greatest strengths and weaknesses?",
    "Why should we hire you?",
    "Tell me about a challenge you faced and how you solved it.",
    "Where do you see yourself in five years?",
    "How do you handle pressure and deadlines?",
    "Tell me about a time you worked in a team.",
    "What motivates you to learn new skills?",
    "How do you respond to feedback?",
    "Do you have any questions for the interviewer?",
  ];

  const technicalQuestions = [
    `What are the most important skills a ${role} should have?`,
    "Explain a project you have built and the problem it solves.",
    "How do you debug an issue in your application?",
    "Explain the difference between let, const and var in JavaScript.",
    "What is the difference between HTML, CSS and JavaScript?",
    "What are React components and why are they useful?",
    "Explain props and state in React.",
    "What is an API and how do you fetch data from one?",
    "How do you handle errors in an application?",
    "How would you improve the performance of a web application?",
  ];

  if (type === "HR Interview") return hrQuestions;
  if (type === "Technical Interview") return technicalQuestions;

  return [
    hrQuestions[0],
    technicalQuestions[0],
    hrQuestions[2],
    technicalQuestions[1],
    technicalQuestions[3],
    hrQuestions[3],
    technicalQuestions[5],
    hrQuestions[5],
    technicalQuestions[7],
    hrQuestions[9],
  ];
};

export default function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    role = "Frontend Developer",
    type = "Mixed Interview",
    difficulty = "Medium",
  } = location.state || {};

  const questions = makeQuestions(role, type);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const progress = (history.length / questions.length) * 100;

  const handleSubmit = async () => {
    if (!answer.trim() || loading || feedback) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5001/api/evaluate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            answer: answer.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI evaluation failed.");
      }

      if (!data.feedback) {
        throw new Error("AI feedback was not returned by the server.");
      }

      setFeedback(data.feedback);
    } catch (err) {
      console.error("Interview evaluation error:", err);
      setError(
        err.message || "Could not connect to the PrepAI backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!feedback) return;

    const completedAnswer = {
      question,
      answer: answer.trim(),
      feedback,
    };

    const updatedHistory = [...history, completedAnswer];
    setHistory(updatedHistory);

    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setAnswer("");
    setFeedback(null);
    setError("");
  };

  const scores = history
    .map((item) => Number(item.feedback.overallScore))
    .filter(Number.isFinite);

  const averageScore = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;

  const resetInterview = () => {
    setCurrentIndex(0);
    setAnswer("");
    setFeedback(null);
    setHistory([]);
    setLoading(false);
    setError("");
    setFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#070b16] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-violet-400">
              {finished ? "INTERVIEW REPORT" : "LIVE INTERVIEW"}
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              {role} Interview
            </h1>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-400">
              <span className="rounded-full bg-white/5 px-3 py-1">{type}</span>
              <span className="rounded-full bg-white/5 px-3 py-1">{difficulty}</span>
            </div>
          </div>

          {!finished && (
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">
                ● AI Interviewer
              </span>
              <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-gray-400">
                Question {currentIndex + 1} / {questions.length}
              </span>
            </div>
          )}
        </header>

        {finished ? (
          <section className="mt-8 space-y-6">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 sm:p-8">
              <p className="font-semibold text-emerald-300">
                Interview Completed ✓
              </p>
              <h2 className="mt-3 text-3xl font-bold">Your Final Report</h2>
              <p className="mt-2 text-gray-400">
                You completed all {questions.length} questions for {role}.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-gray-400">Average AI score</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-300">
                    {averageScore}<span className="text-base text-gray-500">/100</span>
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-gray-400">Questions completed</p>
                  <p className="mt-2 text-3xl font-bold">{history.length}/10</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-gray-400">Evaluations received</p>
                  <p className="mt-2 text-3xl font-bold">{scores.length}</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-gray-500">
                Average score uses the overall scores returned by the AI for
                completed answers. This report is available for this session.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold">Question-by-question review</h3>
              <div className="mt-5 space-y-4">
                {history.map((item, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h4 className="font-medium">
                        {index + 1}. {item.question}
                      </h4>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
                        {item.feedback.overallScore ?? "—"}/100
                      </span>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-400">
                      {item.answer}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-300">
                      {item.feedback.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={resetInterview}
                className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold"
              >
                Practice Again
              </button>
              <button
                onClick={() => navigate("/")}
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold hover:bg-white/5"
              >
                Back to Home
              </button>
            </div>
          </section>
        ) : (
          <>
            <div className="mt-6 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_290px]">
              <main className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 font-bold">
                    AI
                  </div>
                  <div>
                    <p className="text-sm text-violet-300">AI Interviewer</p>
                    <h2 className="mt-2 text-xl font-semibold leading-8 sm:text-2xl">
                      {question}
                    </h2>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl border border-violet-400/10 bg-violet-500/5 p-5">
                  <p className="font-medium text-violet-300">💡 How to answer</p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Give a clear, relevant answer. Use a real example or
                    project where possible, and explain your reasoning.
                  </p>
                </div>

                <div className="mt-7">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label htmlFor="interview-answer" className="font-medium">
                      Your answer
                    </label>
                    <span className="text-xs text-gray-500">
                      {answer.length} characters
                    </span>
                  </div>

                  <textarea
                    id="interview-answer"
                    value={answer}
                    onChange={(event) => {
                      setAnswer(event.target.value);
                      setError("");
                    }}
                    disabled={Boolean(feedback) || loading}
                    placeholder="Type your answer here..."
                    rows={7}
                    className="w-full resize-y rounded-2xl border border-white/10 bg-black/20 p-5 leading-6 text-white outline-none placeholder:text-gray-600 focus:border-violet-400/50 disabled:opacity-70"
                  />

                  <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <p className="text-xs text-gray-500">
                      Take your time. Quality matters more than speed.
                    </p>
                    {!feedback ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!answer.trim() || loading}
                        className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {loading ? "Evaluating with AI..." : "Submit Answer →"}
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3 font-semibold"
                      >
                        {currentIndex === questions.length - 1
                          ? "Finish Interview →"
                          : "Next Question →"}
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {feedback && (
                  <section className="mt-7 space-y-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
                    <div>
                      <h3 className="font-semibold text-emerald-300">
                        AI Evaluation Complete ✓
                      </h3>
                      <p className="mt-2 leading-7 text-gray-300">
                        {feedback.feedback}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-gray-400">Overall Score</p>
                      <p className="mt-1 text-3xl font-bold text-emerald-300">
                        {feedback.overallScore ?? "—"}
                        <span className="text-base text-gray-500">/100</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Relevance", feedback.relevance],
                        ["Clarity", feedback.clarity],
                        ["Communication", feedback.communication],
                        ["Technical knowledge", feedback.technicalKnowledge],
                      ].map(([label, score]) => (
                        <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <p className="text-xs text-gray-400">{label}</p>
                          <p className="mt-2 text-xl font-semibold">
                            {score ?? "—"}<span className="text-sm text-gray-500">/100</span>
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <h4 className="font-semibold text-emerald-300">Strengths</h4>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-300">
                          {(feedback.strengths || []).map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <h4 className="font-semibold text-amber-300">Areas to improve</h4>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-300">
                          {(feedback.improvements || []).map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {feedback.suggestedAnswer && (
                      <div className="rounded-xl border border-violet-400/20 bg-violet-500/5 p-4">
                        <h4 className="font-semibold text-violet-300">Suggested Answer</h4>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-300">
                          {feedback.suggestedAnswer}
                        </p>
                      </div>
                    )}
                  </section>
                )}
              </main>

              <aside className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="font-semibold">Session Progress</h3>
                  <div className="mt-4 flex justify-between text-sm text-gray-400">
                    <span>Completed</span>
                    <span>{history.length}/{questions.length}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Current question: {currentIndex + 1}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="font-semibold">Live Coaching</h3>
                  <div className="mt-4 space-y-3 text-sm text-gray-400">
                    {[
                      ["Relevance", feedback?.relevance],
                      ["Clarity", feedback?.clarity],
                      ["Communication", feedback?.communication],
                      ["Technical knowledge", feedback?.technicalKnowledge],
                    ].map(([label, score]) => (
                      <div key={label} className="flex justify-between gap-2">
                        <span>{label}</span>
                        <span className={score != null ? "text-emerald-300" : "text-gray-600"}>
                          {score != null ? `${score}/100` : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="font-semibold">Interview reminder</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Don't memorize your answer. Speak naturally, stay relevant,
                    and explain your experience with confidence.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
