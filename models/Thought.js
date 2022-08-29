const {Schema, model} = require ('mongoose');
const reactionsSchema = require('./Reaction');
const moment = require('moment');
// Schema to create Thought model

const thoughtsSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //from Moment
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }

);
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;

});
// create the Thoughts model using the Thoughts Schema
const Thoughts = model('thoughts',thoughtsSchema );
//Exporting Thoughts module
module.exports = Thoughts;

