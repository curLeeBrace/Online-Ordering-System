const numberPattern = /^\d*$/;
const email_pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; 

const isNum = (state, value) => {
    if (numberPattern.test(value)) {
        state(value);
      } else {
        alert("Invalid Input!");
      }
}


const confirmEmail = (email, func) => {

    if(email.match(email_pattern)){
        return func();
    } 
    else {
        alert("Not Valid")
    }
}




module.exports = {
    isNum,
    confirmEmail,
}