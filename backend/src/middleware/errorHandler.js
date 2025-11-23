// Error Handler
module.exports = (err, req, res, next) => {
  console.error("Error: ", err.message);

  // Oracle DB errors
  if (err.code && err.code.toString().startsWith("ORA")) {
    console.error("Oracle error details:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Database error occurred",
    });
  }

  // validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // default error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
};
