const path = require('path');
const accountSchema = require('../database/schema/AccountSchema');


const getAlluser = async (req, res) => {
    try {
        const users = await accountSchema.find({});
        res.status(200).json({users});

    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const createtUserData = await accountSchema.create(req.body);
        console.log(createtUserData);
        res.json({sucsess : true, newUserData : req.body})
        

        
    } catch (error) {
        res.status(500).json({msg:error})
        console.log(error);
    }

}

module.exports = {
    createUser,
    getAlluser
}