import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import path from "path";
// importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",  // Specify allowed origin
  methods: "GET,POST,PUT,DELETE",                // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization",   // Allowed headers
};

// using middleware
app.use(express.json());
app.use(cors(corsOptions));  // Apply the corsOptions here

const __dirname = path.resolve();

// using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Serve frontend assets
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start the server and connect to the database
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
  connectDb();
});
