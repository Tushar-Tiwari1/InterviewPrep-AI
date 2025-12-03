const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate interview questions
// POST /api/ai/generate-questions
// Access: Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    // Validate request
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response.text;

    let questions = [];
    try {
      const cleanedText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();

      const data = JSON.parse(cleanedText);

      if (Array.isArray(data)) {
        questions = data.map(q => ({
          question: q.question || "",
          answer: q.answer || "",
        }));
      }
    } catch (err) {
      console.error("Failed to parse AI response:", err);
      questions = [];
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("GENERATE QUESTIONS ERROR:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
      questions: [],
    });
  }
};

// Generate explanation for a question
// POST /api/ai/generate-explanation
// Access: Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response.text;

    let explanation = "";
    try {
      const cleanedText = rawText
        .replace(/^```json\s*/, "")
        .replace(/```$/, "")
        .trim();

      const data = JSON.parse(cleanedText);
      explanation = data.explanation || rawText || "";
    } catch (err) {
      console.error("Failed to parse AI explanation:", err);
      explanation = rawText || "";
    }

    res.status(200).json({ explanation });
  } catch (error) {
    console.error("GENERATE EXPLANATION ERROR:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
      explanation: "",
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
