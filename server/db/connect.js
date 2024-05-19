const mongoose = require("mongoose");

const connectDB =async (url) => {
 const result=await mongoose.connect(url,{});
  if(mongoose.connection.readyState===1){
    console.log("DB connect successfully ");
  }
  else{
    console.log("DB is not connected");
  }
  return result;
  
};


module.exports = connectDB;


