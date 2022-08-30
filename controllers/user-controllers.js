const {User} = require('../models');
const Thoughts = require('../models/Thought');

//Setting up User controller
//creating a new user
const userController = {

    //Creating a new user
    createUser(req ,res) {
        User.create(req.body)
        .then ((userData) => res.json(userData, 'New User created 🎉'))
        .catch(err => res.status(500).json(err));
    },

    //Get All Users
    getAllUsers(req,res) {
        User.find({})
        //populate user thoughts
        .populate({
        path: 'thoughts',
        select: ('-__v'),
    })
    .select('-__v')
    .then((userData) => res.json(userData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
    },
    //Get user by ID with thoughts and friends
    getSingleUserById({ params }, res) {
        User.findOne({_id: params.userId})
        .populate({path: 'thoughts',select: '-__v'})
        .populate({ path: 'friends', select: '-__v'})
        .select('-__v')
        .then((userData) => {
            if(!userData){
                res.status(404).json({ message: 'No users found with this id'});
                return;
            }
            res.json(userData)

        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)

        })
        
    },

    //update a user
    updateUser(req ,res) {
        User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {new: true ,runValidators: true},
        )
        .then((userData) => 
            !userData
            ? res.staus(404).json({ message: 'No user with this ID'})
            : res.json(user)
        )
        .catch(err => res.status(500).json(err));
    },
    
    //Delete a User
    deleteUser(req , res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((userData) => 
            !userData
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json(userData)

        )
        .catch((err) => res.status(500).json(err));

    },

     //Deletes user's associated thoughts when the user is deleted
    deleteUserAssociatedThoughts(req , res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((userData) =>
        !userData
        ? res.status(404).json({ message: 'No user with that ID'})
        : Thoughts.deleteMany({ _id: { $in: userData.thoughts}})
        )

     },

    // Post route to Add a friend
    addAFriend(req , res){
        User.findOneAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { responses: req.body}},
            { runValidators: true, new: true},
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({ message: 'No user with that Id'})
        : res.json(userData)

        )
        .catch((err) => res.status(500).json(err))

    },

    // Delete a friend
    removeFriend(req, res){
        User.findOneAndDelete(
            { _id: req.params.userId},
            { $pull: {friends: { friendId: req.params.friendId} } },
            { runValidators: true, new: true},
        )
        .then((userData) => res.json(userData))
        .catch(err => res.json(err));

    }

}
module.exports = userController;
