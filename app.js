const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const path = require("path");

const app = express();

// app.use(
//   cors({
//     // origin: process.env.ORIGIN,
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   }),
// );

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Quiz routes
app.use("/api/quiz", quizRoutes);


// this is added here for deployment purpose
let isConnected = false;

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error conect to Data base", error);
  }
}

//add middleware to check and connect to MongoDB
app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
});


module.exports = app;
