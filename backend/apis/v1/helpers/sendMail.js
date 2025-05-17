const nodemailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        return { 
            success: true, 
            message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { 
            success: false, 
            message: "Failed to send email", error };
    }
};
