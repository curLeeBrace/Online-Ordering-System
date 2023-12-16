const  AddressSchema = require("../../database/schema/User/AddressSchema") ;
const  UserInfoSchema = require ( "../../database/schema/User/UserInfoSchema");

const updateAddress = async (req, res) => {
    try {
        const {newAddress, username} = req.body;

        const user = await UserInfoSchema.findOne({Uname : username});
        console.log(user);
        if(user){
            await AddressSchema.findByIdAndUpdate(user.AddressID, {
                Municipality : newAddress.Municipality,
                Brgy : newAddress.Brgy,
                Street_N_House : newAddress.Street_N_House

            })

            return res.sendStatus(200);
        }




    } catch (error) {
        console.error(error)
    }


}



module.exports = { updateAddress }