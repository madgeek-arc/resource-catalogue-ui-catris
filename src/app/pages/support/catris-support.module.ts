import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CatrisSupportRoutingModule} from './catris-support-routing.module';
import {PrivacyPolicyComponent} from './privacypolicy/privacy-policy.component';
import {SupportModule} from '../../../lib/pages/support/support.module';
import {GuidesComponent} from './guides/guides.component';

@NgModule({
  imports: [
    CommonModule,
    SupportModule,
    CatrisSupportRoutingModule,
  ],
  declarations: [
    PrivacyPolicyComponent,
    GuidesComponent
  ],
  providers: []
})
export class CatrisSupportModule {
}
