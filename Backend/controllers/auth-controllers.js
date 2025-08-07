//In an Express.js application, a controller refers to a part of your code that is responsible for handling the application's logic.
//Controllers are typically used to process incoming requests, interacts with models (data sources), and send reponses back to client's
//They help organize your applications by seperating concerns and following the MVC design pattern.

//async is used to catch the errors.

const User = require("../models/user_model");
const home = async (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        console.log(error);
    }

};


// --------------------------
//      Register logic
// --------------------------

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email })
        
        if (userExist) {
            return res.status(400).json({ msg: "email already exist" });
        }

        const userData = await User.create({ username, email, phone, password });
        res.status(200).json({ msg: "Registration Successful!", token: await userData.generateToken(), userID: userData._id.toString() });

    } catch (error) {
        // res.status(400).send({ msg: "Page not found" });
        next(error);
    }
};


// ------------------------
//       Login logic
// ------------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }

        const isPassword = await userExist.comparePassword(password);

        if (isPassword) {
            res.status(200).json({ msg: "Login Successful!", token: await userExist.generateToken(), userID: userExist._id.toString() });
        }
        else{
            res.status(400).json({msg:"Invalid Email or Password"});
        }

    } catch (error) {
        // res.status(500).json("Internal Server Error",error);
        next(error);
    }

}

module.exports = { home, register, login };