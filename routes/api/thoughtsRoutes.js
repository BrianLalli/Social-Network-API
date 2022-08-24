const router = require("express").Router();
const Thought = require("../../models/thoughts");

const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// get ALL route
router.get("/", (req, res) => {
    Thought.find().then((results)=> {
        res.json(results)
    })
});

// get ONE by Id
router.get("/:id", (req, res) => {
   Thought.findOne({
        _id: req.params.id
    }).then((results)=> {
        res.json(results);
    })
});

// create NEW Thought
router.post("/", (req, res) => {
    Thought.create(req.body).then((results)=> {
        res.json(results);
    })
});

// update Thought
// router.put("/:id", (req, res) => {
//     Thought.findOne({
//         _id: req.params.id
//     }).then((results)=> {
//         res.json(results);
//     })
// });

// // /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    // .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// delete Thought
router.delete("/:id", (req, res) => {
    Thought.create(req.body).then((results)=> {
        res.json(results);
    })
});

module.exports = router;


