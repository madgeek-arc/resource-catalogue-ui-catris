// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  beta: false,
  MATOMO_URL: 'https://www.portal.catris.eu/matomo/',
  MATOMO_SITE: 2,
  FAQ_ENDPOINT: 'https://dl105.madgik.di.uoa.gr/faq/api',
  API_ENDPOINT: '/eic-registry', // to change the end point go to proxy.conf.json file
  STATS_ENDPOINT: '',
  API_TOKEN_ENDPOINT: 'https://aai.eosc-portal.eu/catris-api/',
  projectName: 'CatRIS',
  projectMail: 'support@catris.eu',
  serviceORresource: 'Service',
  hasUserConsent: true,
  privacyPolicyURL: 'https://www.portal.catris.eu/support/privacy-policy',
  marketplaceBaseURL: '',
  showHelpContent: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
