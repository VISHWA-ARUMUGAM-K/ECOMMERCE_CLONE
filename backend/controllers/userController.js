const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

//@desc get all users
//@route Get /users
//access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

//@desc create  all users
//@route POST /users
//access private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  //confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "all fields are required " });
  }

  //check of duplicate

  const duplicate = await User.findOne({ username }).lean().exec(); //passing in a value so .exec //check again
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate found" });
  }

  //hash the password
  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = { username, password: hashedPwd, roles };
  const user = await User.create(userObject); // not passing a value so no exec //check again

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: `invalid user data received` });
  }
});

//@desc update a user
//@route Patch /users
//access private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;
  //confirm data

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "duplicate username" });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    //hash password
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.username} updated` });
});

//@desc delete a user
//@route DELETE /users
//access private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "user ID required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const result = await user.deleteOne(); // error
  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
