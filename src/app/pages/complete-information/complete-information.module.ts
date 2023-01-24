import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteInformationRoutingModule } from './complete-information-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompleteInformationComponent } from './complete-information.component';



@NgModule({
  declarations: [
    CompleteInformationComponent
  ],
  imports: [
    CompleteInformationRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class CompleteInformationModule { }
