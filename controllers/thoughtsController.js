const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                };
                return res.json(thoughtObj);
            });
    },
    // Get single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then(async (thought) => 
                !thought
                ? res.status(404).json({ message: 'Thought not found' })
                : res.json({
                    thought
                })

            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
              });
    },
    // Create new thought
    createThought({params, body}, res) {
        console.log(params)
        Thought.create(body)
          .then(({_id}) => {
              return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
              );
            })
              .then((thought) => {
                  if (!thought){
                      res.status(404).json({message: "No user found with this id"});
                      return;
                  }
                res.json(thought);
            })   
          .catch((err) => res.status(500).json(err));
    },
    // Update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'Thought not found' })
                :res.json({ message: 'Thought successfully updated'})
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Thought not found' })
                    : Thought.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'Thought and reactions deleted!' }))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
    },
    // Add reaction to Thought
    createReaction(req, res) {
        console.log('Add a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $addToSet: {reactions: req.body}},
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({message: 'Thought not found' })
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },
    // Remove reaction from thought
    deleteReaction(req, res) {
        console.log('Delete a reaction');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: { reactionId: req.params.reactionId}}},
            { runValidators: true, new: true },
        )
        .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Thought not found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
};