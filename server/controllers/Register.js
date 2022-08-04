const User = require("../models2/User");
const bcrypt = require("bcryptjs");

// LINK client/src/components/auth/SignUp.jsx:14
const handleNewUser = async (req, res) => {
  const { username, fullName, password, verifyPassword } = req.body;
  if (!username || !password || !fullName) {
    return res.status(400).send({ message: "Required fields cannot be blank" });
  }
  try {
    const duplicate = await User.find({ username: username });
    if (duplicate.length) {
      return res.sendStatus(409); // Conflict
    }
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = {
      fullName: fullName,
      username: username,
      password: hashedPwd,
    };
    const document = new User(newUser);
    await document.save();
    res.status(201).send({ success: `New user ${username} created`, ...document});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = { handleNewUser };