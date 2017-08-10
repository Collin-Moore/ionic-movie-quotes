import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ReversePipe } from "../../pipes/reverse/reverse";

@NgModule({
  declarations: [
    ListPage,
    ReversePipe,
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
