const User = require("../database/models/user")

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.send(user)
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        if (!data) {
            return res.send("User not found!")
        }
        res.send(data)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const options = { new: false }
        const data = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            options
        )
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id)
        res.send({ Deleted: data })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
