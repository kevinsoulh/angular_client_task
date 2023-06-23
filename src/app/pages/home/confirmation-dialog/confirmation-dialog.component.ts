import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface ConfirmationOutput{
  type: string;
  data: any;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<ConfirmationDialogComponent>) {}
  
  submitConfirmation() {
    this.matDialogRef.close({
      type: "submit",
      data: true,
    } as ConfirmationOutput)
  }
}