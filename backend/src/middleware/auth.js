const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header: ", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    const token = authHeader?.split(" ")[1]; // Remove "Bearer " prefix
    console.log("Token: ", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token: ", decoded);

    req.user = decoded; // Attach user info to request
    console.log("req.user set to: ", req.user);

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expired",
      });
    }
    res.status(401).json({
      success: false,
      error: "Invalid token",
    });
  }
}

module.exports = verifyToken;
