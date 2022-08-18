const router = require("express").Router();
const User = require("../../models/users");

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

// create new User
router.post("/", (req, res) => {
    User.create(req.body).then((results)=> {
        res.json(results);
    })
});

// router.put();
// router.delete();

module.exports = router;