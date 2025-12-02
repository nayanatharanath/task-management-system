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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  optionsSuccessStatus: 200,
}

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // limit each IP to 100 requests per windowMs
  })
);

// More lenient rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Don't count successful requests as heavily
    return false;
  }
});

app.use(limiter);

// Stricter rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 5 attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true, // Don't count successful requests
  standardHeaders: true,
  legacyHeaders: false,
});

async function startServer() {
  try {
    await initiateOracleDB();
    // routes
    app.use("/api/tasks", authLimiter, tasksRoutes);
    app.use("/api/auth", authLimiter, authRoutes);

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
