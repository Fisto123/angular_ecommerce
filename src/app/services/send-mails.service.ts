import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendMailsService {
  constructor(private http: HttpClient) {}
  sendEmail(recipient: string, subject: string, text: string): Observable<any> {
    const body = {
      recipient,
      subject,
      text,
    };

    return this.http.post<any>(
      'https://orion-commerce.onrender.com/api/mail/createMail',
      body
    );
  }
}
