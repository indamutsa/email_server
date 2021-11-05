const app = require('express')()
require('dotenv').config();

const  nodemailer = require('nodemailer');
const { google } = require('googleapis');

const port = process.env.PORT || 3020;


// SECRET ID
const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_ID = process.env.SECRET_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

console.log(process.env.CLIENT_ID)

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  SECRET_ID,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Send email function
async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'jerekaarsene@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: SECRET_ID,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'SENDER NAME <jerekaarsene@gmail.com>',
      to: 'jerekaarsene@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.get('/sendmail', (req, res) =>{
   sendMail()
      .then((result) => {
          console.log('Email sent...', result)
          res.status(200).json("Email sent... " + result)
      })
      .catch((error) =>{
          console.log(error.message)      
          res.status(500).json("Error occured, check the logs... " + error.message)
      });

})


app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
})
