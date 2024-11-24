import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from a .env file

const app = express();
var corsOptions = {
    origin: '*',
  }
app.use(cors(corsOptions));
console.log(process.env.SMTP_HOST);
// Middleware to parse JSON requests
app.use(express.json());

// Root route for sending emails
app.post('/', async (req, res) => {
  try {
    const { message, receiverEmail } = req.body;

    if (!message || !receiverEmail) {
      return res.status(400).json({
        error: "Message and receiverEmail are required.",
      });
    }
    console.log(process.env.SMTP_HOST);

    // Configure the SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, // Convert port to number
      secure: process.env.SMTP_SECURE === 'true', // Convert to boolean
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Your Name" <${process.env.SMTP_USER}>`, // Sender's email
      to: receiverEmail, // Recipient's email
      subject: "Message from Express Server",
      text: message, // Email content
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({
      error: "Failed to send email.",
    });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
