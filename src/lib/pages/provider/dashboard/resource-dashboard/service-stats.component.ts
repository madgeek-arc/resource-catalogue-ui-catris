import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import {Provider, ProviderBundle, Service, ServiceHistory} from '../../../../domain/eic-model';
import {AuthenticationService} from '../../../../services/authentication.service';
import {NavigationService} from '../../../../services/navigation.service';
import {ResourceService} from '../../../../services/resource.service';
import {UserService} from '../../../../services/user.service';
import {Paging} from '../../../../domain/paging';
import {ServiceProviderService} from '../../../../services/service-provider.service';
import {map} from 'rxjs/operators';
import {zip} from 'rxjs/internal/observable/zip';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-stats.component.html',
  styleUrls: ['./service-stats.component.css']
})
export class ServiceStatsComponent implements OnInit, OnDestroy {

  // _marketplaceBaseURL = environment.marketplaceBaseURL;
  serviceORresource = environment.serviceORresource;
  projectName = environment.projectName;

  public service: Service;
  public errorMessage: string;
  private sub: Subscription;

  public EU: string[];
  public WW: string[];

  serviceVisitsOptions: any = null;
  serviceRatingsOptions: any = null;
  serviceFavouritesOptions: any = null;
  serviceAddsToProjectOptions: any = null;
  serviceMapOptions: any = null;

  serviceHistory: Paging<ServiceHistory>;

  statisticPeriod: string;

  constructor(private route: ActivatedRoute, private router: NavigationService, private resourceService: ResourceService,
              private authenticationService: AuthenticationService, private userService: UserService,
              private providerService: ServiceProviderService) {
  }

  ngOnInit() {
    this.statisticPeriod = 'MONTH';
    // this.sub = this.route.params.subscribe(params => {
    this.sub = this.route.parent.params.subscribe(params => {
      zip(
        this.resourceService.getEU(),
        this.resourceService.getWW(),
        this.resourceService.getService(params['resourceId'])
      ).subscribe(suc => {
          this.EU = <string[]>suc[0];
          this.WW = <string[]>suc[1];
          this.service = <Service>suc[2];
          this.getDataForService(this.statisticPeriod);

        },
        err => {
          if (err.status === 404) {
            this.router.go('/404');
          }
          this.errorMessage = 'An error occurred while retrieving data for this service. ' + err.error;
        }
      );
    });
  }

  getDataForService(period: string, dontGetServices?: boolean) {

    this.setCountriesForService(this.service.geographicalAvailabilities);

    this.resourceService.getVisitsForService(this.service.id, period).pipe(
      map(data => {
        // THESE 3 weird lines should be deleted when pgl makes everything ok :)
        return Object.entries(data).map((d) => {
          return [new Date(d[0]).getTime(), d[1]];
        }).sort((l, r) => l[0] - r[0]);
      })).subscribe(
      data => this.setVisitsForService(data),
      err => {
        this.errorMessage = 'An error occurred while retrieving visits for this service. ' + err.error;
      }
    );

    if (this.projectName === 'CatRIS') {
      this.resourceService.getFavouritesForService(this.service.id, period).pipe(
        map(data => {
          // THESE 3 weird lines should be deleted when pgl makes everything ok :)
          return Object.entries(data).map((d) => {
            return [new Date(d[0]).getTime(), d[1]];
          }).sort((l, r) => l[0] - r[0]);
        })).subscribe(
        data => this.setFavouritesForService(data),
        err => {
          this.errorMessage = 'An error occurred while retrieving favourites for this service. ' + err.error;
        }
      );
    }

    if (this.projectName === 'EOSC') {
      this.resourceService.getAddToProjectForService(this.service.id, period).pipe(
        map(data => {
          // THESE 3 weird lines should be deleted when pgl makes everything ok :)
          return Object.entries(data).map((d) => {
            return [new Date(d[0]).getTime(), d[1]];
          }).sort((l, r) => l[0] - r[0]);
        })).subscribe(
        data => this.setAddsToProjectForService(data),
        err => {
          this.errorMessage = 'An error occurred while retrieving favourites for this service. ' + err.error;
        }
      );
    }

    this.resourceService.getRatingsForService(this.service.id, period).pipe(
      map(data => {
      // console.log('Ratings', data);
      // THESE 3 weird lines should be deleted when pgl makes everything ok :)
      return Object.entries(data).map((d) => {
        return [new Date(d[0]).getTime(), d[1]];
      }).sort((l, r) => l[0] - r[0]);
    })).subscribe(
      data => this.setRatingsForService(data),
      err => {
        this.errorMessage = 'An error occurred while retrieving ratings for this service. ' + err.error;
      }
    );

    if (dontGetServices) {
    } else {
      this.resourceService.getServiceHistory(this.service.id).subscribe(
        searchResults => this.serviceHistory = searchResults,
        err => {
          this.errorMessage = 'An error occurred while retrieving the history of this service. ' + err.error;
        }
      );
    }
  }

  onPeriodChange(event) {
    this.statisticPeriod = event.target.value;
    this.getDataForService(this.statisticPeriod, true);
  }

  setVisitsForService(data: any) {
    if (data) {
      this.serviceVisitsOptions = {
        title: {
          text: 'Number of visits over time'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Number of visits'
          }
        },
        series: [{
          name: 'Visits over time',
          color: '#036166',
          data: data
        }]
      };
    }
  }

  setFavouritesForService(data: any) {
    if (data) {
      this.serviceFavouritesOptions = {
        title: {
          text: 'Number of favorites over time'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Number of favourites'
          }
        },
        series: [{
          name: 'Favourites over time',
          color: '#C36000',
          data: data
        }]
      };

    }
  }

  setAddsToProjectForService(data: any) {
    if (data) {
      this.serviceAddsToProjectOptions = {
        title: {
          text: 'Number of adds to project over time'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Number of adds to project'
          }
        },
        series: [{
          name: 'Adds to project over time',
          color: '#C36000',
          data: data
        }]
      };
    }
  }

  setRatingsForService(data: any) {
    if (data) {
      this.serviceRatingsOptions = {
        title: {
          text: 'Number of ratings over time'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Average rating'
          }
        },
        series: [{
          name: 'Average rating over time',
          color: '#6B0035',
          data: data
        }]
      };

    }
  }

  setCountriesForService(data: any) {
    const places = this.resourceService.expandRegion(JSON.parse(JSON.stringify(data || [])), this.EU, this.WW);

    this.serviceMapOptions = {
      chart: {
        map: 'custom/europe',
        // borderWidth: 1
      },
      title: {
        text: 'Countries serviced by ' + this.service.name
      },
      // subtitle: {
      //     text: 'Demo of drawing all areas in the map, only highlighting partial data'
      // },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Country',
        data: places.map(e => e.toLowerCase()).map(e => [e, 1]),
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          formatter: function () {
            if (this.point.value) {
              return this.point.name;
            }
          }
        },
        tooltip: {
          headerFormat: '',
          pointFormat: '{point.name}'
        }
      }]
    };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleError(error) {
    this.errorMessage = 'System error retrieving service (Server responded: ' + error + ')';
  }
}
