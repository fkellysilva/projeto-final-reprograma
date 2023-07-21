const bcrypt = require("bcrypt");
const User = require("../models/user");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

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

    const createdUser = await User.findOne({ email: user.email }).select(
      "-password"
    );

    return response.status(201).json(createdUser);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const signin = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(404).json({ message: error.message });
    }

    const password = bcrypt.compareSync(request.body.password, user.password);
    if (!password) {
      return response.status(401).json({ message: "invalid credentiols" });
    }

    const token = jwt.sign(
      { userId: user.id, email: request.body.email },
      SECRET
    );

    return response.status(200).json({ token });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  signin,
};
