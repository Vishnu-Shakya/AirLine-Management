const User = require('../models/Users.js');

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (name.length && email.length && password.length) {
            const foundUser = await User.findOne({ email: email });
            if (foundUser== null) {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                })
                await newUser.save();
                return res.status(201).json({ newUser,msg:'User Created Succefully ...' });
            }
            else {
                return res.status(409).json({ msg: "Email already in use" });
            }
        }
        
    } catch (error) {

        res.status(500).json({msg:'Internal Server Error'});
        
    }
}



const login = async (req,res)=>{
    const {email,password}=req.body;
    if(email.length && password.length){
        const foundUser= await User.findOne({email:email});
        if(foundUser!=null){
            if(await foundUser.comparePassword(password)){
                res.status(200).json({msg:" Successfully Login "});
            }
            else{
                res.status(401).json({msg:'Password Incorrect'});
            }
        }
        else{
            res.status(401).json({msg:"Email not Exist"});
        }
    }
}








module.exports = {
    signup,
    login
};