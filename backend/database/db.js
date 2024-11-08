import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Db_url, {
      dbName: "Chatbot",
    });

    console.log("Mongo db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;

// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./database/db.js";
// import cors from "cors";
// import path from "path";
// // importing routes
// import userRoutes from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";

// dotenv.config();

// const app = express();

// // using middleware
// app.use(express.json());

// // CORS configuration to allow both domains
// const corsOptions = {
//   origin: 'http://localhost:5173', // Add the allowed origins
//   credentials: true
// };
// app.use(cors(corsOptions));

// const __dirname = path.resolve();

// // using routes
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);

// // Serve frontend assets
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// // Start the server and connect to the database
// app.listen(process.env.PORT, () => {
//   console.log(`Server is working on port ${process.env.PORT}`);
//   connectDb();
// });
