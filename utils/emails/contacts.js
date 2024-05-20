// const { config } = require("dotenv");
const nodemailer = require("nodemailer");

exports.welcomeUser =  async (email, first_name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                pass: "dpgnmwbwtpdiigsv",
                user: "farmsagora@gmail.com",
            },
        });
            await transporter.sendMail({
                from: "farmsagora@gmail.com",
                to: email,
                subject: "Thanks For Contacting",
                html: `<b>Hi You are highly welcome Aaron</b> <br /> 
                <p>
                   we receieved your mail.............
                </p>


                </br>
                <b>
                <p>Best Regards</p> <br />
                 <p>RESIDER Team</p>
                </b>
                `,
            });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");    
    }
};