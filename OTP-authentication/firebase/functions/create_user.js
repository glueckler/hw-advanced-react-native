const admin = require('firebase-admin')

module.exports = function(request, response) {
  // verify phone
  if (!request.body.phone) {
    response.status(422).send({ error: 'no phone' })
  }

  // format phone number, check if it's a string, yada yaada
  const phone = String(request.body.phone).replace(/[^\d]/g, '')

  // create user account using phone number
  // using the phone number as a unique id
  admin
    .auth()
    .createUser({
      uid: phone,
    })
    // respond to the request once the user has been created
    .then(res => {
      response.send(res)
      return res // make eslint happy :)
    })
    .catch(err => {
      response.status(422).send({ error: err })
    })
}
