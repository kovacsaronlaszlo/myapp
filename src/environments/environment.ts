// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    baseUrl: 'https://myapp-98de2.firebaseio.com',
    registrationUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser',
    loginUrl: ' https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword',
    apiKey: "AIzaSyBZ0dtHDzl0PMsFq8ODvGlO4_3wOcnvARw",
    authDomain: "myapp-98de2.firebaseapp.com",
    databaseURL: "https://myapp-98de2.firebaseio.com",
    projectId: "myapp-98de2",
    storageBucket: "myapp-98de2.appspot.com",
    messagingSenderId: "738829525075"
  }
};
