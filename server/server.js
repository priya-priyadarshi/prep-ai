const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "PrepAI backend is running!",
  });
});

app.post("/api/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (
      typeof question !== "string" ||
      typeof answer !== "string" ||
      !question.trim() ||
      !answer.trim()
    ) {
      return res.status(400).json({
        error: "Please provide both the interview question and your answer.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured in the server .env file.",
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are PrepAI, a supportive technical interview coach.

Evaluate this candidate's interview answer.

Question: ${question}

Candidate's answer: ${answer}

Return ONLY valid JSON with this structure:
{
  "relevance": 0,
  "clarity": 0,
  "communication": 0,
  "technicalKnowledge": 0,
  "overallScore": 0,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "suggestedAnswer": "A concise improved example answer",
  "feedback": "A short, encouraging summary"
}

Scores must be integers from 0 to 100.
Be fair, specific, constructive, and do not invent experience
or skills that the candidate did not mention.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const feedback = JSON.parse(responseText);

    res.json({
      status: "success",
      feedback,
    });
  } catch (error) {
    console.error("Interview evaluation error:", error);

    res.status(500).json({
      error: "AI evaluation failed. Please check the server and Gemini API configuration.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`PrepAI backend running at http://localhost:${PORT}`);
});