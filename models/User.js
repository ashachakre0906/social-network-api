//Required schema and model from mongoose
const { Schema, model} = require('mongoose');
//Construct a new instance of the schema class
const usersSchema = new Schema (
{
    username:{
        type: String,
        unique: true,
        required: [true, 'Please provide your username!'],
        trim: true,
    },
    email: {
        type: String,
        Required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        required: [true, 'Email address is required'],
        validate: [validateEmail,'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought',

    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    },  
    {
        toJSON: {
            getters: true,

        },
        id: false,
    }
);
//Created a virtual called friendCount that retrieves length of the user's friends array field on query
usersSchema.virtual('friendCount').get(function(){
    return this.friends.length;

});
//Created a Users model using the Users Schema and Initialize our User model
const User = model ('user',usersSchema);
module.exports = User;