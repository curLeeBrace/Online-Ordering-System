const nodemailer = require('nodemailer');
require('dotenv').config();

const verifyEmail = async (email, code) => {
    try {
        // let poolConfig = "smtps://username:password@smtp.example.com/?pool=true";
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port : 465,
            secure : true,
            auth : {
                user : process.env.EMAIL,
                pass : process.env.PASS,
            },
            tls : {
                rejectUnauthorized : true
            }
        });

        //send email
        let info = await transporter.sendMail({
            from : process.env.EMAIL,
            to : email,
            subject : "Account Verification",
            text : "Welcome",
            html : `
            <div>Youre Code is : ${code}</div>
            `
        })
        console.log("mail sucessfully")
    } catch (error) {
        console.log(error, "mail failed to send")
    }
}

module.exports = verifyEmail;