import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { formHelp } from '../home.helper';

export interface ClaimCreatorOutput {
  type: string;
  data: any;
}

@Component({
  selector: 'app-claim-creator',
  templateUrl: './claim-creator.component.html',
  styleUrls: ['./claim-creator.component.scss']
})
export class ClaimCreatorComponent {
  form!: FormGroup;
  formHelp = formHelp;

  mode?: 'create' | 'edit';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<ClaimCreatorComponent>, private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    if(this.data) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }

    this.form = new FormGroup({
      vehicleVin: new FormControl(''),
      make: new FormControl(''),
      model: new FormControl(''),
      mileage: new FormControl(''),
      registrationNumber: new FormControl(''),
      year: new FormControl(''),
      dateOfDiscovery: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl(false)
    });

    this.loadForm();
  }

  public loadForm() {
    const formData = JSON.parse(JSON.stringify(this.data ?? {}));
    this.form.patchValue(formData);
  }

  submitForm() {
    this.form.markAllAsTouched();
    if(!this.form.valid) {
      console.log('Form is invalid.', this.form.errors);
      return;
    }

    const submitValue = {};
    // console.log('submitValue', submitValue);
    Object.assign(submitValue, this.data);
    // console.log('submitValue', submitValue);
    Object.assign(submitValue, this.form.value);
    // console.log('submitValue', submitValue);

    this.matDialogRef.close({
      type: "submit",
      data: submitValue
    } as ClaimCreatorOutput)
  }
}
