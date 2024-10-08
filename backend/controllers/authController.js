const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc login
//@route POST /auth
//access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // {"username":"Vishnu","password":"lol12345"}

  if (!username || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    {
      UserInfo: { username: foundUser.username, roles: foundUser.roles },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

  //create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by webserver
    sameSite: "none", //https
    secure: true, //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry:set to match refreshToken
  });

  res.json({ accessToken });
});

//@desc Refresh
//@route GET /auth/refresh
//@access Public - because access token has expired
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({ username: decoded.username });
      if (!foundUser) return res.status(401).json({ message: "unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: { username: foundUser.username, roles: foundUser.roles },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
});

//@desc Logout
//@route POST /auth/logout
//@access Public - just to clear cookie if exists

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: "true" });
  res.json({ message: "cookie cleared" });
});

module.exports = { login, logout, refresh };
