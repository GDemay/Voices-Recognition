// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: 'AIzaSyAz-HkIX9EuaXPmO3sDQjvY9dWHeg_8zYo',
    authDomain: 'voicesdetector.firebaseapp.com',
    databaseURL: 'https://voicesdetector.firebaseio.com',
    projectId: 'voicesdetector',
    storageBucket: 'voicesdetector.appspot.com',
    messagingSenderId: '482398533537',
    appId: '1:482398533537:web:99a07f33ac33ec8dc0fde0'
  },

  google_api: {
    apiKey: 'AIzaSyApQMZ-6C_PxZy0rWIneCEMKNBGzNq1GAY'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
