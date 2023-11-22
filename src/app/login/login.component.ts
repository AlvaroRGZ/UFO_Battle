
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FenmAPIService } from 'src/app/shared/services/fenm-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [ FenmAPIService ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  result: string = '';

  constructor(private router: Router, private apiService: FenmAPIService) {}

  onSubmit() {
    const url = `http://wd.etsisi.upm.es:10000/users/login?username=${this.username}&password=${this.password}`;

    this.apiService.login(url).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const jwtToken : string = response.headers.get('authorization');
          // Handle success (console log for now)
          console.log('Logged in!', jwtToken);
          this.result  = jwtToken;
        } else {
          // Handle login failure (console log for now)
          console.log('Login failed: Invalid login name or password');
        }
      },
      error => {
        // Handle errors (console log for now)
        console.error('Error during login:', error);
        this.result  = "Error";
      }
    );
  }
}
