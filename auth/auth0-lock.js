var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
  auth: {
    redirectUrl: config.callbackURL,
    responseType: 'token',
    params: {
      scope: 'openid email user_metadata profile'
    }
  },
  theme: {
    logo: config.logoURL,
    primaryColor: '#42BFB4'
  },
  additionalSignUpFields: [
    {
      name: 'firstname',
      placeholder: 'Fornavn'
    },
    {
      name: 'lastname',
      placeholder: 'Efternavn'
    }
  ],
  allowForgotPassword: true,
  allowShowPassword: true,
  rememberLastLogin: true,
  initialScreen: config.initialScreen,
  allowedConnections: ['Username-Password-Authentication', 'facebook'],
  language: 'da',
  languageDictionary: {
    error: {
      login: {
        'lock.fallback': 'Vi beklager, men der skete en fejl ved login. Prøv igen.',
        'lock.invalid_email_password': 'Forkert e-mail eller adgangskode',
        'lock.network': 'Vi kunne ikke få forbindelse til serveren. Kontroller venligst din forbindelse og prøv igen.',
        'lock.unauthorized': 'Denne bruger har ikke adgang.'
      }
    },
    success: {
      forgotPassword: 'Vi har sendt dig en e-mail med et link til at nulstille dit kodeord.'
    },
    blankErrorHint: 'Du mangler at skrive noget',
    emailInputPlaceholder: 'email@email.com',
    loginSubmitLabel: 'Log ind',
    passwordInputPlaceholder: 'Kodeord',
    title: 'Initiativet',
    forgotPasswordTitle: '',
    showPassword: 'Vis kodeord',
    loginLabel: 'Log ind',
    signUpLabel: 'Opret bruger',
    signUpSubmitLabel: 'Opret bruger',
    databaseAlternativeSignUpInstructions: 'eller',
    databaseEnterpriseAlternativeLoginInstructions: 'eller',
    loginWithLabel: 'Log ind med %s',
    signUpWithLabel: 'Opret bruger med %s',
    forgotPasswordAction: 'Glemt kodeord?',
    forgotPasswordInstructions: 'Indtast din e-mail. Vi sender dig en e-mail med et link til at nulstille dit kodeord.',
    lastLoginInstructions: 'Sidste gang loggede du ind som',
    notYourAccountAction: 'Er det ikke din konto?'
  }
});

lock.show();
