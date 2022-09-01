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

// THOUGHTS ROUTES:

// GET all thoughts: /api/thoughts
// GET thought by ID: /api/thoughts/:id
// POST (create) a thought: /api/thoughts>>pass thoughtText and username
// PUT (update) thought by ID: /api/thoughts/:id
// DELETE thought by ID: api/thoughts/:id

// REACTIONS ROUTES:

// POST (create) a single reaction to thought by ID: /api/thoughts/:thoughtId/reactions
// DELETE a reaction by ID from thought by ID: /api/thoughts/:thoughtId/reactions/:reactionId