const express = require('express');
const {
  register,
  login,
  googleAuth,
  facebookAuth,
  getMe,
  logout
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;