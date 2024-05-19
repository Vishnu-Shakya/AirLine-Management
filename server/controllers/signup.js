
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
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
