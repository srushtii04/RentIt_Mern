require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use("/api/items", require("./routes/itemRoutes"));

const rentalRoutes=require("./routes/rentalRoutes");

app.use("/api/rentals",rentalRoutes);

const aiRoutes=require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});