import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrivacyPolicyComponent} from './privacypolicy/privacy-policy.component';
import {GuidesComponent} from './guides/guides.component';

const supportRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('../../../lib/pages/support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        data: {
          breadcrumb: 'Privacy Policy'
        }
      },
      {
        path: 'guides',
        component: GuidesComponent,
        data: {
          breadcrumb: 'Guides and tutorials'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(supportRoutes)],
  exports: [RouterModule]
})

export class CatrisSupportRoutingModule {
}
