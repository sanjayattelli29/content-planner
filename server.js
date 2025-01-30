import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

// Load environment variables

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.CLIENT_URL , 'http://localhost:3000'],
    credentials: true,
  })
);

app.get("/",(req,res)=>{
  res.send("Hello World")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handler middleware
app.use(errorHandler);

// Dynamically load routes
const routeFiles = fs.readdirSync("./src/routes");

routeFiles.forEach((file) => {
  // Use dynamic import
  import(`./src/routes/${file}`)
    .then((route) => {
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.log("Failed to load route file", err);
    });
});

// Server start function
const server = async () => {
  try {
    // Connect to the database
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();
