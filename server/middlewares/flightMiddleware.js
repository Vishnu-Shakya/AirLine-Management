const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res) => {
    try {
        const token = req.body.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.data.email
        const password = decoded.data.password
        const foundUser = await User.findOne({ email: email });
        if (foundUser != null) {
            if (password == foundUser.password) {
                next();
            }
            else {
                res.status(401).json({ msg: 'Password Incorrect' });
            }
        }
        else {
            res.status(401).json({ msg: "Email not Exist" });
        }


    } catch (error) {
        res.status(404).json({ msg: "login please.. " })
    }

}