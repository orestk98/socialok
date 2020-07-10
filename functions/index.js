const functions = require('firebase-functions');

const app = require('express')();


const FBAuth = require('./util/FbAuth')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const {getAllScreams, postOneScream} = require ('./handlers/screams')

const { signup, login, uploadImage } = require ('./handlers/users')


//scream routes
app.get('/screams', getAllScreams)
app.post('/scream',FBAuth, postOneScream);
//users ruotes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', uploadImage)


exports.api = functions.region('europe-west1').https.onRequest(app);


// token = eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MjNlMTBhMDQ1MTQwZjFjZmQ0YmUwNDY2Y2Y4MDM1MmI1OWY4MWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsb2siLCJhdWQiOiJzb2NpYWxvayIsImF1dGhfdGltZSI6MTU5NDIzOTEzNiwidXNlcl9pZCI6IjJQbjkyeTZDMUVlUkVVRUZGQzlZaU9ab1dGdDIiLCJzdWIiOiIyUG45Mnk2QzFFZVJFVUVGRkM5WWlPWm9XRnQyIiwiaWF0IjoxNTk0MjM5MTM2LCJleHAiOjE1OTQyNDI3MzYsImVtYWlsIjoib3Jlc3QxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm9yZXN0MTIzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BPbB9LOzVaff68CtpduBprZ7HfWs-MmlwmR8ntutV509f4PY2kZT53y5LOW5WBct-N4sSjZb31IUYWMrwWaK6l3iseVhp7xo5lbBHGVpRm5mux7c-jdmuWdccORFsSasBn_H0QgwXf6EcQYST6juhrz44q0nQmIrqSkmioNrhe3kHCAp8KILDIC5lTuDsmoFv_tHCLeWa_koEkVKnvZWDLYSvrnb6601hljWE9U9E9DCLPHwvZJeZRAC1JFczDusupUxIONWhHXW6nTwm5Sp2-7ILDMrrVmbiaadAOXLqyW403J-WOUwXyERJLZzmpqCsTTfuKsuwmLrlennsgpz4w
