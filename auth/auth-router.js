const router = require('express').Router();
const Users = require('../users/users-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
  const userInfo = req.body;

  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.json(user)
    })
    .catch(error => res.send({"message": "there was an error creating the user"}))
});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  Users.findBy({ username })
  .first()
  .then((user) => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = generateToken(user);

      res.status(200).json({
        "hello": user.username,
         token,
      })
    } else {
      res.status(401).json({"message": "invalid credentials"})
    }
  })
  .catch( error => res.status(500).json({"message": "there was an error accessing that account"}))
});

function generateToken(user) {
  const payload = {
    username: user.username,
  }

  const secret = process.env.JWT_SECRET || 'one ring to rule them all, and in the darkness bind them'

  const options = {
    expiresIn: '1h',
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
