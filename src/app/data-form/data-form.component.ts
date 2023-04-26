import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../service/rest-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {
  myForm: any = FormGroup;

  destination: string[] = [
    'India', 'Africa', 'Europe'
  ]

  constructor(private fb: FormBuilder, private formservice: RestApiService, private _dialogRef: MatDialogRef<DataFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      destination: ['', Validators.required],
      numOfTravelers: ['', [Validators.required, Validators.min(1)]],
      budgetPerPerson: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.myForm.patchValue(this.data)
  }

  // Function to handle form submission
  onSubmit() {
    if (this.myForm.valid) {
      const formValue = this.myForm.value;
      if (this.data) {
        this.formservice.updateTravelDetails(this.data.id, this.myForm.value).subscribe({
          next: (val: any) => {
            alert("Traveler details updated!");
            this._dialogRef.close(true)
          }
        })
      }else{
        this.saveFormData(formValue);
      }
    }
  }

  saveFormData(formData: any) {
    console.log(formData)
    this.formservice.saveDetails(formData).subscribe({
      next: (result: any) => {
        alert("Details added successfully")
        this._dialogRef.close(true)
      }, error: (err: any) => {
        console.error(err);
      }
    })
  }
}
