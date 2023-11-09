const AccountSchema = require("../database/schema/AccountSchema");
const {findData} = require('../myBuiltIn_Func/monggoQuery'); // my built in function


const getUsername = async(req, res) => {
   
    const {email, password} = req.body.user;
    const option = {
        $and : [{Email : email}, {Password : password}]
      }
    try {

        findData(AccountSchema, option)
        .then(data => {
            return res.json({username : data.Uname});
        })
        .catch(err => {console.log(err)})
          


    } catch (error) {
        console.log(error)
    }
   
    
}




module.exports = {
    getUsername,
}