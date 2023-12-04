const UserInfoSchema = require('../../database/schema/User/UserInfoSchema');
const AccountSchema = require('../../database/schema/User/AccountSchema');
const AddresScchema = require('../../database/schema/User/AddressSchema');
const getRaidersInfo = async (req, res) => {

    try {
        const raiderData = await UserInfoSchema.aggregate([
            {$lookup : {from : 'accounts', localField : 'AccountID', foreignField : '_id', as : 'Account'}},
            {$match: {'Account.Type' : 'raider'}},
            {$unwind: '$Account'},
          ]).exec();

          res.json(raiderData);
          
    } catch (error) {
        console.error(error);
    }

}

const deleteRaiderInfo = async(req, res) => {
    try {

        console.log("ids", req.body);
        const {user_id, acc_id, addr_id} = req.body;
        await UserInfoSchema.findByIdAndDelete(user_id);  
        await AccountSchema.findByIdAndDelete(acc_id);
        await AddresScchema.findByIdAndDelete(addr_id);
        
        return res.sendStatus(200);

    } catch (error) {
        console.error(error);
    }
}

module.exports = {getRaidersInfo, deleteRaiderInfo}