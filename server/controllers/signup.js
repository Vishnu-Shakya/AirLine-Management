const { response } = require('express');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (name.length && email.length && password.length) {
            const foundUser = await User.findOne({ email: email });
            if (foundUser == null) {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                })
                await newUser.save();

                const secretKey = process.env.JWT_SECRET;
                const token = jwt.sign({ data: newUser }, secretKey, { expiresIn: '7d' });

                return res.status(201).json({ newUser, token, msg: 'User Created Succefully ...' });
            }
            else {
                return res.status(409).json({ msg: "Email already in use" });
            }
        }

    } catch (error) {

        res.status(500).json({ msg: 'Internal Server Error' });

    }
}



const login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    try {
        if (email.length && password.length) {
            const foundUser = await User.findOne({ email: email });
            if (foundUser != null) {
                if (await foundUser.comparePassword(password)) {
                    const secretKey = process.env.JWT_SECRET;
                    const token = jwt.sign({ data: foundUser }, secretKey, { expiresIn: '7d' });
                    res.status(200).json({ msg: " Successfully Login ",user:foundUser,token:token });
                }
                else {
                    res.status(401).json({ msg: 'Password Incorrect' });
                }
            }
            else {
                res.status(401).json({ msg: "Email not Exist" });
            }
        }
        
    } catch (error) {
        response.status(500).json({msg:'Internal Server Error'});
    }
}
const auth = async (req, res) => {

    try {
        const token = req.body.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.data.email
        const password = decoded.data.password

        if (email.length && password.length) {
            const foundUser = await User.findOne({ email: email });
            if (foundUser != null) {
                if (password == foundUser.password) {
                    res.status(200).json({ msg: " Successfully Login " });
                }
                else {
                    res.status(401).json({ msg: 'Password Incorrect' });
                }
            }
            else {
                res.status(401).json({ msg: "Email not Exist" });
            }
        }
        else {
            res.status(404).json({ msg: "please login again" })
        }

    } catch (error) {
        res.status(404).json({ msg: "login please.. " })
    }

}
const profileUpdate = async (req, res) => {
    
    console.log(req.body);
    const token = req.body.token;
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.data.email;
    const password = decoded.data.password;
    if (email.length) {
        const foundUser = await User.findOne({ email: email });
        try {
            const updatedUser = await User.findByIdAndUpdate(foundUser._id, req.body, {
                new: true, // Return the updated document
                runValidators: true, // Run schema validation on the update
            });
            console.log('User updated successfully:', updatedUser);
            res.status(200).json({ msg: "profile Updated ", updatedUser });
        } catch (error) {
            res.status(304).json({ msg: 'Something went wrong' })
        }
    }
}


const profileInfo = async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    if (userId.length) {
        const foundUser = await User.findOne({ _id:userId});
        console.log(foundUser);
        try {
            res.status(200).json({ 
                foundUser
             });
        } catch (error) {
            res.status(304).json({ msg: 'Something went wrong ' })
        }
    }
    else{
        res.status(409).json({msg:'Invalid User please login'});
    }

}







module.exports = {
    signup,
    login,
    auth,
    profileUpdate,
    profileInfo 
};