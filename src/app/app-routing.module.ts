import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateValidationComponent } from './components/certificate-validation/certificate-validation.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: 'validate',
    component: CertificateValidationComponent,
  },
  {
    path: 'v',
    redirectTo: 'validate',
    pathMatch: 'full',
  },
  { path: 'langdingpage', component: LandingPageComponent },
  {
    path: '',
    redirectTo: 'langdingpage',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'langdingpage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//https://angular.io/tutorial/toh-pt5
