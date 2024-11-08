import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false); // Disable strict query mode
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Chatbot",
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
