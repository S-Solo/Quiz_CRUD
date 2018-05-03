const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Quiz = require('../models/quiz');

//geting all quizzes
router.get('/', async (req, res, next) => {
    try {
        const result = await Quiz.find();
        return await res.status(200).json(result);
    } catch (error) {
        return await res.status(500).json({
            Error: error.message
        });
    }
});

//getting quiz by id
router.get('/:id', async (req, res, next) => {
    try {
        const result = await Quiz.findById(req.params.id);
        return await res.status(200).json(result);
    } catch (error) {
        return await res.status(500).json({
            Error: error.message
        });
    }
});

/* Push a quiz to db
//POST request sample:
{
	"title": "C#",
	"content": "What's the output?...",
	"answers" : ["true", "false", 5]
}
*/
router.post('/', async (req, res, next) => {

    const quiz = await new Quiz({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        answers: req.body.answers
    });

    try {
        const result = await quiz.save();
        console.log(result);
        return await res.status(201).json({
            message: "Handling post request from /quizzes",
            createdQuiz: quiz
        });
    } catch (error) {
        console.log(error);
        return await res.status(500).json({ Error: error.message });
    }
});

// Update quiz : Sample (json)
/* 
hostname/quizzes/id
//body
[
  {"propName": "title", "value": "Ruby"}
]
*/
router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    try {
        const result = await Quiz.update({ _id: id }, { $set: updateOps }).exec();
        return await res.status(200).json({
            updatedData: result
        });
    } catch (error) {
        return await res.status(500).json({
            Error: error.message
        });
    }
});

// deleting a quiz by id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await Quiz.remove({
            _id: id
        }).exec();
        return await res.status(200).json(result);
    } catch (error) {
        return await res.status(500).json({
            Error: error.message
        });
    }
});


module.exports = router;