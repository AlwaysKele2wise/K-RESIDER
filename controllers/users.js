const userModel = require("../models/contacts");
const otpModel = require("../models/otp");
 

const { userSignUpMsg, signUpOtp } = require("../utils/contacts");
const StatusCodes = require("../utils/statuscodes");
const { generateToken, generateOTP } = require("../utils/emails/generateToken");
const bcrypt = require("bcrypt");
//const SendmailTransport = require("nodemailer/lib/sendmail-transport");


const getOTP = async (req, res, next) => {
    const { email } = req.body;

    const OTP = await generateOTP();
    console.log(OTP)

    await otpModel.create({
        email: email,
        otp: OTP,
        type: "Signup",
        created_at: new Date(),
        otpExpiresAt: Date.now + 5 * 60 * 1000, // 5minutes
    });
    
    await signUpOtp(email, OTP);

    return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "OTP sent successfully",
    });
};




const resendOTP = async (req, res) => {
    const { email } = req.body;

    const otpExist = await otpModel.findOneByEmail({email});

    
    
        await otpModel.deleteMany({email:otpExist?.email});
        
        const OTP = await generateOTP();

        await otpModel.create({
            email: email,
            otp: OTP,
            type: "Signup",
            created_at: new Date(),
            otpExpiresAt: Date.now + 5 * 60 * 1000, // 5minutes
        });


        await signUpOtp(email, OTP);
    return {
      STATUS_CODE: StatusCode.OK,
      STATUS: true,
      MESSAGE: "Enter OTP sent to your email address",
    };
};



const validateOTP = async (req, res) => {
   const { email, code } = req.body
    const otp = await otpModel.findOne({code: code})

    if(otp == null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid OTP",
      });
    }

    if (otp.email != email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Credential",
        });   
    }

  await otpModel.deleteOne({code: code})

  return res.status(StatusCodes.OK).json({
    status: false,
    msg: "Otp successfully validated",
});   

}

const signUp = async (req, res, next) => {  
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email: email });
       if (userExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "user already exists",
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