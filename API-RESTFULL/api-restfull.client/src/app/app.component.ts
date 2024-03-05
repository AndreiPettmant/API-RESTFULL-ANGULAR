import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberList: string = '';
  processing: boolean = false;
  results: string[] | null = null;

  constructor(private http: HttpClient) { }

  processNumbers() {
    this.processing = true;
    this.http.post<any>('https://localhost:7050/NumberProcessing', { numbers: this.numberList.split(',').map(Number) })
      .subscribe({
        next: data => {
          this.results = data;
          this.processing = false;
        },
        error: error => {
          console.error('There was an error processing the numbers:', error);
          this.processing = false;
        }
      });
  }
}
