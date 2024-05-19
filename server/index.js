const dotenv = require("dotenv")
dotenv.config();
const connectDB = require('./db/connect.js');
const express = require('express');
const mainRouter = require('./routes/routes.js');
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', mainRouter);

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is listening on port 3000`);
        })

    } catch (error) {
        console.log(error);
    }
}

start();