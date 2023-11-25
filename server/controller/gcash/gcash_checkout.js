let address = {
    brgy : "",
    street : "",
    municipality : ""
}

let customer = {
    name : "",
    email: "",
    phone : ""

}

let product = {
    ammount : 0,
    image : "",
    name : "",
    quantity : 0,
  

}

const options = {
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
        cancel_url: 'string',
        billing: {
          address: {
            line1: `${address.brgy}`,
            line2: `${address.street}`,
            city: `${address.municipality}`,
            state: 'Laguna',
            country: 'PH'
          },
          name: `${customer.name}`,
          email: `${customer.email}`,
          phone: `${customer.phone}`,
        },
        description: 'Fortea Milktea',
        line_items: [
          {
            amount: `${product.ammount}`,
            currency: 'PHP',
            description: 'Fortea Milktea',
            images: [`${product.image}`],
            name: `${product.name}`,
            quantity: `${product.quantity}`
          }
        ],
        payment_method_types: ['gcash'],
        reference_number: 'string',
        send_email_receipt: false,
        show_description: true,
        show_line_items: true,
        success_url: 'string',
        statement_descriptor: 'string'
      }
    }
  }
};


module.exports = {address, customer, product, options}

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });