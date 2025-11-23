const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { initiateOracleDB } = require("./src/config/database");
const tasksRoutes = require("./src/routes/tasksRoutes");
const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorHandler");

// server entry point
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

async function startServer() {
  try {
    await initiateOracleDB();
    // routes
    app.use("/api/tasks", tasksRoutes);
    app.use("/api/auth", authRoutes);

    // error handler
    app.use(errorHandler);
  } catch (error) {
    console.error("Failed to start server: ", error);
    process.exit(1);
  }
}

// server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

startServer();
