const {createUser, getUser, getUserById, updateUser, deleteUser} = require("../controllers/crud.controller")
const express = require("express")
const router = express.Router()

router.post("/users", createUser);
router.get("/users", getUser);
router.post("/user/:id", updateUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUser);

module.exports = router;