const User = require("../models/user-model");

const getAllUsers = async (req, res) => {

    try {

        const userData = await User.find().select({password: 0});

        if(!userData || userData.length === 0){
            return res.status(404).json({msg: "No user found"});
        }

        res.status(200).json(userData)

    } catch (error) {

        next(error);
        
    }

}


const deleteUser = async ( req, res) => {

    try {
        const id = req.params.id;
        const deleteUser = await User.deleteOne({_id: id});
        if(deleteUser){
            res.status(200).json({msg:"User Deleted Successfully!!"});
        }

    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, deleteUser};