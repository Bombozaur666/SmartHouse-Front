import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from 'src/app/models/device.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-devices-list',
  templateUrl: '../../shared/element-list/element-list.component.html',
  styleUrls: ['../../shared/element-list/element-list.component.css']

})
export class DevicesListComponent implements OnInit, OnDestroy{
  protected readonly addNewButton: string = 'New Device';
  protected elementList: Device[] = [];
  private subscriptionFetch: Subscription = Subscription.EMPTY;
  private subscriptionDevice: Subscription = Subscription.EMPTY;
  protected error: string|null = null;
  protected isFetching:boolean = false;
  protected readonly bodyEl: string = 'type';

  

  constructor(private dev: DeviceService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.onFetch();
  }
  onFetch() {
    this.isFetching=true;
    this.subscriptionDevice = this.dev.devicesChanged.subscribe(
      {
        next: data => {
          this.elementList = data;
        }   
      }
    );
    
    this.subscriptionFetch = this.dev.fetchDevices().subscribe(
      {
        next: () => {
          this.elementList = this.dev.getDevices();
          this.isFetching = false;
        }, 
        error: error => {
          this.error = error.message;
          this.isFetching = false;
        }      
      }
    );
  }

  onNewElement(): void {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onRefresh(): void {
    this.onFetch();
  }

  ngOnDestroy(): void {
    this.subscriptionFetch.unsubscribe();
    this.subscriptionDevice.unsubscribe();
  }
}
