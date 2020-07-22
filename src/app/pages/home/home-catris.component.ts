import {Component, OnInit} from '@angular/core';
import {HomeComponent} from '../../../lib/pages/home/home.component';


@Component({
  selector: 'app-home-catris',
  templateUrl: './home-catris.component.html',
  styleUrls: ['./home-catris.component.css']
})
export class CatRIsHomeComponent extends HomeComponent implements OnInit {

  public baseIconURI = '../../../assets/images/icons/';

  getSubcategoriesIds(parent: string, type: string) {
    let idsArray: string[];
    this.resourceService.getSubcategoriesIdsFromSuperCategory(parent, type).subscribe(
      res => idsArray = res,
      error => console.log(error),
      () => {
        if (type === 'SCIENTIFIC_DOMAIN') {
          return this.router.search({scientific_subdomains: idsArray});
        } else {
          return this.router.search({subcategories: idsArray});
        }
      }
    );
  }
}
