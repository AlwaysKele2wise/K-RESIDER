const userModel = require("../models/contacts");
const otpModel = require("../models/otp");
const { userSignUpMsg, signUpOtp } = require("../utils/contacts");
const StatusCode = require("../utils/statuscodes");
const { generateToken, generateOTP } = require("../utils/emails/generateToken");
const bcrypt = require("bcrypt");
//const SendmailTransport = require("nodemailer/lib/sendmail-transport");


const getOTP = async (req, res, next) => {
    const { email } = req.body;

    const OTP = await generateOTP();
    console.log(OTP)

    await otpModel.create({
        email: email,
        code: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now () + 12 * 60 * 1000, // 12minutes
    });
    
    await signUpOtp(email, OTP);

    return res.status(StatusCode.CREATED).json({
        status: true,
        message: "OTP sent successfully",
    });
};


const resendOTP = async (req, res) => {
    const { email } = req.body;

    const otpExist = await otpModel.findOne({email: email});

    
    
        await otpModel.deleteMany({email:otpExist?.email});
        
        const OTP = await generateOTP();

        await otpModel.create({
            email: email,
            code: OTP,
            type: "Signup",
            created_at: new Date(),
            otpExpiresAt: Date.now() + 12 * 60 * 1000, // 12minutes
        });


        await signUpOtp(email, OTP);
    return res.status(StatusCode.OK).json({
        status: true,
        message: "OTP resent successfully",
    });
};


const validateOTP = async (req, res) => {
   const { email, code } = req.body;
 
   try {
    //Find the OTP record
const otp = await otpModel.findOne({ code });

if (otp == null) {
   return res.status(StatusCode.BAD_REQUEST).json({
       status: false,
       msg: "Invalid OTP or expired. Please request a new one.",
   });
};

// // if (otp.code != code) {
// //    return res.status(StatusCode.BAD_REQUEST).json({
// //        status: false,
// //        msg: "Invalid OTP. Please check the code you entered.",
// //    });
// };


if(otp.email != email) {
   return res.status(StatusCode.BAD_REQUEST).json({
       status: false,
       msg: "OTP does not match the provided email address.",
   });
}


    // Delete the OTP record after successful validation
    await otpModel.deleteOne({code:code});

   return res.status(StatusCode.OK).json({
   status: true,
   msg: "OTP successfully validated",
});

} catch (error) {
console.error("Error validating OTP:", error);
return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
   status: false,
   msg: "An error occurred while validating the OTP.",
});

}

};


const signUp = async (req, res, next) => {  
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email: email });
       if (userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "user already exist",
        });
}
 

    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log({hashedPassword}) 

    const saveUser = await userModel.create({
    email: email,
    password:  hashedPassword,
    }); 
    
    await userSignUpMsg(email);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "user created successfully",
        data: saveUser,
    });
};


const signIn = async (req, res, next) => {
    const { email, password, name } = req.body;
    
    console.log(name, email, password);
   
    const userExist = await userModel.findOne({ email: email });
   
    if (!userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "user account not found please signup",
        });
    }

    //ELSE

    const passwordMacthes = await bcrypt.compare(password, passwordMacthes)
    if (!passwordMacthes) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "incorrect password",
        });
    }


  //Jwt token sent
  const token = await generateToken(userExist);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "welcome to Resider",
        data: {
            user: userExist,
           token,
        },
    });
};

module.exports = { signUp, signIn, getOTP, resendOTP, validateOTP };