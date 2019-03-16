import { Component , ElementRef, ViewChild } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { APIKEY } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private _http: HttpClient) {}
  @ViewChild('searchText') searchTerm: ElementRef;
  pages: any;
  title = 'NotableEntities';
  baseURL = 'https://kgsearch.googleapis.com/v1/entities:search?query=';
  //searchTermURI =
  @ViewChild('searchLimit') searchSize: ElementRef;
  filters = `&indent=True`;

  submit () {
    this._http.jsonp(`${this.baseURL}${this.searchTerm.nativeElement.value}&key=${APIKEY.api_key}&limit=${this.searchSize.nativeElement.value}${this.filters}`, 'callback')
    .subscribe((data: any) => {
      console.log(data['itemListElement']);
        this.pages = Object.keys(data['itemListElement']).map(function (k) {
          var i = data['itemListElement'][k]['result'];
          return i
        });
        console.log(this.pages);
              //console.log(data["itemListElement"][0]["result"]);
    });
  }

  /*
  var service_url = 'https://kgsearch.googleapis.com/v1/entities:search';
  var params = {
    'query': 'Taylor Swift',
    'limit': 10,
    'indent': true,
    'key' : '<put your api_key here>',
  };
  $.getJSON(service_url + '?callback=?', params, function(response) {
    $.each(response.itemListElement, function(i, element) {
      $('<div>', {text:element['result']['name']}).appendTo(document.body);
    });
  });
  */

}
