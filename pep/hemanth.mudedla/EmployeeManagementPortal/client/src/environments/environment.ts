// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: 'bec0e8e0-2c8f-436c-9813-34661a04443a',
  authority: 'https://login.microsoftonline.com/687f51c3-0c5d-4905-84f8-97c683a5b9d1/',
  redirectUrl: 'http://localhost:4200/home',
  postLogoutRedirectUri: 'http://localhost:4200',
};

export const api = {
  route: 'https://localhost:49155/api/'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
