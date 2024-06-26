const express=require('express');
const router = express.Router();

const {signup,login,auth,profileUpdate,profileInfo}=require('../controllers/signup');
const {searchFlight,flightPricing,flightBooking,ticketInfo,ticketCancel}=require('../controllers/flight')

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/auth').post(auth);
router.route('/profile/:userId').get(profileInfo);
router.route('/profileUpdate').post(profileUpdate);

// flight service api 
router.route('/search-flights').post(searchFlight);
router.route('/pricing').post(flightPricing);
router.route('/booking').post(flightBooking);
router.route('/ticketInfo').post(ticketInfo);
router.route('/ticketCancel').post(ticketCancel);





module.exports = router;