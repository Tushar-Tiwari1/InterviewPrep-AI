const express = require('express');
const { togglePinQuestion, updateQuestionNote, addQuestionToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addQuestionToSession); // <-- fixed name
router.post('/:id/pin', protect, togglePinQuestion);
router.post('/:id/note', protect, updateQuestionNote);

module.exports = router;
