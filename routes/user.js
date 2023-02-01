const express = require("express")
const router = express.Router()

const User = require("../database/models/user")
const userController = require("../controllers/userController")

router.post("/", userController.createUser)

router.get("/", userController.getAllUsers)

router.get("/login", userController.login)

router.get("/:id", userController.getUser)

router.patch("/:id", userController.updateUser)

router.delete("/:id", userController.deleteUser)

module.exports = router
