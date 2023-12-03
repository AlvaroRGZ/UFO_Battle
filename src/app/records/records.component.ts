import { Component, OnInit } from '@angular/core';

import {FenmAPIService} from "../shared/services/fenm-api.service";
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";

import {Record} from "../model/record";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  records: Record[] = [];
  userRecords: Record[] = [];
  userLoggedIn: boolean = false;

  constructor(private apiService: FenmAPIService,
              private toastr: ToastrService,
              private sessionStorageManager: SessionStorageManagerService) {}

  ngOnInit(): void {
    this.loadRecords();
    this.loadUserRecords();
  }

  loadRecords(): void {
    this.apiService.getRecords().subscribe(
      (response: any): void => {
        if (response.status === 200) {
          response.body.forEach((record: any) => {
            this.records.push(
              new Record(record.username,
                         record.punctuation,
                         record.ufos,
                         record.disposedTime,
                         record.recordDate)
            );
          });
        } else {
          this.toastr.error('Error fetching records data');
        }
      },
      error => {
          this.toastr.error('Server not responding', 'Server error');
      }
    );
  }

  loadUserRecords(): void {
    if (this.sessionStorageManager.userIsLoggedIn()) {
      this.getUserRecords();
      this.userLoggedIn = true;
    }
  }

  private getUserRecords(): void {
    this.apiService.getUserRecords(this.sessionStorageManager.getUsername(), this.sessionStorageManager.getJWToken()).subscribe(
      (response: any): void => {
        if (response.status === 200) {
          response.body.forEach((record: any) => {
            this.userRecords.push(
              new Record(record.username,
                record.punctuation,
                record.ufos,
                record.disposedTime,
                record.recordDate)
            );
          });
        } else {
          this.toastr.error('Error fetching records data');
        }
      },
      error => {
        this.toastr.error('Log in again', 'Session expired');
      }
    );
  }
}
