 const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../config/envConfig");


exports.contactUsMsg =  async (email, first_name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: SERVICE,
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: USER,
            },
        });
            await transporter.sendMail({
                from: USER,
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
                 <p>Kele2wise</p>
                </b>
                `,
            });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");    
    }
};