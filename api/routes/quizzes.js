const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Quiz = require('../models/quiz') ;

//geting all quizzes
router.get('/', (req, res, next) => {
    Quiz.find()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            Error: err.message
        });
    });
});

//getting quiz by id
router.get('/:id', (req,res,next) => {
    Quiz.findById(req.params.id)
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            Error: err.message
        });
    })
});

/* Push a quiz to db
//POST request sample:
{
	"title": "C#",
	"content": "What's the output?...",
	"answers" : ["true", "false", 5]
}
*/
router.post('/', (req, res, next) => {
    const quiz = new Quiz ({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        answers: req.body.answers
    });
    quiz.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling post request from /quizzes",
            createdQuiz: quiz
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({Error: err.message}) ;
    });
});

// Update quiz : Sample (json)
/* 
hostname/quizzes/id
//body
[
  {"propName": "title", "value": "Ruby"}
]
*/
router.patch('/:id', (req, res, next) => {
    const id = req.params.id;
    const updateOps = {} ;
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Quiz.update({_id: id}, {$set : updateOps}).exec()
    .then(result => {
        res.status(200).json({
            updatedData: result
        });
    })
    .catch(err => {
        res.status(500).json({
            Error: err.message
        });
    });
});

// deleting a quiz by id
router.delete('/:id' , (req, res, next) => {
    const id = req.params.id;
    Quiz.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            Error: err.message
        });
    });
});


module.exports = router;