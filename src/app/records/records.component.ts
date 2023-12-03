import { Component, OnInit } from '@angular/core';
import {FenmAPIService} from "../shared/services/fenm-api.service";
import {Record} from "../model/record";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  records: Record[] = [];

  constructor(private apiService: FenmAPIService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.loadRecords();
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
}
