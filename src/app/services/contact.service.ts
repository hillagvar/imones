import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public addContact(c: Contact) {
    return this.http.post("https://fir-project-26cda-default-rtdb.europe-west1.firebasedatabase.app/companies/contacts.json", c);
  }
}
