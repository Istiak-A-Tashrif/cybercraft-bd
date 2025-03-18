const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    authProvider: "local",
  });

  sendTokenResponse(user, 201, res);
});


exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  if (user.authProvider !== "local") {
    return next(
      new ErrorResponse(`Please login using ${user.authProvider}`, 401)
    );
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.googleAuth = asyncHandler(async (req, res, next) => {
  const { tokenId } = req.body;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  let user = await User.findOne({ email });

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-8);

    user = await User.create({
      name,
      email,
      password: randomPassword,
      authProvider: "google",
      providerData: { picture },
    });
  } else if (user.authProvider !== "google") {
    return next(
      new ErrorResponse(`Please login using ${user.authProvider}`, 401)
    );
  }

  sendTokenResponse(user, 200, res);
});


exports.facebookAuth = asyncHandler(async (req, res, next) => {
  const { accessToken, userID } = req.body;

  const url = `https://graph.facebook.com/v13.0/${userID}?fields=id,name,email&access_token=${accessToken}`;

  const response = await axios.get(url);
  const { name, email } = response.data;

  if (!email) {
    return next(new ErrorResponse("Email not available from Facebook", 400));
  }

  let user = await User.findOne({ email });

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-8);

    user = await User.create({
      name,
      email,
      password: randomPassword,
      authProvider: "facebook",
      providerData: { facebookId: userID },
    });
  } else if (user.authProvider !== "facebook") {
    return next(
      new ErrorResponse(`Please login using ${user.authProvider}`, 401)
    );
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const response = { token, role: user.role };
  res.status(statusCode).json({
    success: true,
    data: response,
  });
};
