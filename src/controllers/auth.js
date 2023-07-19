const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (request, response) => {
  try {
    const userFound = await User.findOne({
      email: request.body.email,
    });

    if (userFound) {
      return response.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(request.body.password, 10);

    const user = new User({
      ...request.body,
      password: hashedPassword,
    });

    await user.save();
    
    const createdUser = await User.findOne({ email: user.email }).select("-password")

    return response.status(201).json(createdUser);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
};
