import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // mongoose.set('strictQuery', false); 
    await mongoose.connect(process.env.Db_url, {
      dbName: "chatbot_career", // Ensure the database name is valid
    });
    console.log("MongoDB connected");
  } catch (error) {
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDb;
