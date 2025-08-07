const mangoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mangoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//secure the password with the bcrypt
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_Password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_Password;

    } catch (error) {
        next(error);
    }
});

//json web token and using methods we can create many funtions and can be use it in controllers
userSchema.methods.generateToken = async function () {
    const JWT_SECRET_KEY = "HELLOMYNAMEISANKITRAMJIGUPTA";
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            })
    } catch (error) {
        console.log(error);
    }
};

//Comparing user password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password,this.password);
};


//define the model name or collection name
const User = new mangoose.model("User", userSchema);
module.exports = User;
