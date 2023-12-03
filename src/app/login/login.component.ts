
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FenmAPIService } from 'src/app/shared/services/fenm-api.service';
import { SessionStorageManagerService } from 'src/app/shared/services/session-storage-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [ FenmAPIService,
                SessionStorageManagerService
  ]
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private apiService: FenmAPIService,
              private toastr: ToastrService, private  sessionStorageManagerService: SessionStorageManagerService) {}

  validateSubmit() : void {
    let valid: boolean = true;
    if (this.username == '' || this.username == ' ') {
      this.toastr.error("Username required");
      valid = false;
    }
    if (this.password == '' || this.password == ' ') {
      this.toastr.error("password required");
      valid = false;
    }
    if (valid) {
      this.sendLoginRequest();
    }
  }

  sendLoginRequest() {
    const url = `username=${this.username}&password=${this.password}`;

    this.apiService.login(url).subscribe(
      (response: any) => {
        if (response.status === 200) {
          const jwtToken: string = response.headers.get('authorization');
          this.toastr.success("Welcome " + this.username + "!", 'Logged in!');
          this.sessionStorageManagerService.saveJWToken(jwtToken);
        } else {
          console.log('Login: Worked but errors');
          this.toastr.info('Login: Worked but errors', 'Login failed');
        }
      },
      error => {
        if (error.status === 401) {
          console.log('Login failed: Authorization declined');
          this.toastr.error('Invalid credentials', 'Login failed');
        } else {
          console.log('Login failed: Invalid login name or password');
          this.toastr.error('Invalid login name or password', 'Login failed');
        }
      }
    );
  }
}
