const { User, Thought } = require("../models");
const thoughtController = {
  //Get All available thoughts
  getAllThoughts(req, res) {
    Thought.find({})
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
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: params.username },
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
    Thought.findOne({ _id: params.id }) //check with TA about id
      .populate({ path: "reactions", select: "-__v" }) //What should be the path?
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
    Thought.findOneAndUpdate(
      { _id: req.params.id }, //which id it should be ?
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought id is not valid" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  //DELETE a thought by Id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "Thought id is not valid" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  //POST Create a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } }, //Check if this right,can we use push operator?
      { new: true, runValidators: true }
    )
    .then((thoughtData) => 
       !thoughtData
        ? res
          .status(404)
          .json({ message: "No thought with that id"})
        :res.json(thoughtData,'New reaction is created🎉')
    )
    .catch((err) => res.status(500).json(err));
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
              .json({ message: "No thoughts found with that ID :(" })
          : res.json(thoughtData,'Recation is  successfully removed')
      )
      .catch((err) => res.status(500).json(err));
  },
};

//Export module
module.exports = thoughtController;
