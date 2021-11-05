const app = require('express')()
require('dotenv').config();


const port = process.env.PORT || 3020
const  nodemailer = require('nodemailer');


app.get('/sendmail, (req, res) =>{
   
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "a4d97faebd0f42",
            pass: "0cd4380880256a"
        }
    });


    const mailOptions = {
        from: 'ceozentrum@gmail.com',
        to: 'jerekaarsene@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).json("Error encountered: " + error.message)
   i     } else {
            res.status(200).json("Email sent successfully" + info.response);
        }
    });

})


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})
