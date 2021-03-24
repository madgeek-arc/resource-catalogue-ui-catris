import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from '../lib/pages/home/home.component';
import {SharedModule} from '../lib/shared/shared.module';
import {AppRoutingModule} from './app.routing';
import {AuthenticationService} from '../lib/services/authentication.service';
import {CanActivateViaAuthGuard} from '../lib/services/can-activate-auth-guard.service';
import {NavigationService} from '../lib/services/navigation.service';
import {ResourceService} from '../lib/services/resource.service';
import {CanActivateViaPubGuard} from '../lib/services/can-activate-pub-guard.service';
import {BreadcrumbsComponent} from '../lib/shared/breadcrumbs/breadcrumbs.component';
import {FeedbackComponent} from '../lib/shared/feedback/feedback.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ReusableComponentsModule} from '../lib/shared/reusablecomponents/reusable-components.module';
import {ServiceProviderService} from '../lib/services/service-provider.service';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {ChartModule} from 'angular2-highcharts';
import {SupportModule} from '../lib/pages/support/support.module';
import {UserService} from '../lib/services/user.service';
import {ComparisonService} from '../lib/services/comparison.service';
import {UserModule} from '../lib/pages/user/user.module';
import {ServiceLandingPageComponent} from '../lib/pages/landingpages/service/service-landing-page.component';
import {BrowseCategoriesComponent} from '../lib/pages/browsecategories/browse-categories.component';
import {SearchComponent} from '../lib/pages/search/search.component';
import {StatsComponent} from '../lib/pages/stats/stats.component';
import {CompareServicesComponent} from '../lib/pages/compare/compare-services.component';
import {MeasurementsComponent} from '../lib/pages/indicators/measurements.component';
import {IndicatorFromComponent} from '../lib/pages/indicators/indicator-from.component';
import {AuthenticationInterceptor} from '../lib/services/authentication-interceptor';
import {CookieLawModule} from '../lib/shared/reusablecomponents/cookie-law/cookie-law.module';
import {EmailService} from '../lib/services/email.service';
import {TreeviewModule} from 'ngx-treeview';
import {CatRIsFooterComponent} from './shared/footer/footer.component';
import {CatRIsTopmenuComponent} from './shared/topmenu/topmenu-catris.component';
import {SideElementsComponent} from './shared/sideelements/side-elements.component';
import {CatRIsHomeComponent} from './pages/home/home-catris.component';
import {TopMenuComponent} from '../lib/shared/topmenu/topmenu.component';
import {FooterComponent} from '../lib/shared/footer/footer.component';
import {MatomoModule} from 'ngx-matomo';
import {LMarkdownEditorModule} from 'ngx-markdown-editor';
import {MarkdownModule} from 'ngx-markdown';


declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
  require('highcharts/modules/heatmap')(hc);
  require('highcharts/modules/map')(hc);
  require('../lib/assets/js/europe.js')(hc);
  require('../lib/assets/js/world.js')(hc);
  require('highcharts/modules/drilldown')(hc);
  require('highcharts/modules/exporting')(hc);
  require('highcharts/modules/offline-exporting')(hc);
  require('highcharts/modules/export-data')(hc);
  return hc;
}

@NgModule({
  declarations: [
    // MAIN
    AppComponent,
    BrowseCategoriesComponent,
    CompareServicesComponent,
    HomeComponent,
    CatRIsHomeComponent,
    SearchComponent,
    StatsComponent,
    ServiceLandingPageComponent,
    // PERSISTENT
    TopMenuComponent,
    CatRIsTopmenuComponent,
    // BreadcrumbsComponent,
    FooterComponent,
    CatRIsFooterComponent,
    SideElementsComponent,
    FeedbackComponent,
    // INDICATORS
    MeasurementsComponent,
    IndicatorFromComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReusableComponentsModule,
    SharedModule,
    TreeviewModule.forRoot(),
    SupportModule,
    UserModule,
    ChartModule,
    AngularFontAwesomeModule,
    CookieLawModule,
    MatomoModule,
    AppRoutingModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    AuthenticationService,
    ComparisonService,
    CanActivateViaAuthGuard,
    CanActivateViaPubGuard,
    NavigationService,
    ResourceService,
    UserService,
    ServiceProviderService,
    EmailService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    DatePipe
  ],
  exports: [
    CatRIsFooterComponent,
    CatRIsTopmenuComponent,
    BreadcrumbsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
