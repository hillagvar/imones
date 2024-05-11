import { Component } from '@angular/core';
import { Company } from '../../../models/company';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../services/contact.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {

  public companyList: Company[] = [];

  public contactForm: FormGroup;

  constructor(private contactService: ContactService, private companyService: CompanyService) {
    this.contactForm = new FormGroup({
      "name": new FormControl(null,[Validators.required, Validators.minLength(2)]),
      "surname": new FormControl(null,[Validators.required, Validators.minLength(2)]),
      "position": new FormControl(null, Validators.required),
      "company": new FormControl(null, Validators.required),
      "phones": new FormArray([
        new FormControl(null, Validators.required)
      ]),
    });

    this.loadCompanies();
  }

  public onSubmit() {
    this.contactService.addContact(this.contactForm.value).subscribe(() => {
      console.log(this.contactForm.value);
      this.contactForm.reset();
      
    })
  }

  private loadCompanies() {
    this.companyService.loadCompanies().subscribe((data) => {
      this.companyList = data;
    })
  }

  get phones() {
    return (this.contactForm.get("phones") as FormArray).controls; 
  }

  public addPhoneField() {
    const field = new FormControl(null, Validators.required);
    (this.contactForm.get("phones") as FormArray).push(field);
  }

  public removePhoneField() {
    (this.contactForm.get("phones") as FormArray).removeAt(-1);
  }

}
