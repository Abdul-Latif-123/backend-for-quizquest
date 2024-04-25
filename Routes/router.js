const express = require('express')
const userController = require(`../Controllers/userController`)
const quizController = require(`../Controllers/quizController`)
// const jwtMiddleware = require('../Middlewares/jwtMiddleware')
// const multerConfig = require('../Middlewares/multerMiddleware')

// create router object of express to define paths
const router = new express.Router()

// get single user - https://localhost:4000/get-user/qid
router.get('/user/:userID', userController.getUserById);

// register API path
router.post('/register', userController.register)

// login API path
router.post('/login', userController.login)

// add user quiz record API path - https://localhost:4000/add-user-record
router.post('/add-user-record', userController.addUserQuizRecord)

// get all user quiz records API path - https://localhost:4000/get-all-user-record
router.post('/get-all-user-record', userController.getAllUserQuizRecord)

// get all users by type API path - https://localhost:4000/get-all-users-by-type
router.post('/get-all-users-by-type', userController.getAllUsersByType)

// update user active status API path - https://localhost:4000/toggle-user-active
router.put('/toggle-user-active', userController.updateUserActiveStatus);

// remove user API path - https://localhost:4000/remove-user
router.delete('/remove-user', userController.removeUser);

// add quiz API path - https://localhost:4000/quiz/add
router.post('/quiz/add', quizController.addQuiz)

// get all quizzes - https://localhost:4000/quiz/all-quiz
router.get('/quiz/all-quiz', quizController.getAllQuizzes)

// get single quiz - https://localhost:4000/quiz/single-quiz/qid
router.get('/quiz/single-quiz/:qid', quizController.getSingleQuiz)

// delete quiz - https://localhost:4000/quiz/delete-quiz/qid
router.delete('/quiz/delete-quiz/:qid',quizController.deleteQuiz)

// update quiz - https://localhost:4000/quiz/update-quiz/qid
router.put('/quiz/update-quiz/:qid', quizController.updateQuiz)

// add quiz question API path - https://localhost:4000/quiz/add-question/qid
router.post('/quiz/add-question/:qid', quizController.addQuizQuestion)

// delete quiz question - https://localhost:4000/quiz/delete-quiz-question/qid/questionId
router.delete('/quiz/delete-quiz-question/:qid/:questionId',quizController.removeQuizQuestion)

// update quiz question - https://localhost:4000/quiz/update-quiz-question/qid/questionId
router.put('/quiz/update-quiz-question/:qid/:questionId', quizController.updateQuizQuestion)

// update user details - https://localhost:4000/update-user/qid
router.put('/update-user/:userID', userController.updateUserDetails)

module.exports = router 