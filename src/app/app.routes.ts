import { Routes } from '@angular/router';
import { NewCompanyComponent } from './components/companies/new-company/new-company.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';

export const routes: Routes = [
    {path: "companies/add", component: NewCompanyComponent},
    {path: "contacts/add", component: NewContactComponent},
];
