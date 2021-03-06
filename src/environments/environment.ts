// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAoELHeDUuFqWEwd5IgPJirDso1_jkzw30',
    authDomain: 'tsumu-3eb2a.firebaseapp.com',
    databaseURL: 'https://tsumu-3eb2a.firebaseio.com',
    projectId: 'tsumu-3eb2a',
    storageBucket: 'tsumu-3eb2a.appspot.com',
    messagingSenderId: '511504650679',
    appId: '1:511504650679:web:a1caaf3741ecb9ade41832',
    measurementId: 'G-M3Y71H0KHZ',
  },
  algolia: {
    appId: 'GR9A7DVRZD',
    searchKey: 'd05ef322f558ae432e1e771c894dc913',
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
