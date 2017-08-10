import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { MovieQuote } from "../../models/movie-quotes";

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  public movieQuoteStream: FirebaseListObservable<MovieQuote[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    this.movieQuoteStream = this.db.list("/quotes");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

}
