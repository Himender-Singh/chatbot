import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Set strictQuery to false to match the upcoming Mongoose 7 default and suppress the warning
    mongoose.set('strictQuery', false);

    await mongoose.connect(process.env.DB_url, {
      dbName: "chatbot_career",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDb;
