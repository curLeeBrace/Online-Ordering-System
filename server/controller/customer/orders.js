const axios = require("axios");
const UserInfoSchema = require("../../database/schema/User/UserInfoSchema");
const OrdersSchema = require("../../database/schema/User/OrdersSchema");
const { gcashConfig } = require("../gcash/gcashConfig");



//=========================================ORDER CONTROLER=============================================================================//
const gcash_webhook = async(req, res) => {
    const {checkout_url} = req.body.data.attributes.data.attributes;
    const {email} = req.body.data.attributes.data.attributes.billing;
    // console.log(req.body.data);
    //console.log("Email : ", email);
    //console.log("COurl : ", checkout_url);
    let orderID = null;
    let COurls = null;
    let index = 0;
    try {
    
    const customerData = await UserInfoSchema.aggregate([
    {$lookup : {from : 'orders', localField : 'OrderID', foreignField : '_id', as : 'Orders'}},
    {$lookup : {from : 'accounts', localField : 'AccountID', foreignField : '_id', as : 'Account'}},
    {$match: { "Account.Email": email } }
 
    ]).exec();
    // console.log("Customer Data : ", customerData[0]);
    orderID = customerData[0].OrderID;
    COurls = customerData[0].Orders[0].COurl;

    // I will compare checkout_url and COurl and if it not equal increase the index by 1
    COurls.forEach(COurl => {
        if(COurl !== checkout_url) {
            index++;
        } else {
            return;
        }
    });

    await OrdersSchema.findByIdAndUpdate(orderID,{$set : {[`Paid.${index}`]: true}});

    return res.sendStatus(200);

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
   
    
}


const saveOrder_toDB = async (body, customerData) => {
   
    let checkout_url = body.COurl;
    // console.log("Checkout URL : ", checkout_url);
    const {
        MTname,
        Size,
        Price,
        AddsOn,
        Qty,
        Img,
        Total,
        MOD,
        Paid,
        Status,
        Date,
      } = body;
    if (customerData[0].OrderID == undefined || customerData[0].OrderID == null) {
            
        const placeOrder = await OrdersSchema.create(body);
        //console.log(placeOrder);
        
        await UserInfoSchema.updateOne(
          { AccountID: customerData[0].AccountID },
          { OrderID: placeOrder._id }
        );
      } else {
        //add order or update the array of order in database if customer already had order history
        //push ther value to array..
        
        await OrdersSchema.findByIdAndUpdate(customerData[0].OrderID, {
          $push: {
            MTname: MTname,
            Size: Size,
            Price: Price,
            AddsOn: AddsOn,
            Qty: Qty,
            Img: Img,
            Total: Total,
            MOD: MOD,
            Paid: Paid,
            Status: Status,
            COurl : checkout_url || null,
            Date: Date,
          },
        });
      }
}


const placeOrder = async (req, res) => {
  const { user: customer_auth } = req.body; // contains email and pasword
  const { email } = customer_auth;
 

  const customerData = await UserInfoSchema.aggregate([
    {
      $lookup: {
        from: "addresses",
        localField: "AddressID",
        foreignField: "_id",
        as: "Address",
      },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "AccountID",
        foreignField: "_id",
        as: "Account",
      },
    },
    {
      $lookup: {
        from: "orders",
        localField: "OrderID",
        foreignField: "_id",
        as: "Orders",
      },
    },
    { $match: { "Account.Email": email } },
  ]).exec();

  let address = {
    brgy: customerData[0].Address[0].Brgy,
    street: customerData[0].Address[0].Street_N_House,
    city: customerData[0].Address[0].Municipality,
  };

  let customer = {
    name: customerData[0].Fname + " " + customerData[0].Lname,
    email: customerData[0].Account[0].Email,
    phone: customerData[0].Pnumber,
  };

  const {MTname,Total,Qty,Img, MOD} = req.body; // destruct the post request and get the data that inside bracket
  let order = {
    amount: Number(Total / Qty),
    name: MTname,
    quantity: Number(Qty),
    img: Img,
  };
  // console.log(typeof(Qty));
 // console.log("Date - ", Date);

  const options = gcashConfig(address, order, customer);
  try {
    if (MOD === "gcash") {
      // res.json(options);
      axios
        .request(options)
        .then(async function (response) { 
           const {checkout_url} = response.data.data.attributes;
           //console.log(checkout_url);
           req.body['COurl'] = checkout_url; // add checkout attributes to req.body
           saveOrder_toDB(req.body, customerData);

           return res.json({checkout_url, MOD});
        })  
        .catch(function (error) {
          console.error(error.message);
          return res.sendStatus(500);
        });
    } else { // MOD is COD -----> :)) 
        saveOrder_toDB(req.body, customerData);
        return res.json({MOD});r
    }

  } catch (error) {
    console.log(error);
  }

  
};
//=========================================ORDER CONTROLER=============================================================================//






module.exports = {
  placeOrder,
  gcash_webhook,
};
