import { Component, OnInit } from '@angular/core';
import {FenmAPIService} from "../shared/services/fenm-api.service";
import {Record} from "../model/record";
import { ToastrService } from 'ngx-toastr';
import {SessionStorageManagerService} from "../shared/services/session-storage-manager.service";

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

  ngOnInit() {
    this.loadRecords();
    this.loadUserRecords();
  }

  loadRecords() {
    this.apiService.getRecords().subscribe(
      (response: any) => {
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

  loadUserRecords() {
    if (this.sessionStorageManager.userIsLoggedIn()) {
      this.getUserRecords();
      this.userLoggedIn = true;
    }
  }

  private getUserRecords() {
    this.apiService.getUserRecords(this.getUserName(), this.sessionStorageManager.getJWToken()).subscribe(
      (response: any) => {
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
        this.toastr.error('Server not responding', 'Server error');
      }
    );
  }

  getUserName(): string {
    return this.sessionStorageManager.getUsername();
  }
}
