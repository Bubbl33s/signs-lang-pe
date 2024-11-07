import app from "./config/app.config";
import connectDB from "./config/database.config";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 9090;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
