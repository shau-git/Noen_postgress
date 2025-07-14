const express = require('express');
const router = express.Router();
const User = require('../models/User'); //user schema
const userSchema = require('../middlewares/validation'); // your validation Joi


router.post('/', async (req, res) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.create(value);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


router.get('/', async (req, res) => {
    const users = await User.findAll()
    return res.status(200).json(users)
})


module.exports = router;