const userModel = require("../models/contacts");
const { userSignUpMsg } = require("../utils/contacts");
const StatusCodes = require("../utils/statuscodes");

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "email is required"
        });
        //run everything
    } else {

    }
    
    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hashSync(password, salt);

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

const signin = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
   
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

    return res.status(StatusCodes.CREATED).json({
        status: true,
        message: "welcome to Resider",
        data: {
            userExist,
        //    token
        }
    });
};

module.exports = {signUp, signin };