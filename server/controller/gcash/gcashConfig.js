const uuid = require('uuid');

const gcashConfig = (address, order, customer) => {
    //address  - 3
    //order - 3
    //customer - 3


    const BASE_URI = process.env.FRONT_END_URI ? process.env.FRONT_END_URI : "http://localhost:3000"

    let options = {
      method: 'POST',
      url: 'https://api.paymongo.com/v1/checkout_sessions',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9SclhFZHJGTVdVN0JxV1ZRdG96cjZvZlE6'
      },
      data: {
        data: {
          attributes: { 
            billing: {
              address: {
                line1: address.brgy,
                line2: address.street,
                city:  address.city,
                state: 'Laguna',
              //  postal_code: '4000',
                country: 'PH'
              },
              name: customer.name,
              email: customer.email,
              phone: customer.phone
            },
            send_email_receipt: false,
            show_description: true,
            show_line_items: true,
            cancel_url: `${BASE_URI}/menu`,
            description: order.name,
            line_items: [
              {
                amount: parseInt(order.amount + "00"),
                currency: 'PHP',
                description: order.name + ' MilkTea',
                images: [`${BASE_URI}/img/products/milktea/${order.img}`],
                name: order.name,
                quantity: order.quantity
              }
            ],
            payment_method_types: ['gcash'],
            reference_number: uuid.v4(),
            success_url: `${BASE_URI}/orders`,
            statement_descriptor: 'string'
          }
        }
      }
    }; 

 return options
    

};

module.exports = { gcashConfig };