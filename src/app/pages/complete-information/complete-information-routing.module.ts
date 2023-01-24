import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteInformationComponent } from './complete-information.component';

const routes: Routes = [{
  path:'',
  component: CompleteInformationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteInformationRoutingModule { }
