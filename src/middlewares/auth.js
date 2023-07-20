const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const auth = (request, response, next) => {
  const authHeader = request.get("Authorization");
  if (!authHeader) {
    return response.status(401).json({
      message: "Authorization token missing",
    });
  }
  const [, token] = authHeader.split(" ");
  jwt.verify(token, SECRET, (error) => {
    if (error) {
      return response.status(401).json({ message: error.message });
    }
  });
  next();
};

module.exports = auth;
