const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server is running"));

const contactEmail = nodemailer.createTransport({
  host: "mail.terryhunt.dev",
  port: 465,
  secure: true,
  auth: {
    type: "login",
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: name,
    to: process.env.SENDER,
    subject: `Contact from ${name}`,
    html: `<p>The message is from ${name}</p> <p>Email: ${email}</p> <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message has been sent" });
    }
  });
});
