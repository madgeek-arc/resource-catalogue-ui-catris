import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReusableComponentsModule} from '../../shared/reusablecomponents/reusable-components.module';
import {SharedModule} from '../../shared/shared.module';
import {UserRouting} from './user.routing';
import { HighchartsChartModule } from 'highcharts-angular';
import {MyFavouritesComponent} from './favourites/my-favourites.component';
import {RecommendationsComponent} from './recommendations/recommendations.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRouting,
        ReusableComponentsModule,
        HighchartsChartModule,
    ],
  declarations: [
    MyFavouritesComponent,
    RecommendationsComponent
  ]
})
export class UserModule {
}
