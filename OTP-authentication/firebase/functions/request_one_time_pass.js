const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = function(req, res) {
  if (!req.body.phone) {
    res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')

  // note that google cloud functions requires a paid account for using external apis
  // at the moment this is not tested
  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000)
      return userRecord
    })
    .catch((err) => {
      res.status(422).send({ error: err })
    })
}
