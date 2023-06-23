import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/login/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationOutput } from "../../../pages/home/confirmation-dialog/confirmation-dialog.component";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  public async signOut(event: any) {

    const confirmationResult: ConfirmationOutput | undefined = await lastValueFrom(this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to sign out?"
    }).afterClosed());

    if(!confirmationResult?.data) return

    await this.authService.signOut();
    this.router.navigateByUrl('/signin').then();
  }
}
