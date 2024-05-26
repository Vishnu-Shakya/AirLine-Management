const express=require('express');
const router = express.Router();

const {signup,login,auth,profileUpdate,profile}=require('../controllers/signup');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/auth').post(auth);
router.route('/profile').get(profile);
router.route('/profileUpdate').post(profileUpdate);




module.exports = router;