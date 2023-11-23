import { Component } from '@angular/core';
import {FenmAPIService} from "../shared/services/fenm-api.service";
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:  [ FenmAPIService,
    SessionStorageManagerService
  ]
})

export class RegistrationComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private apiService: FenmAPIService,
              private toastr: ToastrService,
              private  sessionStorageManagerService: SessionStorageManagerService) {}

  validateSubmit(event: any) : void {
    event.preventDefault();
    let valid: boolean = true;
    if (this.username == '' || this.username == ' ') {
      this.toastr.error("Username required");
      valid = false;
    }
    if (this.email == '' || this.email == ' ') {
      this.toastr.error("Email required");
      valid = false;
    }
    if (this.password == '' || this.password == ' ') {
        this.toastr.error("Password required");
        valid = false;
    }
    if (this.confirmPassword == '' || this.confirmPassword == ' ') {
        this.toastr.error("Confirm your password");
        valid = false;
    }
    if (this.password != this.confirmPassword) {
        this.toastr.error("Passwords didn't match");
        valid = false;
    }
    if (valid) {
      this.register();
    }
  }

  register() {
      const userData = {
          username: this.username,
          email: this.email,
          password: this.password
      };
    let url = `username=${this.username}&email=${this.email}`;
        url += `&password=${this.password}`;
    this.apiService.register(url).subscribe(
        (response: any) => {
            if (response.status === 201) {
                console.log(this.username + ' registered successfully');
                this.toastr.error(this.username + ' registered successfully', 'Success');
            } else {
                console.log('Error managing server response');
            }
        },
        error => {
            if (error.status === 200) {
                console.log('KHE');
            }
            if (error.status === 400) {
                console.log('Missing arguments');
                this.toastr.error('Missing arguments', 'Error');
            } else if (error.status === 409) {
                console.log('Username ' + this.username + ' already exists');
                this.toastr.error('Username ' + this.username + ' already exists', 'Error');
            } else if (error.status === 500){
                console.log('Login failed: Invalid login name or password');
                this.toastr.error('Internal server error', 'Server error');
            } else {
                console.log('Login failed: Invalid login name or password');
                this.toastr.error('Server is not working. Try later', 'Server error');
            }
        });
  }

  validateUsernameExists() {
    if (this.username == '' || this.username == ' ') {
      this.toastr.error("Username required");
    } else {
        this.apiService.doesUsernameExists(this.username).subscribe(
            (response: any) => {
                if (response.status === 200) {
                    console.log('Username ' + this.username + ' already exists');
                    this.toastr.error('Username ' + this.username + ' already exists', 'Alert');
                } else {
                    console.log('Error managing server response');
                }
            },
            error => {
                if (error.status === 404) {
                    console.log('Username ' + this.username + ' doesnt exist');
                } else {
                    console.log('Login failed: Invalid login name or password');
                    this.toastr.error('Server is not working. Try later', 'Server error');
                }
            });
    }
  }
}
