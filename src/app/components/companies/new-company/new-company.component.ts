import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhoneValidatorDirective } from '../../../directives/phone-validator.directive';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-new-company',
  standalone: true,
  imports: [FormsModule, CommonModule, PhoneValidatorDirective],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.css'
})
export class NewCompanyComponent {

  constructor(private companyService: CompanyService) { }

  public newCompanySubmit(f: NgForm) {
    // console.log(f.form.value);

    this.companyService.addCompany(f.form.value).subscribe(() => {
      f.reset();
    });
  }

}
