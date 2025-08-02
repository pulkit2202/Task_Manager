const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signupPostController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        msg: 'An account already exists with this email.',
        color: 'warning',
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: 'https://www.svgrepo.com/show/148911/manager-avatar.svg',
      taskAll: [],
      completedTask: [],
      deletedTask: [],
      important: [],
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      {
        email,
        username,
        idx: savedUser._id,
        pic: savedUser.profilePic,
      },
      'SECRET-KEY'
    );

    res.cookie('__task77573w82', token);
    return res.status(201).json({
      msg: 'Account created successfully.',
      color: 'success',
      loggedInfo: {
        email,
        username,
        idx: savedUser._id,
        pic: savedUser.profilePic,
      },
      success: true,
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({
      msg: 'Failed to create user.',
      color: 'danger',
      success: false,
    });
  }
};

exports.loginGetController = async (req, res) => {
  const { email, pass } = req.body;

  try {
    if (req.user) {
      const user = await User.findById(req.user.idx);
      return res.status(200).json({
        msg: 'Already logged in.',
        color: 'info',
        success: true,
        loggedInfo: user,
        alreadyLogged: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid email or password.',
        color: 'warning',
        success: false,
        alreadyLogged: false,
      });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: 'Invalid email or password.',
        color: 'warning',
        success: false,
        alreadyLogged: false,
      });
    }

    const tokenx = jwt.sign(
      {
        email,
        username: user.username,
        idx: user._id,
        pic: user.profilePic,
      },
      'SECRET-KEY'
    );

    return res.status(200).json({
      msg: 'Login successful.',
      color: 'success',
      success: true,
      loggedInfo: {
        email,
        idx: user._id,
        username: user.username,
        pic: user.profilePic,
      },
      alreadyLogged: false,
      tokenx,
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({
      msg: 'Login failed.',
      color: 'danger',
      success: false,
      alreadyLogged: false,
    });
  }
};

exports.changePassController = async (req, res) => {
  const { old, newpass } = req.body;

  try {
    const user = await User.findById(req.user.idx);

    const isMatch = await bcrypt.compare(old, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: 'Old password does not match.',
        color: 'warning',
      });
    }

    const hashedNew = await bcrypt.hash(newpass, 10);
    await User.findByIdAndUpdate(req.user.idx, { password: hashedNew });

    return res.status(200).json({
      msg: 'Password updated successfully.',
      color: 'success',
    });
  } catch (err) {
    console.error('Change Password Error:', err);
    return res.status(500).json({
      msg: 'Failed to update password.',
      color: 'danger',
    });
  }
};

exports.getAnalticsForUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.idx);
    return res.status(200).json({ user });
  } catch (err) {
    console.error('Analytics Error:', err);
    return res.status(500).json({ user: 'Network error' });
  }
};
