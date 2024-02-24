// Import the necessary modules
const jwt = require("jsonwebtoken");

// Middleware function to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    // If the token doesn't exist, the user is not authenticated
    req.isAuthenticated = false;
    return next();
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "your-secret-key");

    // If the token is valid, the user is authenticated
    req.isAuthenticated = true;
    req.userId = decoded.userId;
  } catch (error) {
    // If there's an error verifying the token, the user is not authenticated
    req.isAuthenticated = false;
  }

  // Call the next middleware
  next();
};

// Export the middleware function
module.exports = authenticateUser;
