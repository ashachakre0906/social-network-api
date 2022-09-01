//Required schema and model from mongoose
const { Schema, model} = require('mongoose');
//Construct a new instance of the schema class
const UsersSchema = new Schema (
{
    username:{
        type: String,
        unique: true,
        required: 'Please provide your username!',
        trim: true,
    },
    email: {
        type: String,
        required: 'Please provide your email',
        unique: true,
        // lowercase: true,
        //use REGEX to validate correct email
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    },  
    {
        toJSON: {
            getters: true,
            virtuals: true,

        },
        id: false,
    }
);
//Created a virtual called friendCount that retrieves length of the user's friends array field on query
UsersSchema.virtual('friendCount').get(function(){
    return this.friends.length;

});
//Created a Users model using the Users Schema and Initialize our User model
const User = model ('User',UsersSchema);
module.exports = User;