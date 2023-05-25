import { Component } from '@angular/core';
import { HomeService } from "./home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  id?: string;
  key?: string;
  userId?: string;
  vehicleVin?: number;
  make?: string;
  model?: string;
  year?: string;
  mileage?: string;
  registrationNumber?: number;
  description?: string;
  dateOfDiscovery?: string;

  readonly allowedPageSizes = [5, 10, 20, 30, 40, 50, 'all'];

  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];

  displayMode: string = 'full';

  showPageSizeSelector: boolean = true;

  showInfo: boolean = true;

  showNavButtons: boolean = true;

  dataSource: any = [];

  constructor(private homeService: HomeService) {
    this.loadClaims();
  }

  public loadClaims() {
    this.homeService.getClaims().subscribe(
      response => {
        this.dataSource = response;
      }
    )
  }

  public deleteClaim(data: any) {
    this.homeService.deleteClaim(encodeURIComponent(data.data.id)).subscribe(
      response => {
        this.loadClaims();
      }
    )
  }

  customizeColumns(columns: { width: number; }[]) {
    columns[0].width = 100;
  }

  get isCompactMode() {
    return this.displayMode === 'compact';
  }

  onSavingHandler(e: any) {
    const data = e.changes[0].data;

    console.log(data)
  }
}
