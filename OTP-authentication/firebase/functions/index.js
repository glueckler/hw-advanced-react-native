const admin = require('firebase-admin')
const functions = require('firebase-functions');
const serviceAccount = require('./firebase_secrets.json');
const createUser = require('./create_user');
const requireOneTimePassword = require('./require_one_time_pass')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://udemy-rn-auth-310db.firebaseio.com"
});

// onRequest callback is modelled after the express callback
// the callback handles all type of requests (get, post, put, etc..)
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// firebase recognizes all properties on exports as a cloud function
exports.createUser = functions.https.onRequest(createUser)

exports.requireOneTimePassword = functions.https.onRequest(requireOneTimePassword)
