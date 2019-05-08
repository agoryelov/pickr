import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import clientCredentials from '../credentials/client'



function HelloWorld() {
  if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
  }
  
  console.log('hello');
  firebase.database().ref("test").update({"status" : "no"});
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: yellow;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: green;
        }
      `}</style>
    </div>
  );
}

export default HelloWorld;