const { User, Model, Thought} = require('../models');
const thoughtController = {
    //Get All thoughts
    getAllThoughts(req, res) {

    },
    //POST Create a thought
    createThought(req , res) {

    },
    //GET single thought by its Id
    getThoughtById(req, res){

    },
    
    //PUT update a thought
    updateThought(req , res){

    },

    
    //DELETE a thought by Id
    deleteThought(req, res){

    },
     //POST Create a reaction
     addReaction(req , res){

     },

     //DELETE  a reaction
     removeReaction(req , res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: { reactions: { reactionId:req.params.reactionId}}},
            { runValidators: true, new: true},

        )
         .then((thoughtData) => 
            !thoughtData
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :('})
            : res.json(thoughtData)
        )
        .catch((err) => res.status(500).json(err));


     }
}



//Export module
module.exports = thoughtController;