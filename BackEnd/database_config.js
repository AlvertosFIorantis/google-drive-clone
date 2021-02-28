const mongoose = require("mongoose");


const connectDB = async()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/my_database", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB connected successfully")
  }catch(error){
    console.log("Mongo DB connection fail")
    //gia na stmatizso to server
    process.exit(1)

  }
}

module.exports = connectDB;