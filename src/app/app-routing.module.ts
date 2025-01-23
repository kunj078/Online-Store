import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './navbar/contact/contact.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'product-page/:name',component:ProductPageComponent},
  {path:'product-detail/:name/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
