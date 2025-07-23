import { Component } from '@angular/core';

@Component({
  selector: 'app-oauth2-google',
  imports: [],
  templateUrl: './oauth2-google.html',
  styleUrl: './oauth2-google.css'
})

export class Oauth2Google {
  protected loginOrRegisterWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
