
const contactModel = require("../models/contacts");

const {contactUsMsg} = require("../utils/emails/contacts");

const contact = async (req, res) => {

    const {first_name, last_name, email, phone_number, subject, message} = req.body;

    const contactObject = {
        first_name,
        last_name,
        email,
        phone_number,
        subject,
        message,
    }
    
 const saveMsg = await contactModel.create(contactObject);
// send msg
await contactUsMsg(email)


  return  res.status(200).json({
    msg: "thank you for contacting us, we will get back to you shortly",
    data: saveMsg
  }) 

} 


module.exports = {contact}