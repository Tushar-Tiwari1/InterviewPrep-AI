const Session = require("../models/Session");
const Question = require("../models/Question");

// Create session
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, question } = req.body;
    const userId = req.user._id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // Create questions
    const questionDocs = await Promise.all(
      question.map(async (q) => {
        const questionDoc = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return questionDoc._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("CREATE SESSION ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all sessions for logged-in user
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    console.log("Fetched sessions:", sessions);
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error("GET MY SESSIONS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      });

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("GET SESSION BY ID ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this session" });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("DELETE SESSION ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
