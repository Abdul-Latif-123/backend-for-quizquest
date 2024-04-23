const mongoose = require('mongoose')

//schema creation
const resultsSchema = new mongoose.Schema({
    quizname: {
        type: String,
        required: true
    },
    noofquestions: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    maximumscore: {
        type: String,
        required: true
    },
    correctanswers: {
        type: String,
        required: true
    },
    wronganswers: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true
    },
    results: [resultsSchema]
})

//model creation - users (mongodb collection)
const users = mongoose.model('users', userSchema)

module.exports = users