import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {providerDescMap, serviceDescMap} from '../lib/pages/provider-resources/services.description';
import {environment} from '../environments/environment';
import {MatomoInjector} from 'ngx-matomo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginOrRegister = false;
  breadcrumbs: string[] = [];

  constructor(public router: Router, private matomoInjector: MatomoInjector) {
    this.matomoInjector.init(environment.MATOMO_HOST, environment.MATOMO_SITE);
  }

  ngOnInit() {
    this.router.events.subscribe((evt: any) => {
      if (evt.url) {
        this.breadcrumbs = evt.url.split(/\//);
      }
      this.breadcrumbs[0] = 'Home';

      // this.isLoginOrRegister = ["/signUp", "/signIn"].indexOf(evt.url) >= 0;
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.overrideDescMaps();
  }

  isDashboardRoute() {
    // console.log('Is home route? Route is: ' + this.router.url);
    return (this.router.url.includes('dashboard'));
  }

  overrideDescMaps() {
    // Catris specific desc -->
    providerDescMap
    .set('legalEntityDesc', {mandatory: true, label: 'Legal Entity', desc: 'Is the Service Provider an independent Legal Entity?'})
    .set('providerScientificDomainDesc', {mandatory: false, label: 'Scientific Domain', placeholder: 'Select scientific domain...', desc: 'Scientific discipline(s) that relate to the Provider’s field of activities.'})
    .set('providerScientificSubdomainsDesc', {mandatory: false, label: 'Scientific Subdomain', placeholder: 'Select scientific subdomain after selecting scientific domain...', desc: 'Scientific sub-discipline(s) that relate to the Provider’s field of activities.'})
    .set('hostingLegalEntityDesc', {mandatory: false, label: 'Hosting Legal Entity', placeholder: 'Write hosting legal entity...', desc: 'For Service Providers embedded in an organisation/institution legally hosting it (University, Research Performing Organisation, Research Institute, etc.) enter the name of the legal hosting entity full name in English without abbreviations.'})
    .set('participatingCountriesDesc', {mandatory: false, label: 'Participating Countries', addTitle: 'Participating Country', placeholder: 'Select participating countries...', desc: 'Providers that are funded by several countries (including distributed RIs) should list here all supporting countries (including the Coordinating country).'})
    .set('affiliationDesc', {mandatory: false, label: 'Affiliations', addTitle: 'Affiliation', placeholder: 'Write affiliations...', desc: 'Providers that are members or nodes of a distributed Research Infrastructure (national, European, ESFRI, etc.) should list the coordinating distributed RI(s) here'})
    .set('networksDesc', {mandatory: false, label: 'Networks', addTitle: 'Network', placeholder: 'Select network...', desc: 'Providers that are members of formal or informal networks of Research Infrastructures or Core Facilities should list them here.'})
    .set('ESFRITypeDesc', {mandatory: false, label: 'ESFRI Type', placeholder: 'Select ESFRI type...', desc: 'Indicate if/how the SP participates in the current ESFRI Roadmap project or landmark.'})
    .set('merilScientificDomainsDesc', {mandatory: false, label: 'MERIL Scientific Domain', placeholder: 'Select MERIL scientific domain...', desc: 'MERIL scientific domain classification.'})
    .set('merilScientificSubdomainsDesc', {mandatory: false, label: 'MERIL Scientific Subdomain', placeholder: 'Select MERIL scientific subdomain after selecting MERIL scientific domain...', desc: 'MERIL scientific subdomain classification.'})
    .set('nationalRoadmapsDesc', {mandatory: false, label: 'National Roadmaps', addTitle: 'National Roadmap', placeholder: 'Write national roadmaps...', desc: 'Name the National roadmaps the Provider participates in.'})
    ;
    serviceDescMap
    .set('descriptionDesc', {mandatory: true,  label: 'Description', placeholder: 'Write a description...', desc: 'A high-level description of the Service, its functionalities, access and benefits it offers to users/customers and the main communities of users/customers it serves.'})
    .set('accessModeDesc', {mandatory: false, label: 'Access Mode', addTitle: 'Access Mode', placeholder: 'Select access mode...', desc: 'Eligibility/criteria for granting access to the Service to users (excellence-driven, market driven, wide).'})
    .set('accessPolicyDesc', {mandatory: false, label: 'Access Policy', placeholder: 'access policy URL', desc: 'Webpage with information for users about the access policies and conditions that apply to the Service.'})
    ;
    // replaced 'resource' with 'service' -->
    providerDescMap
      .set('fullNameDesc', {mandatory: true, label: 'Name', placeholder: 'Write full name...', desc: 'Full Name of the Provider/Organisation offering Services and acting as main contact point for the Services.'});
    serviceDescMap
      // Basic Information //
      .set('nameDesc', {mandatory: true, label: 'Name', placeholder: 'Write full name...', desc: 'Brief and descriptive name of the Service as assigned by the Provider.'})
      .set('resourceOrganisationDesc', {mandatory: true, label: 'Service Organisation', placeholder: 'Select service organisation...', desc: 'The name (or abbreviation) of the organisation that manages or delivers the service, or that coordinates service delivery in a federated scenario.'})
      .set('resourceProvidersDesc', {mandatory: false, label: 'Service Providers', addTitle: 'Service Provider', placeholder: 'Select service provider...', desc: 'The name(s) (or abbreviation(s)) of Provider(s) that manage or deliver the Service in federated scenarios.'})
      .set('webpageDesc', {mandatory: true,  label: 'Webpage', placeholder: 'Write webpage url...', desc: 'Webpage with information about the Service usually hosted and maintained by the Provider.'})
      // Marketing Information //
      .set('taglineDesc', {mandatory: true,  label: 'Tagline', placeholder: 'Write a tagline...', desc: 'Short catchphrase for marketing and advertising purposes. It will be usually displayed close to the Service name and should refer to the main value or purpose of the Service.'})
      .set('logoDesc', {mandatory: true,  label: 'Logo', placeholder: 'Link to the logo', desc: 'Link to the logo/visual identity of the Service. The logo will be visible at the Portal. If there is no specific logo for the Service the logo of the Provider may be used. Go to the Service Provider\'s website --> Right Click on the Service Provider\'s logo on the website --> Select "Copy Image Link" --> Paste it in the below field.'})
      .set('multimediaDesc', {mandatory: false, label: 'Multimedia', addTitle: 'Multimedia', placeholder: 'Write link to multimedia...', desc: 'Link to video, screenshots or slides showing details of the Service.'})
      .set('useCasesDesc', {mandatory: false, label: 'Use Cases', addTitle: 'Use Case', placeholder: 'Write use case...', desc: 'Link to use cases supported by this Service.'})
      // Classification Information //
      .set('scientificDomainDesc', {mandatory: true,  label: 'Scientific Domain', placeholder: 'Select scientific domain...', desc: 'The branch of science, scientific discipline that is related to the Service.'})
      .set('scientificSubDomainDesc', {mandatory: true,  label: 'Scientific Subdomain', placeholder: 'Select scientific subdomain after selecting scientific domain...', desc: 'The subbranch of science, scientific subdiscipline that is related to the Service.'})
      .set('categoryDesc', {mandatory: true,  label: 'Category', desc: 'A named group of Services that offer access to the same type of Services.'})
      .set('subcategoryDesc', {mandatory: true,  label: 'Subcategory', desc: 'A named group of Services that offer access to the same type of Services, within the defined Service category.'})
      .set('targetUsersDesc', {mandatory: true,  label: 'Target Users', addTitle: 'Target User', placeholder: 'Select target users...', desc: 'Type of users that commissions a Provider to deliver a Service.'})
      .set('accessTypeDesc', {mandatory: false, label: 'Access Type', addTitle: 'Access Type', placeholder: 'Select access type...', desc: 'The way a user can access the Service (Remote, Physical, Virtual, etc.).'})
      .set('tagsDesc', {mandatory: false, label: 'Tags', addTitle: 'Tag', placeholder: 'Write tag...', desc: 'Keywords associated to the Service to simplify search by relevant keywords.'})
      // Geographical and Language Availability Information //
      .set('geographicalAvailabilityDesc', {mandatory: true, label: 'Geographical Availability', addTitle: 'Geographical Availability', placeholder: 'Select geographical availability...', desc: 'Locations where the Service is offered.'})
      .set('languageAvailabilitiesDesc', {mandatory: true, label: 'Language Availability', addTitle: 'Language Availability', placeholder: 'Select language availability...', desc: 'Languages of the (user interface of the) Service.'})
      // Location Information //
      .set('resourceGeographicLocationsDesc', {mandatory: false, label: 'Geographic Location', addTitle: 'Geographic Locations', placeholder: 'Select geographic locations...', desc: 'List of geographic locations where data, samples, etc. are stored and processed when offering the Service.'})
      // Contact Information --> //
      // Main Contact/Service Owner
      .set('mainContactFirstNameDesc', {mandatory: true,  label: 'First Name ', placeholder: 'Write first name...', desc: 'First Name of the Service\'s main contact person/Service manager.'})
      .set('mainContactLastNameDesc', {mandatory: true,  label: 'Last Name', placeholder: 'Write last name...', desc: 'Last Name of the Service\'s main contact person/Service manager.'})
      .set('mainContactEmailDesc', {mandatory: true,  label: 'Email', placeholder: 'Write email...', desc: 'Email of the Service\'s main contact person/Service manager.'})
      .set('mainContactPhoneDesc', {mandatory: false, label: 'Phone', placeholder: 'Write phone...', desc: 'Telephone of the Service\'s main contact person/Service manager.'})
      .set('mainContactPositionDesc', {mandatory: false, label: 'Position', placeholder: 'Write position...', desc: 'Position of the Service\'s main contact person/Service manager.'})
      .set('mainContactOrganisationDesc', {mandatory: false, label: 'Organisation', placeholder: 'Write organisation...', desc: 'The organisation to which the Service\'s main contact person/Service manager is affiliated.'})
      // Public Contact //
      .set('publicContactFirstNameDesc', {mandatory: false, label: 'First Name', placeholder: 'Write first name...', desc: 'First Name of the Service\'s contact person to be displayed publicly at the Portal.'})
      .set('publicContactLastNameDesc', {mandatory: false, label: 'Last Name', placeholder: 'Write last name...', desc: 'Last Name of the Service\'s contact person to be displayed publicly at the Portal.'})
      .set('publicContactEmailDesc', {mandatory: true,  label: 'Email', placeholder: 'Write email...', desc: 'Email of the Service\'s contact person or a generic email of the Provider to be displayed publicly at the Portal.'})
      .set('publicContactPhoneDesc', {mandatory: false, label: 'Phone', placeholder: 'Write phone...', desc: 'Telephone of the Service\'s contact person to be displayed publicly at the Portal.'})
      .set('publicContactPositionDesc', {mandatory: false, label: 'Position', placeholder: 'Write position...', desc: 'Position of the Service\'s contact person to be displayed publicly at the Portal.'})
      .set('publicContactOrganisationDesc', {mandatory: false, label: 'Organisation', placeholder: 'Write organisation...', desc: 'The organisation to which the Service\'s public contact person is affiliated.'})
      // Other
      .set('helpdeskEmailDesc', {mandatory: true,  label: 'Helpdesk Email', placeholder: 'Write email...', desc: 'The email to ask more information from the Provider about the Service.'})
      .set('securityContactEmailDesc', {mandatory: true,  label: 'Security Contact Email', placeholder: 'Write email...', desc: 'The email to contact the Provider for critical security issues about the Service.'})
      // <-- Contact Information //
      // Maturity Information //
      .set('technologyReadinessLevelDesc', {mandatory: true,  label: 'Technology Readiness Level', placeholder: 'Select technology readiness level...', desc: 'The Technology Readiness Level of the Service.'})
      .set('phaseDesc', {mandatory: false, label: 'Life Cycle Status', placeholder: 'Write life cycle status...', desc: 'Status of the Service life-cycle.'})
      .set('certificationsDesc', {mandatory: false, label: 'Certifications', addTitle: 'Certification', placeholder: 'Write certifications...', desc: 'List of certifications obtained for the Service (including the certification body or URL if available).'})
      .set('standardsDesc', {mandatory: false, label: 'Standards', addTitle: 'Standard', placeholder: 'Write standards...', desc: 'List of standards supported by the Service.'})
      .set('openSourceTechnologiesDesc', {mandatory: false, label: 'Open Source Technologies', addTitle: 'Open Source Technology', placeholder: 'Write open source technologies...', desc: 'List of open source technologies supported by the Service.'})
      .set('versionDesc', {mandatory: false, label: 'Version', placeholder: 'Write version...', desc: 'Version of the Service that is in force.'})
      .set('lastUpdateDesc', {mandatory: false, label: 'Last Update', placeholder: 'Write last update...', desc: 'Date of the latest update of the Service.'})
      .set('changeLogDesc', {mandatory: false, label: 'Change Log', addTitle: 'Change Log', placeholder: 'Write change log...', desc: 'Summary of the Service features updated from the previous version.'})
      // Dependencies Information //
      .set('requiredServicesDesc', {mandatory: false, label: 'Required Services', addTitle: 'Required Service', placeholder: 'Select required services...', desc: 'List of other Services required to use this Service.'})
      .set('relatedServicesDesc', {mandatory: false, label: 'Related Services', addTitle: 'Related Service', placeholder: 'Select related services...', desc: 'List of other Services that are commonly used with this Service.'})
      .set('relatedPlatformsDesc', {mandatory: false, label: 'Related Platforms', addTitle: 'Related Platform', placeholder: 'Write related platform...', desc: 'List of suites or thematic platforms in which the Service is engaged or Providers (Provider groups) contributing to this Service.'})
      // Attribution Information //
      .set('fundingBodyDesc', {mandatory: false, label: 'Funding Body', addTitle: 'Funder', placeholder: 'Select funding body...', desc: 'Name of the funding body that supported the development and/or operation of the Service.'})
      .set('fundingProgramDesc', {mandatory: false, label: 'Funding Program', addTitle: 'Funding Program', placeholder: 'Select funding program...', desc: 'Name of the funding program that supported the development and/or operation of the Service.'})
      .set('grantProjectNameDesc', {mandatory: false, label: 'Grant/Project Name', addTitle: 'Grant/Project Name', placeholder: 'Write grant/project name...', desc: 'Name of the project that supported the development and/or operation of the Service.'})
      // Management Information //
      .set('helpdeskPageDesc', {mandatory: false, label: 'Helpdesk Page', placeholder: 'helpdesk page URL', desc: 'The URL to a webpage to ask more information from the Provider about this Service.'})
      .set('userManualDesc', {mandatory: false, label: 'User Manual', placeholder: 'user manual URL', desc: 'Link to the Service user manual and documentation.'})
      .set('termsOfUseDesc', {mandatory: false, label: 'Terms Of Use', placeholder: 'terms of use URL', desc: 'Webpage describing the rules, Service conditions and usage policy which one must agree to abide by in order to use the Service.'})
      .set('privacyPolicyDesc', {mandatory: false, label: 'Privacy Policy', placeholder: 'privacy policy URL', desc: 'Link to the privacy policy applicable to the Service.'})
      .set('serviceLevelDesc', {mandatory: false, label: 'Service Level', placeholder: 'service level URL', desc: 'Webpage with the information about the levels of performance of the Service that a Provider is expected to deliver.'})
      .set('trainingInformationDesc', {mandatory: false, label: 'Training Information', placeholder: 'training information URL', desc: 'Webpage to training information on the Service.'})
      .set('statusMonitoringDesc', {mandatory: false, label: 'Status Monitoring', placeholder: 'status monitoring URL', desc: 'Webpage with monitoring information about the Service.'})
      .set('maintenanceDesc', {mandatory: false, label: 'Maintenance', placeholder: 'maintenance URL', desc: 'Webpage with information about planned maintenance windows for the Service.'})
      // Access and Order Information //
      .set('orderDesc', {mandatory: false, label: 'Order', placeholder: 'order URL', desc: 'Webpage through which an order for the Service can be placed.'})
      // Financial Information //
      .set('paymentModelDesc', {mandatory: false, label: 'Payment Model', placeholder: 'payment model URL', desc: 'Webpage with the supported payment models for the Service and restrictions that apply to each of them.'})
      .set('pricingDesc', {mandatory: false, label: 'Pricing', placeholder: 'pricing URL', desc: 'Webpage with the information on the price scheme for the Service in case the customer is charged for.'})
    ;
  }
}
