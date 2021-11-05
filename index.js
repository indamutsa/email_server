const app = require("express")();
require("dotenv").config();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const port = process.env.PORT || 3020;

async function sendMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, //ssl
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWD}`,
      },
    });

    const mailOptions = {
      from: "Ceozentrum <services@ceozentrum.de>",
      to: "jerekaarsene@gmail.com",
      subject: "Hello, API TEST",
      text: "Hello from Ceozentrum email, we are testing our API",
      html: "<h1>Hello from Ceozentrum email, we are testing our API |||| <i>Hello world</></h1>",
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.get("/sendmail", (req, res) => {
  sendMail()
    .then((result) => {
      console.log("Email sent...", result);
      res.status(200).json("Email sent... " + result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json("Error occured, check the logs... " + error.message);
    });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
