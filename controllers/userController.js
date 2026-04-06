const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    const token = generateToken(registeredUser);
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: registeredUser._id,
        username: registeredUser.username,
        email: registeredUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports.login = async (req, res) => {
  const token = generateToken(req.user);
  res.json({
    message: "Login successful",
    token,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

module.exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully (Clear token on client)" });
};
