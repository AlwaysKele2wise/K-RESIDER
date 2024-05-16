const { default: mongoose } = require("mongoose");
const { plugin } = require("mongoose");

const contactsSchema = mongoose.Schema({

    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    phone_number: {type: String},
    subject: {type: String},
    message: {type: String},
    
    isDeleted: {type: Boolean, default: false },
    deletedAt: {type: Date, default: null },
  }, 
  {timestamps: true}
);





module.exports = mongoose.model("contacts", contactsSchema);