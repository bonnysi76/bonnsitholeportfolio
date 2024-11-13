const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, subject, description } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password"    // Replace with your email password
    }
  });

  const mailOptions = {
    from: email,
    to: "bonnysithole76@gmail.com",
    subject: `${subject} - Message from ${name}`,
    text: description
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email.");
    }
    res.status(200).send("Email sent successfully!");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
