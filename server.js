require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer Transporter using Google App Password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint to send OTP
app.post('/api/send-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const mailOptions = {
        from: `OneHive Support <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your OneHive Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <h2 style="color: #050b14; text-align: center;">Reset Your OneHive Password</h2>
                <p style="color: #4b5563; font-size: 16px;">Hello,</p>
                <p style="color: #4b5563; font-size: 16px;">We received a request to reset your password for your OneHive account.</p>
                <p style="color: #4b5563; font-size: 16px;">Use the code below to continue:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #3b82f6; background-color: #f3f4f6; padding: 10px 20px; border-radius: 8px;">${otp}</span>
                </div>
                
                <p style="color: #4b5563; font-size: 16px;">This code will expire in 10 minutes.</p>
                <p style="color: #4b5563; font-size: 16px;">If you did not request a password reset, please ignore this email. Your account remains secure.</p>
                <p style="color: #4b5563; font-size: 16px;">For assistance, contact our support team.</p>
                <br/>
                <hr style="border: none; border-top: 1px solid #e5e7eb;" />
                <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 20px;">
                    &mdash;<br/>
                    <strong style="color: #4b5563;">OneHive Team</strong><br/>
                    All services, under one roof.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).json({ error: 'Failed to send OTP email', details: error.message });
    }
});

// Endpoint to send Confirmation
app.post('/api/send-confirmation', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
        from: `OneHive Support <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Password Has Been Updated',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <h2 style="color: #050b14; text-align: center;">Your Password Has Been Updated</h2>
                <p style="color: #4b5563; font-size: 16px;">Hello,</p>
                <p style="color: #4b5563; font-size: 16px;">Your OneHive account password has been successfully changed.</p>
                <p style="color: #4b5563; font-size: 16px;">If this was you, no further action is required.</p>
                <p style="color: #4b5563; font-size: 16px;">If you did not make this change, please contact our support team immediately.</p>
                <p style="color: #4b5563; font-size: 16px;">For your security, never share your password with anyone.</p>
                <br/>
                <hr style="border: none; border-top: 1px solid #e5e7eb;" />
                <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 20px;">
                    &mdash;<br/>
                    <strong style="color: #4b5563;">OneHive Team</strong><br/>
                    Secure. Reliable. Unified.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Confirmation sent successfully' });
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).json({ error: 'Failed to send confirmation email', details: error.message });
    }
});

// Endpoint to send Welcome Email
app.post('/api/send-welcome', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
        from: `OneHive Support <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to OneHive',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <h2 style="color: #050b14; text-align: center;">Welcome to OneHive</h2>
                <p style="color: #4b5563; font-size: 16px;">Hello ${name ? name : ''},</p>
                <p style="color: #4b5563; font-size: 16px;">Your OneHive account has been successfully created.</p>
                <p style="color: #4b5563; font-size: 16px;">You can now book trusted home services &mdash; cleaning, plumbing, electrical work, and more &mdash; all in one place.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="http://127.0.0.1:8080/login.html" style="background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; display: inline-block;">Get Started Here</a>
                </div>
                
                <p style="color: #4b5563; font-size: 16px;">If you need help, our support team is always available.</p>
                <br/>
                <hr style="border: none; border-top: 1px solid #e5e7eb;" />
                <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 20px;">
                    &mdash;<br/>
                    <strong style="color: #4b5563;">OneHive Team</strong><br/>
                    Everything under one roof.
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Welcome email sent successfully' });
    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({ error: 'Failed to send welcome email', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`OneHive Email Server is running on http://localhost:${port}`);
});
