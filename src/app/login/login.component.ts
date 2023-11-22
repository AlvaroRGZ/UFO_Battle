
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FenmAPIService } from 'src/app/shared/services/fenm-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [ FenmAPIService ]
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private apiService: FenmAPIService,
              private toastr: ToastrService) {}

  onSubmit() {
    const url = `http://wd.etsisi.upm.es:10000/users/login?username=${this.username}&password=${this.password}`;

    this.apiService.login(url).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const jwtToken : string = response.headers.get('authorization');
          console.log('Logged in!', jwtToken);
          this.toastr.success(jwtToken, 'Logged in!');
        } else {
          console.log('Login failed: Invalid login name or password');
          this.toastr.info('Invalid login name or password', 'Login failed');
        }
      },
      error => {
        console.error('Error during login:', error);
        this.toastr.error(error, 'Login failed');
      }
    );
  }
}
