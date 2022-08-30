const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction

} = require('../../controllers/thought-controller');

//get and post routes for thoughts
router.route('/')
      .get(getAllThoughts)
      .post(createThought);

//get by id, put and delete routes for thoughts
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//add reaction
router.route('/:thoughtId/reactions')
      .post(addReaction)

//remove a reaction
router.route('/:thoughtId/reactions/:reactionId')
      .delete(removeReaction);
      
module.exports = router;