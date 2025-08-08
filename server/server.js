const connectDB = require('./db/connect.js');
const app = require('./app.js');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
