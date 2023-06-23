import { Component, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from "./home.service";
import { AuthService } from '../login/auth.service';
import { Observable, lastValueFrom } from "rxjs";
import { ClaimCreatorComponent, ClaimCreatorOutput } from './claim-creator/claim-creator.component';
import { ConfirmationDialogComponent, ConfirmationOutput} from "./confirmation-dialog/confirmation-dialog.component";
import { DxDataGridComponent } from 'devextreme-angular';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})

export class HomeComponent {
  id?: string;
  key?: string;
  userId?: string;
  vehicleVin?: number;
  make?: string;
  model?: string;
  year?: number;
  mileage?: string;
  registrationNumber?: number;
  description?: string;
  dateOfDiscovery?: string;

  @ViewChild(DxDataGridComponent) dataGrid?: DxDataGridComponent;

  loaded = false;

  dataSource: any[] = [];

  userName: Observable<string>;

  constructor(private homeService: HomeService, private authService: AuthService, private dialog: MatDialog, private cdr: ChangeDetectorRef, private datePipe: DatePipe, private snackBar: MatSnackBar) {
    this.loadClaims();
    this.userName = this.authService.userName();
  }

  onSearchInputChanged(searchInput: any) {
    this.dataGrid?.instance.searchByText(searchInput.target.value);
  }

  public async loadClaims() {
    this.loaded = false;

    const response = await lastValueFrom(this.homeService.getClaims());

    this.dataSource = response;

    //comment this code below or set it to false to edit the loader
    this.loaded = true;
    this.cdr.detectChanges();
  }

  public async addNewClaim() {

    // show the form
    const formResult: ClaimCreatorOutput | undefined = await lastValueFrom(this.dialog.open(ClaimCreatorComponent).afterClosed());
    // take the return value from the form and submit the claim

    if(formResult?.type !== 'submit')
      return;

    const confirmationResult: ConfirmationOutput | undefined = await lastValueFrom(this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to submit this claim?"
    }).afterClosed());

    if(!confirmationResult?.data) return

    try {
      const result: any = await lastValueFrom(this.homeService.storeClaim(formResult.data));

      if(result?.message) {
        this.snackBar.open(result?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }

      // SUCCESS
      await this.loadClaims();
    } catch(error: any) {
      // ERROR

      if(error?.message) {
        this.snackBar.open(error?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        })
      }
    }
  }

  public async deleteClaim(event: any, data: any) {
    const confirmationResult: ConfirmationOutput | undefined = await lastValueFrom(this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to delete this claim?"
    }).afterClosed());

    if(!confirmationResult?.data) return

    try {
      const result: any = await lastValueFrom(this.homeService.deleteClaim(encodeURIComponent(data.data.id)));

      if(result?.message) {
        this.snackBar.open(result?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }

      await this.loadClaims();
    } catch(error: any) {
      if(error?.message) {
        this.snackBar.open(error?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    }
  }

  public async editClaim(data: any) {
    const claim = data.data;

    // show the form
    const formResult: ClaimCreatorOutput | undefined = await lastValueFrom(this.dialog.open(ClaimCreatorComponent, {
      data: claim
    }).afterClosed());
    // take the return value from the form and update the claim

    if(formResult?.type !== 'submit')
      return;

    const confirmationResult: ConfirmationOutput | undefined = await lastValueFrom(this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to save your changes?"
    }).afterClosed());

    if(!confirmationResult?.data) return

    try {
      const result: any = await lastValueFrom(this.homeService.updateClaim(formResult.data));

      if(result?.message) {
        this.snackBar.open(result?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }

      // SUCCESS
      await this.loadClaims();
    } catch(error: any) {
      // ERROR
      // TODO: show error message
      console.log(error);

      if(error?.message) {
        this.snackBar.open(error?.message, 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    }
  }

  public formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.dataGrid?.instance.repaint();
  }
}
