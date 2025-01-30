import mongoose from "mongoose";

const connect = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("uri", uri);
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    throw error;
  }
};

export default connect;
