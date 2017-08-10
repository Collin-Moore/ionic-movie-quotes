import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { MovieQuote } from "../../models/movie-quotes";
import { QuoteDetailPage } from "../quote-detail/quote-detail";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private alertCtrl: AlertController) {
    this.movieQuoteStream = this.db.list("/quotes");
  }

  addQuote(): void {
    const prompt = this.alertCtrl.create({
      title: 'Add Quote',
      inputs: [
        {
          name: 'quote',
          placeholder: 'Quote'
        },
        {
          name: 'movie',
          placeholder: 'from Movie'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Quote',
          handler: (data) => {
            console.log('Saved clicked');
            if (data.quote && data.movie) {
              this.movieQuoteStream.push(data);
            } else {
              console.log("Not a valid MovieQuote");
              return false;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  removeQuote(quoteToDeleteKey: string): void {
    this.movieQuoteStream.remove(quoteToDeleteKey);
  }

  pushDetailView(movieQuote: MovieQuote): void {
    this.navCtrl.push(QuoteDetailPage, {key: movieQuote.$key});
  }

}
