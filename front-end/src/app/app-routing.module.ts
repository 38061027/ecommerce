import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './core/forms/form/form.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { MenagerComponent } from './components/menager/menager.component';
import { CanActiveGuard } from './core/guards/can-active.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"home", component: HomeComponent},
  {path:"form", component: FormComponent},
  {path:"details/:id", component: DetailsComponent},
  {path:"cart", component: CartComponent},
  {path: "menager", component: MenagerComponent, canActivate:[CanActiveGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
