const express = require('express');
const router = express.Router();
const User = require('../models/User'); //user schema
const userSchema = require('../middlewares/validation'); // your validation Joi

// CREATE
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

// UPDATE
router.put('/:id', async (req, res) => {
    const {id } = req.params
    const users = await User.update(
        {username: req.body.username, updated_at: new Date()},
        {where: {id: id}}
    )
    const updatedUser = await User.findOne(
        {where: {id:id}}
    )
    console.log(users)
    return res.status(200).json(updatedUser)
})


// GET
router.get('/', async (req, res) => {
    const users = await User.findAll()
    return res.status(200).json(users)
})


// DELETE
router.delete('/:userId', async (req, res) => {
    const {userId} = req.params
      const users = await User.destroy({
        where: {
          id: userId
        }
      })
    console.log(users)
    if(!users) {return res.status(404).json({message: 'User not found'})}
    return res.status(200).json({message: 'User deleted successfully'})
})
module.exports = router;