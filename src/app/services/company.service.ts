import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public addCompany(c: Company) {
    return this.http.post("https://fir-project-26cda-default-rtdb.europe-west1.firebasedatabase.app/companies/companies.json", c);
  }

   public loadCompanies() {
    return this.http.get<{[key: string]: Company}>("https://fir-project-26cda-default-rtdb.europe-west1.firebasedatabase.app/companies/companies.json")
    .pipe(
      map((data): Company[] => {
        let companies = [];
        for (let z in data) {
          companies.push({...data[z], id: z});
        }
        return companies;
      }
    ))

  }
}
