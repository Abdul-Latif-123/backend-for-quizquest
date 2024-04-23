const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [questionSchema]
});

const quizzes = mongoose.model("quizzes", quizSchema)
module.exports = quizzes