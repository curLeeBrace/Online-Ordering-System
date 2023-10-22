const AccountSchema = require('../database/schema/AccountSchema');

const createAccount = async (req, res) => {
    try {
    //    const createAccount  = AccountSchema.create(req.body);
    //    console.log(createAccount);
       console.log(req.body);
       res.status(200).json({succes : true});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports = {
    createAccount
}
