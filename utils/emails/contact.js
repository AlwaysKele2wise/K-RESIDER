// const { config } = require("dotenv");
const nodemailer = require("nodemailer");

exports.welcomeUser = async (email, first_name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: "dpgnmwbwtpdiigsv",
                pass: "kele2wise@gmail.com",
            },
        });
            await transporter.sendMail({
                from: "kele2wise@gmail.com",
                to: email,
                subject: "RESIDER Welcome Note ✔",
                text: "Welcome User",
                html: "<b>You are highly welcome</b> <br /> <p>Best Regards</p> <br /> <p>RESIDER Team</p>",
            });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");    
    }
};