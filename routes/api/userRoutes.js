const router = require('express').Router();
const {
createUser,
getAllUsers,
getSingleUserById,
updateUser,
deleteUser,
deleteUserAssociatedThoughts,
addFriend,
removeFriend

} = require ('../../controllers/user-controllers');

//get and post route for users
router.route('/')
      .get(getAllUsers)
      .post(createUser);

//get by id, put and delete routes for users
router.route('/:id')
      .get(getSingleUserById)
      .put(updateUser)
      .delete(deleteUser)
      .delete(deleteUserAssociatedThoughts)

// add and delete friends
router.route('/:id/friends/:friendId')
      .post(addFriend)
      .delete(removeFriend)

module.exports = router;

// USER ROUTES:

// GET all users: /api/users
// GET user by ID: /api/users/:id
// POST (create) an user: /api/users
// PUT (update) user by ID: /api/users/:id
// DELETE user by ID: /api/users/:id

// FRIENDS ROUTES:

// POST (create) a friend by ID: /api/users/:userId/friends/:friendId
// DELETE a friend by ID: /api/users/:userId/friends/:friendId