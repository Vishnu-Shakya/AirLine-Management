const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for security
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const makePayment = async (req, res) => {

    const { flightOffers, userId, travellers } = req.body;

    try {
        const options = {
            amount: flightOffers.price.base * travellers.length * 100, 
            currency: 'INR',
            notes: {
                userId: userId,
                ticket: flightOffers,
                travellers: travellers
            }
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating RazorPay order');
    }
};

module.exports = {
    makePayment,
}