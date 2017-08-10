import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { QuoteDetailPageModule } from "../pages/quote-detail/quote-detail.module";
import { ListPageModule } from "../pages/list/list.module";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyD2MjoFTzMfCU3eG_XTsL246rN-Gzg3m8I",
  authDomain: "moorect-movie-quotes.firebaseapp.com",
  databaseURL: "https://moorect-movie-quotes.firebaseio.com",
  projectId: "moorect-movie-quotes",
  storageBucket: "moorect-movie-quotes.appspot.com",
  messagingSenderId: "229844026706"
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    QuoteDetailPageModule,
    ListPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
