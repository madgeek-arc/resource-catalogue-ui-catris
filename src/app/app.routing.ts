import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseCategoriesComponent} from '../lib/pages/browsecategories/browse-categories.component';
import {CompareServicesComponent} from '../lib/pages/compare/compare-services.component';
import {CommonModule} from '@angular/common';
import {SearchComponent} from '../lib/pages/search/search.component';
import {CanActivateViaAuthGuard} from '../lib/services/can-activate-auth-guard.service';
import {ServiceLandingPageComponent} from '../lib/pages/landingpages/service/service-landing-page.component';
import {ForbiddenPageComponent} from '../lib/shared/forbidden-page/forbidden-page.component';
import {NotFoundPageComponent} from '../lib/shared/not-found-page/not-found-page.component';
import {CatRIsHomeComponent} from './pages/home/home-catris.component';
// import {ProviderModule} from './pages/provider/provider.module';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CatRIsHomeComponent,
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      breadcrumb: 'Search'
    }
  },
  // {
  //   path: 'statistics',
  //   component: StatsComponent,
  //   data: {
  //     breadcrumb: 'Statistics'
  //   }
  // },
  {
    path: 'compare',
    component: CompareServicesComponent,
    data: {
      breadcrumb: 'Compare'
    }
  },
  {
    path: 'browseCategories',
    component: BrowseCategoriesComponent,
    data: {
      breadcrumb: 'Browse'
    }
  },


  {
    path: 'provider',
    loadChildren: () => import('../lib/pages/provider/provider.module').then(m => m.ProviderModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../lib/pages/provider/dashboard/provider-dashboard.module').then(m => m.ProviderDashboardModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'resource-dashboard',
    loadChildren: () => import('../lib/pages/provider/dashboard/resource-dashboard/resource-dashboard.module').then(m => m.ResourceDashboardModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'dashboard/:providerId/resource-dashboard',
    loadChildren: () => import('../lib/pages/provider/dashboard/resource-dashboard/resource-dashboard.module').then(m => m.ResourceDashboardModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'dashboard/:providerId/shared-resource-dashboard',
    loadChildren: () => import('../lib/pages/provider/dashboard/resource-dashboard/shared-resource-dashboard.module').then(m => m.SharedResourceDashboardModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../lib/pages/provider/dashboard/provider-dashboard.module').then(m => m.ProviderDashboardModule),
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/catris-support.module').then(m => m.CatrisSupportModule)
  },

  {
    path: 'service/:id',
    component: ServiceLandingPageComponent,
    data: {
      breadcrumb: 'Service'
    }
  },
  {
    path: 'service/:id/:version',
    component: ServiceLandingPageComponent,
    data: {
      breadcrumb: 'Service'
    }
  },

  // {
  //   path: 'measurements/service/:id',
  //   component: MeasurementsComponent,
  //   data: {
  //     breadcrumb: 'Service Measurements'
  //   }
  // },
  // {
  //   path: 'newIndicator',
  //   component: IndicatorFromComponent,
  //   data: {
  //     breadcrumb: 'New Indicator'
  //   }
  // },
  {
    path: 'assets/files/:fileName',
    children: [ ]
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent,
    data: {
      breadcrumb: 'Forbidden'
    }
  },
  {
    path: 'notFound',
    component: NotFoundPageComponent,
    data: {
      breadcrumb: 'Not Found'
    }
  },
  {
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Not Found'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
