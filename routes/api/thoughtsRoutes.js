const router = require("express").Router();
const Thought = require("../../models/thoughts");

// get ALL route
router.get("/", (req, res) => {
    User.find().then((results)=> {
        res.json(results)
    })
});

// get ONE by Id
router.get("/:id", (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then((results)=> {
        res.json(results);
    })
});

// create NEW Thought
router.post("/", (req, res) => {
    User.create(req.body).then((results)=> {
        res.json(results);
    })
});

// update Thought
router.put("/:id", (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then((results)=> {
        res.json(results);
    })
});

// delete Thought
router.delete("/:id", (req, res) => {
    User.create(req.body).then((results)=> {
        res.json(results);
    })
});

module.exports = router;


// const router = require('express').Router();
// // const Thought = require("../../models/thoughts");
// const{
//     getThoughts,
//     getSingleThought,
//     createThought,
//     updateThought,
//     deleteThought,
//     createReaction,
//     deleteReaction
// } = require('../../controllers/thoughtController');

// // /api/thoughts
// router
//     .route('/')
//     .get(getThoughts)
//     .post(createThought);

// // /api/thoughts/:thoughtId
// router
//     .route('/:thoughtId')
//     .get(getSingleThought)
//     .put(updateThought)
//     .delete(deleteThought)
 

// // /api/thoughts/:thoughtId/reactions
// router
//     .route('/:thoughtId/reactions')
//     .post(createReaction)

// router
//     .route('/:thoughtId/reactions/:reactionId')
//     .delete(deleteReaction);

// module.exports = router;