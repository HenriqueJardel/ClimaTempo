import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteinerComponent } from './component/conteiner/conteiner.component';


const routes: Routes = [
  {
    path: "",
    component: ConteinerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
