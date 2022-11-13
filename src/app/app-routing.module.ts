import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { TestpageComponent } from './testpage/testpage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [];

routes.push(
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'test/:id', component: TestpageComponent},
    {path: '', component: HomeComponent}
)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
