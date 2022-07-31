// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword
}
  from 'firebase/auth'

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCQTBp8jQwNRQgB7FKRwWzJH1R51fIICtk",
    authDomain: "kanban-e21dc.firebaseapp.com",
    projectId: "kanban-e21dc",
    storageBucket: "kanban-e21dc.appspot.com",
    messagingSenderId: "1025072182576",
    appId: "1:1025072182576:web:6c21f92a5d7345db4b44f5"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

