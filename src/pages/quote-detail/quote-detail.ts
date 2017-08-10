import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MovieQuote } from "../../models/movie-quotes";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-quote-detail',
  templateUrl: 'quote-detail.html',
})
export class QuoteDetailPage implements OnInit, OnDestroy {

  movieQuoteStream: FirebaseObjectObservable<MovieQuote>;
  movieQuote: MovieQuote;
  private movieQuoteSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    const movieQuoteKey = this.navParams.get("key");
    this.movieQuoteStream = this.db.object(`/quotes/${movieQuoteKey}`);
    this.movieQuoteSubscription = this.movieQuoteStream.subscribe((movieQuote: MovieQuote) => {
      this.movieQuote = movieQuote; 
    })
  }

  ngOnDestroy(): void {
    this.movieQuoteSubscription.unsubscribe();
  }

  editQuote(): void {
    const prompt = this.alertCtrl.create({
      title: 'Edit Quote',
      inputs: [
        {
          name: 'quote',
          placeholder: 'Quote',
          value: this.movieQuote.quote,
        },
        {
          name: 'movie',
          placeholder: 'from Movie',
          value: this.movieQuote.movie,
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
              this.movieQuoteStream.set(data);
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
}
