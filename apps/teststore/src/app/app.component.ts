import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IMessage } from '@interfaces';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'teststore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUrl = '';
  hello$ = this.http.get<IMessage>(`${env.apiUrl}/api/hello`);
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // listen to the changes to the url and update navigation accordingly
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        console.log(e.url);
        this.currentUrl = e.url;
      }
    });
  }
}
