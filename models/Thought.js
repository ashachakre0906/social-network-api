const {Schema, model, Types} = require ('mongoose');
const moment = require('moment');

//reaction's schema
const ReactionsSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),

        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (formatDate) => moment(formatDate).format('MMM DD, YYYY [at] hh:mm a'),

        },

}, {
     toJSON: {
        getters: true,

     },
},
   
);
// Schema to create Thought model

const ThoughtsSchema = new Schema(
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
        get: (formatDate) => moment(formatDate).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionsSchema],
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

ThoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;

});
// create the Thoughts model using the Thoughts Schema
const Thoughts = model('Thought',ThoughtsSchema );
//Exporting Thoughts module
module.exports = Thoughts;

