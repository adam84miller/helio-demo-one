const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo')
const bcrypt = require('bcrypt')
const jwt = require('../../../lib/jwt')

router.post('/', function (req, res, next) {

  const credentials = req.body

  console.log('login',req.body)
  const info = {
    query: { userName: credentials.userName.toLowerCase() },
    collection: req.app.locals.collectionUsers
  }

  console.log(info)
  db.readOne(info)
    .then(foundUser => {
      console.log("USER",foundUser)
      if (foundUser === null) {

        res.json({ authenticated: false })

      } else {

        // Check to see if password matches
        bcrypt.compare(credentials.password, foundUser.password)
          .then(match => {
            console.log(match)
            if (match === true) {

              // Create jwt
              jwt.signP({ userName: foundUser.userName, userID: foundUser._id })
                .then(token => {
                  console.log(token)
                  res.json({ authenticated: true, token })
                })
                .catch(err => {
                  throw err
                })

            } else {

              res.json({ authenticated: false })

            }
          })

      }// End of if user found
    })
    .catch(err => {
      console.log *= (err.message)
      res.status(500).send(err.message)
    })
});

module.exports = router;
