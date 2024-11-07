import app from "./config/app";
import connectDB from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9090;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
