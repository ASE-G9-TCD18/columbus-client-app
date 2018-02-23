import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagetripPage } from './managetrip';

@NgModule({
  declarations: [
    ManagetripPage,
  ],
  imports: [
    IonicPageModule.forChild(ManagetripPage),
  ],
})
export class ManagetripPageModule {}
