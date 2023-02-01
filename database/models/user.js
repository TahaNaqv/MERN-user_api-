const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            unique: true,
            type: String,
        },
        password: {
            required: true,
            // unique: true,
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 11)
    next()
})

userSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update.password)
        this._update.password = await bcrypt.hash(this._update.password, 11)
    next()
})

module.exports = mongoose.model("User", userSchema)
