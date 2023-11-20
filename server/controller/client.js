const AccountSchema = require("../database/schema/User/AccountSchema");
const UserInfoSchema = require("../database/schema/User/UserInfoSchema");
const {findData} = require('../myBuiltIn_Func/monggoQuery'); // my built in function


////////need to fix later about searching user name need to use lookup aggregation --!! fixed !!
const getUsername = async(req, res) => {
   
    const {email} = req.body.user;
   
    try {
        
        //Filter the resuly by using $match..
        const userInfos = await UserInfoSchema.aggregate([
            {$lookup : { from: 'accounts', localField: 'AccountID', foreignField: '_id', as: 'Account' }},
            {$match : {'Account.Email' : email}}
        
        ])
        .exec();

        res.json({username : userInfos[0].Uname});
       
        
    } catch (error) {
        console.log(error);
    }
    
 
    
}




module.exports = {
    getUsername,
}