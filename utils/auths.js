const nodemailer = require("nodemailer");
const { PASSMAILER, USER, SERVICE } = require("../config/envConfig");
exports.userSignUsMsg =  async (email, first_name) => {
};

exports.signUpOtp =  async (email, OTP) => {
    console.log(email, PASSMAILER);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                pass: PASSMAILER,
                user: "farmsagora@gmail.com",
            },
        });
            await transporter.sendMail({
                from: USER,
                to: email,
                subject: "OTP SENT",
                html: `<b>Hi </b> <br /> 
                <p>
                   Copy the otp sent to you to verify your account ${OTP}......
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