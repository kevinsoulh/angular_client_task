import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule  } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxPopupModule, DxTextBoxModule, DxFormModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';
import { MatDialogModule } from "@angular/material/dialog";
import { ClaimCreatorComponent } from './pages/home/claim-creator/claim-creator.component';
import { UppercasePipe } from './shared/pipes/FormatMiles/uppercase.pipe';
import { ConfirmationDialogComponent } from './pages/home/confirmation-dialog/confirmation-dialog.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormatMilesPipe } from './shared/pipes/FormatMiles/format-miles.pipe';
import { FormatRegNumPipe } from './shared/pipes/FormatRN/format-reg-num.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ClaimCreatorComponent,
    UppercasePipe,
    ConfirmationDialogComponent,
    FormatMilesPipe,
    FormatRegNumPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxPopupModule,
    DxTextBoxModule,
    DxFormModule,
    DxToolbarModule,
    DxButtonModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,

    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
