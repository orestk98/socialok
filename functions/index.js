const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


var config = {
    apiKey: "AIzaSyBoi7AEs5c6dVUZDxlC16geLKfPA1MKeuE",
    authDomain: "socialok.firebaseapp.com",
    databaseURL: "https://socialok.firebaseio.com",
    projectId: "socialok",
    storageBucket: "socialok.appspot.com",
    messagingSenderId: "936502606066",
    appId: "1:936502606066:web:effa1b4b61aa010331b86b",
    measurementId: "G-E0G8RKGZV9"
  };


const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/screams',(req,res)=>{
  db.collection('screams').orderBy('createdAt','desc').get().then(data=>{
    let screams =[];
    data.forEach(doc=>{
      screams.push({
        screamId: doc.id,
        body: doc.data().body,
        userHandle: doc.data().userHandle,
        createdAt: doc.data().createdAt
      });
    });
    return res.json(screams);
  }).catch(err => console.log(err))
})


app.post('/scream', (req,res)=>{
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection('screams').add(newScream)
  .then(doc=>{
      res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err=>{
    res.status(500).json({error: 'something went wrong'});
    console.error(err);
  });
});

// Signup route

app.post('/signup', (req, res)=>{
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }
let token;
  db.doc(`/users/${newUser.handle}`).get()
  .then(doc=>{
    if(doc.exists){
      return res.status(400).json({ handle: 'this handle is already taken.'})
    }else{
      return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
  }).then(data=>{
    userId = data.user.uid;
    return data.user.getIdToken();
  }).then(idToken=>{
    token =idToken;
  const userCredentials ={
    handle: newUser.handle,
    email: newUser.email,
    createdAt: new Date().toISOString(),
    userId
  }
return  db.doc(`/users/${newUser.handle}`).set(userCredentials);
}).then(()=>{
  return res.status(201).json({token});
})
  .catch(err=>{
    console.error(err);
    if(err.code === 'auth/email-already-in-use'){
      return res.status(400).json({ email:'Email is already used'})
    }else{
      return res.status(500).json({error: err.code})

    }
  })
  //
  // firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(data=>{
  //   return res.status(201).json({message: `user ${data.user.uid} signed up succesfully`}).catch(err=>{
  //     console.error(err);
  //     return res.status(500).json({ error: err.code})
  //   })
  // })
})


exports.api = functions.region('europe-west1').https.onRequest(app);


// token = eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MjNlMTBhMDQ1MTQwZjFjZmQ0YmUwNDY2Y2Y4MDM1MmI1OWY4MWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsb2siLCJhdWQiOiJzb2NpYWxvayIsImF1dGhfdGltZSI6MTU5NDIzOTEzNiwidXNlcl9pZCI6IjJQbjkyeTZDMUVlUkVVRUZGQzlZaU9ab1dGdDIiLCJzdWIiOiIyUG45Mnk2QzFFZVJFVUVGRkM5WWlPWm9XRnQyIiwiaWF0IjoxNTk0MjM5MTM2LCJleHAiOjE1OTQyNDI3MzYsImVtYWlsIjoib3Jlc3QxMjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm9yZXN0MTIzQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BPbB9LOzVaff68CtpduBprZ7HfWs-MmlwmR8ntutV509f4PY2kZT53y5LOW5WBct-N4sSjZb31IUYWMrwWaK6l3iseVhp7xo5lbBHGVpRm5mux7c-jdmuWdccORFsSasBn_H0QgwXf6EcQYST6juhrz44q0nQmIrqSkmioNrhe3kHCAp8KILDIC5lTuDsmoFv_tHCLeWa_koEkVKnvZWDLYSvrnb6601hljWE9U9E9DCLPHwvZJeZRAC1JFczDusupUxIONWhHXW6nTwm5Sp2-7ILDMrrVmbiaadAOXLqyW403J-WOUwXyERJLZzmpqCsTTfuKsuwmLrlennsgpz4w
