const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                };
                return res.json(userObj);
            });
    },
    // Get single user
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then(async (user) => 
                !user
                ? res.status(404).json({ message: 'User not found' })
                : res.json({
                    user
                })

            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
              });
    },
    // Create new user
    createUser(req,res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
    },
    // Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'User not found' })
                :res.json({ message: 'User successfully updated'})
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
    },
    // Delete user
    deleteUser(req, res) {
        User.findOneAndRemove({_id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'User not found' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
    },
    // Add friend to User
    addFriend(req, res) {
        console.log('Add friend');
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            { runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res
                .status(404)
                .json({message: 'User not found' })
                : res.json(user)
                )
                .catch((err) => res.status(500).json(err));
    },
    // Remove friend from a user
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: {friends: req.params.friendId}},
            { runValidators: true, new: true },
        )
        .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'User not found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
};