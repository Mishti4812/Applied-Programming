import { Component , ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private _http: HttpClient) {}
  @ViewChild('searchText') searchTerm: ElementRef;
  recommendations: any;

  submit() {
    this.parseRecommendations();
  }

  parseRecommendations() {
    this._http.jsonp('https://api.foursquare.com/v2/venues/explore?near=' + this.searchTerm.nativeElement.value + '&section=food&client_id=PWNPAN3EORPBK3WOBF5VR2FLLUL24MOLOBY3PDPXNYBCE42C&client_secret=CXFTHYALQLLRHHD1VGAOKIJH3VHNO222YTVHVVS5XHRNKABN&v=20190223', 'callback')
      .subscribe((data: any) => {
        this.recommendations = Object.keys(data['response']['groups'][0]['items']).map(function (k) {
          var i = data['response']['groups'][0]['items'][k];
          return {venue: i.venue}
        });
      });
  }

}
