const twilio = require('twilio')
const twilioSecrets = require('./twilio_secrets')
const accountSid = twilioSecrets.accountSid
const authToken = twilioSecrets.authToken

module.exports = new twilio.Twilio(accountSid, authToken)
