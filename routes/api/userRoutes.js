const router = require('express').Router();

const {
createUser,
getAllUsers,
getSingleUserById,
updateUser,
deleteUser,
deleteUserAssociatedThoughts,
addAFriend,
removeFriend

} = require ('../../controllers/user-controllers');

module.exports = router;