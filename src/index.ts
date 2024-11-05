import app from "./config/app";

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
