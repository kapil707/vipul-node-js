const express = require("express");
const {handleGetAllUsers,handleGetUserById,handleGetUserByIdAndUpdate,handleGetUserByIdAndDelete,handleInsertUsers} = require("../controllers/user"); 
const router = express.Router();

router.route("/").
    get(handleGetAllUsers)
    .post(handleInsertUsers);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleGetUserByIdAndUpdate)
    .delete(handleGetUserByIdAndDelete);

module.exports = router;