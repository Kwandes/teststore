import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IMessage } from '@interfaces';

@Component({
  selector: 'teststore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<IMessage>('/api/hello');
  constructor(private http: HttpClient) {}
}
