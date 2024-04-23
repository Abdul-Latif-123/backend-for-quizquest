const quizzes = require('../Models/quizSchema')

exports.addQuiz = async (req, res) => {
    console.log("Inside addQuiz");
    const { title } = req.body
    console.log(title);
    //logic for adding new quiz
    try {
        const newQuiz = new quizzes({
            title
        })
        await newQuiz.save()//save new quiz in mongodb
        res.status(200).json(newQuiz)//response send to client
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//get all quizzes
exports.getAllQuizzes = async (req, res) => {
    console.log("Inside getAllQuizzes");
    try {
        //api call
        const allQuizs = await quizzes.find()
        res.status(200).json(allQuizs) //send all quizzes to frontend
    }
    catch (err) {
        res.status(401).json("Internal server error " + err.message)
    }
}

//get single quiz
exports.getSingleQuiz = async (req, res) => {
    console.log("Inside getSingleQuiz");
    const { qid } = req.params;
    try {
        //api call
        const singleQuiz = await quizzes.findOne({ _id: qid })
        res.status(200).json(singleQuiz) //send quiz to frontend
    }
    catch (err) {
        res.status(401).json("Internal server error " + err.message)
    }
}

//delete quiz
exports.deleteQuiz = async (req, res) => {
    console.log("Inside deleteQuiz");
    const { qid } = req.params;
    console.log("QID : " + qid);
    try {
        const deleteUserQuiz = await quizzes.findByIdAndDelete({ _id: qid })
        res.status(200).json(deleteUserQuiz)
    }
    catch (err) {
        res.status(401).json("Internal server error " + err.message)
    }
}

//update quiz details
exports.updateQuiz = async (req, res) => {
    console.log("Inside updateQuiz");
    const { title } = req.body
    const { qid } = req.params
    try {
        const updateQuiz = await quizzes.findByIdAndUpdate({ _id: qid }, { title })
        await updateQuiz.save()
        res.status(200).json(updateQuiz)
    }
    catch (err) {
        res.status(401).json("Internal server Error" + err.message)
    }
}

//add quiz question
exports.addQuizQuestion = async (req, res) => {
    console.log("Inside addQuizQuestion");
    const { question, option1, option2, option3, option4, answer } = req.body
    const { qid } = req.params
    const questions = {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        answer: answer
    };
    try {
        const findQuiz = await quizzes.findOne({ _id: qid })
        findQuiz.questions.push(questions);
        await findQuiz.save();
        res.status(200).json(findQuiz)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//delete quiz question
exports.removeQuizQuestion = async (req, res) => {
    console.log("Inside removeQuizQuestion");
    const { qid, questionId } = req.params;
    try {
        console.log(qid, questionId);
        const quiz = await quizzes.findById(qid);
        if (!quiz) {
            console.log("No quiz found");
            res.status(404).json({ message: "Quiz not found" });
        }
        else {
            const questionIndex = quiz.questions.findIndex(q => q._id == questionId);
            if (questionIndex === -1) {
                console.log("No question in quiz found");
                res.status(404).json({ message: "Question not found in the quiz" });
            }
            else {
                console.log("Success");
                quiz.questions.splice(questionIndex, 1);
                await quiz.save();
                res.status(200).json(quiz);
            }
        }
    } catch (err) {
        console.log("Fail");
        res.status(401).json("Internal server Error" + err.message)
    }
}

//update quiz question details
exports.updateQuizQuestion = async (req, res) => {
    console.log("Inside updateQuizQuestion");
    const { qid, questionId } = req.params;
    const { question, option1, option2, option3, option4, answer } = req.body;
    try {
        const quiz = await quizzes.findById(qid);
        if (!quiz) {
            console.log("Quiz not found");
            res.status(404).json({ message: "Quiz not found" });
        }
        else {
            const questionIndex = quiz.questions.findIndex(q => (q._id) == (questionId));
            if (questionIndex == -1) {
                console.log("Question not found in the quiz");
                res.status(404).json({ message: "Question not found in the quiz" });
            }
            else {
                console.log("Success");
                console.log("Index : " + questionIndex);
                quiz.questions[questionIndex].question = question;
                quiz.questions[questionIndex].option1 = option1;
                quiz.questions[questionIndex].option2 = option2;
                quiz.questions[questionIndex].option3 = option3;
                quiz.questions[questionIndex].option4 = option4;
                quiz.questions[questionIndex].answer = answer;
                await quiz.save();
                res.status(200).json(quiz);
            }
        }
    } catch (error) {
        console.log("Failed");
        console.error(error);
        res.status(401).json("Internal server Error" + error.message)
    }
}