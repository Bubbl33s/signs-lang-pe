import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al conectar a MongoDB:", error.message);
    } else {
      console.error("Error al conectar a MongoDB:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
