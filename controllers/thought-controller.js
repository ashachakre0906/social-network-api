const { User, Model, Thought } = require("../models");
const Thoughts = require("../models/Thought");
const thoughtController = {
  //Get All available thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtsData) => res.json(thoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //POST Create a thought
  createThought({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought id is not valid" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  //GET single thought by its Id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought id is not valid" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  //PUT update a thought
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
        {_id: req.params._id},
        {$set: req.body},
        {new: true, runValidators: true})
        .populate({ path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((thoughtData) => {
            if(!thoughtData){
                res.status(404).json({ message: 'Thought id is not valid'});
                return;

            }
            res.json(thoughtData);
        })
    .catch(err => res.json(err));

  },

  //DELETE a thought by Id
  deleteThought(req, res) {

  },
  //POST Create a reaction
  addReaction(req, res) {

  },

  //DELETE  a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

//Export module
module.exports = thoughtController;
