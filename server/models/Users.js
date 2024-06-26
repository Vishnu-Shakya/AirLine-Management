const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { profile } = require("../controllers/signup");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    birthday:{
        type:String,
    }
    ,
    maritalStatus: {
        type: String,
        default: ''
    },
    address: {
        add: {
            type: String,
            default: ''
        },
        pincode: {
            type: Number,
            default: 0
        },
        state: {
            type: String,
            default: ''
        }
    },
    bookedTicket: [
        {
            flightId: String,
            ticketString:String,
            status:String
        }
    ],
    ticketHistory: [
        {
            flightId: String,
            ticketString:String
        }
    ]
});

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);