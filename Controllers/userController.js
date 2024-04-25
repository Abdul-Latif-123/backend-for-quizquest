// Define logic function

const users = require("../Models/userSchema");

const jwt = require('jsonwebtoken')

// Retrieve a single user by _id
exports.getUserById = async (req, res) => {
    console.log(`Inside getUserById`);
    try {
        // Extract the user id from the request parameters
        const { userID } = req.params;
        // Find the user by id in the database
        const user = await users.findById(userID);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // If the user exists, send it as a JSON response
        res.status(200).json(user);
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response
        res.status(500).json({ message: "Internal server error" });
    }
}

// Register logic function
exports.register = async (req, res) => {
    console.log(`Inside register function`);
    try {
        const { username, email, password, usertype, active } = req.body
        console.log(`${username} ${email} ${password} ${usertype}`);
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(402).json("User already exists")
        }
        else {
            const newUser = new users({
                username, email, password, usertype, active
            })
            await newUser.save() // data saved in mongodb
            res.status(200).json("User created successfully")
        }
    }
    catch (error) {
        res.status(500).json("server error")
    }
}

// Login logic function
exports.login = async (req, res) => {
    console.log(`Inside login function`);
    try {
        const { email, password, usertype } = req.body
        console.log(`${email} ${password} ${usertype}`);
        const user = await users.findOne({ email, password, usertype })
        if (user) {
            const token = jwt.sign({ userId: user._id }, "superkey2024")
            console.log(token);
            res.status(200).json({ user, token })
        }
        else {
            res.status(402).json("User not found")
        }
    }
    catch (error) {
        res.status(500).json("server error")
    }
}

// add user quiz record
exports.addUserQuizRecord = async (req, res) => {
    console.log("Inside addUserQuizRecord");
    const { emailId, quizname, noofquestions, score, maximumscore, correctanswers, wronganswers } = req.body
    const results = {
        quizname: quizname,
        noofquestions: noofquestions,
        score: score,
        maximumscore: maximumscore,
        correctanswers: correctanswers,
        wronganswers: wronganswers
    };
    try {
        const findUserRecords = await users.findOne({ email: emailId })
        findUserRecords.results.push(results);
        await findUserRecords.save();
        res.status(200).json(findUserRecords)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// get all user quiz records
exports.getAllUserQuizRecord = async (req, res) => {
    console.log("Inside getAllUserQuizRecord");
    try {
        const { emailId } = req.body
        console.log(emailId);
        const allUserRecords = await users.findOne({ email: emailId })
        res.status(200).json(allUserRecords)
    }
    catch (err) {
        res.status(401).json("Internal server error " + err.message)
    }
}

// get all users by type
exports.getAllUsersByType = async (req, res) => {
    console.log(`Inside getAllUsersByType`);
    try {
        const { usertype } = req.body
        const user = await users.find({ usertype })
        if (user) {
            const token = jwt.sign({ userId: user._id }, "superkey2024")
            console.log(token);
            res.status(200).json(user)
        }
        else {
            res.status(402).json("Users not found")
        }
    }
    catch (error) {
        res.status(500).json("server error")
    }
}

// update user active status
exports.updateUserActiveStatus = async (req, res) => {
    console.log("Inside updateUserActiveStatus");
    const { emailId, active } = req.body;
    try {
        const updateUser = await users.findOneAndUpdate({ email: emailId }, { active }, { new: true });
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json("Internal server Error" + err.message);
    }
}

// remove user
exports.removeUser = async (req, res) => {
    console.log("Inside removeUser");
    const { emailId } = req.body;
    try {
        const deleteUser = await users.findOneAndDelete({ email: emailId });
        res.status(200).json("User removed successfully");
    } catch (err) {
        res.status(500).json("Internal server error " + err.message);
    }
}

// update user details
exports.updateUserDetails = async (req, res) => {
    console.log("Inside updateUserDetails");
    const { username, password } = req.body
    const { userID } = req.params
    console.log(userID, username, password);
    try {
        const updateUser = await users.findByIdAndUpdate({ _id: userID }, { username, password })
        await updateUser.save()
        res.status(200).json(updateUser)
    }
    catch (err) {
        res.status(401).json("Internal server Error" + err.message)
    }
}