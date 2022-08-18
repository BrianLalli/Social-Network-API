const {model, Schema} = require ("mongoose");
const reactionSchema = require ("./reactions.js");

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;