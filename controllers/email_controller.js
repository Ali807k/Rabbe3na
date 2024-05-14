const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const sendEmail = require('../mailer');
const { User } = require("../models/db_schema");


async function forgot_password  (req, res)  {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
    await user.save();
  
    const resetLink = `http://${req.headers.host}/reset-password/${token}`;
    sendEmail(
      email,
      'Password Reset Request',
      `Please click on the following link to reset your password: ${resetLink}`
    );
  
    res.send('Password reset link sent to your email account');
  };
  
  // Render the reset password form
  async function reset_password  (req, res) {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }
  
    res.render('changePassword', { token });
  };
  
  // Post route for reset password form
  async function reset_password (req, res)  {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }
  
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
    res.send('Your password has been successfully reset');
  };
  
  module.exports = {forgot_password, reset_password}
  
  
  
  
  
  
  
  