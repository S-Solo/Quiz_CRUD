const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema ( {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    answers: Array
});

module.exports = mongoose.model('Quiz', QuizSchema);