const router = require("express").Router();
const User = require("../../models/users");

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

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

// create NEW User
router.post("/", (req, res) => {
    User.create(req.body).then((results)=> {
        res.json(results);
    })
});

// // update User
// router.put("/:id", (req, res) => {
//     User.findOne({
//         _id: req.params.id
//     }).then((results)=> {
//         res.json(results);
//     })
// });

// /api/users/:userId
router
    .route('/:userId')
    .put(updateUser)
    // .get(getSingleUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


// delete User
// router.delete("/:id", (req, res) => {
//     User.create(req.body).then((results)=> {
//         res.json(results);
//     })
// });

module.exports = router;


