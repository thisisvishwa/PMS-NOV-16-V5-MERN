```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/passwords
// @desc    Get all user's passwords
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user.passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/passwords/:id
// @desc    Update password
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { password } = req.body;

  // Build password object
  const passwordFields = {};
  if (password) passwordFields.password = password;

  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: passwordFields },
      { new: true }
    );

    res.json(user.passwords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/passwords/:id
// @desc    Delete password
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns password
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Password removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
```