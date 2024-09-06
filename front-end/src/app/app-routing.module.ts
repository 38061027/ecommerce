import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path:"", component: HomeComponent, pathMatch:"full"},
  {path:"form", component: FormComponent},
  {path:"details/:id", component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
