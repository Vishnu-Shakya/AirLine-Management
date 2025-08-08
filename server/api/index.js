const serverless = require('serverless-http');
const app = require('../app.js');
const connectDB = require('../db/connect.js');

let isConnected = false;

async function initDB() {
  if (!isConnected) {
    await connectDB(process.env.MONGO_URL);
    isConnected = true;
  }
}

module.exports = async (req, res) => {
  await initDB();
  return serverless(app)(req, res);
};
