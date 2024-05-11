import { Component } from '@angular/core';
import { Company } from '../../../models/company';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
      "name": new FormControl(null,[Validators.required, this.validateName]),
      "surname": new FormControl(null,[Validators.required, this.validateName]),
      "position": new FormControl(null, [Validators.required, this.validatePosition]),
      "company": new FormControl(null, Validators.required),
      "phones": new FormArray([
        new FormControl (null, [Validators.required, this.validatePhone])
      ]),
    });

    this.loadCompanies();
  }

  public onSubmit() {
    this.contactService.addContact(this.contactForm.value).subscribe(() => {
      console.log(this.contactForm);
      // this.contactForm.reset();
      
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
    const field = new FormControl(null, [Validators.required, this.validatePhone]);
    (this.contactForm.get("phones") as FormArray).push(field);
  }

  public removePhoneField() {
    (this.contactForm.get("phones") as FormArray).removeAt(-1);
  }

  public validateName(control: FormControl) : ValidationErrors | null {
    let value = control.value;
    let pattern = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž\- ]{2,30}$/;
    if (pattern.test(value)) {
      return null;
    }
    return {error: "Klaida"};
  }

  public validatePosition(control: FormControl) : ValidationErrors | null {
    let value = control.value;
    let pattern = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž\- ]{3,30}$/;
    if (pattern.test(value)) {
      return null;
    }
    return {error: "Klaida"};
  }

  public validatePhone(control: FormControl): ValidationErrors | null {
    let value = control.value;

    if (control.value !== null) {
      if (value[0] !== "+") {
        return {error: "Plus sign missing"};
      } else if (value.length < 10 ||value.length > 12) {
        return {error: "Incorrect length"};
      } else if (isNaN(Number(value.slice(1)))) {
        return {error: "Incorrect format"};
      } else
      return null;
    }
    return {error: "Null value"};
  }

}