import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { Geo, QueryUserService, User } from '../query-user.service';

interface TableFilter {
  names: string[];
  emails: string[];
  addresses: string[];
}

@Component({
  selector: 'query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.css'],
})
export class QueryTableComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  namesCtrl: FormControl = new FormControl();
  emailsCtrl: FormControl = new FormControl();
  addressesCtrl: FormControl = new FormControl();
  names: string[];
  emails: string[];
  addresses: string[];
  fileUrl;

  constructor(
    private queryUserSrv: QueryUserService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.queryUserSrv.getUsers().subscribe((result: User[]) => {
      this.initIndex(result);
      this.initFilter();
      this.initFileUrl();
    });
  }

  private initIndex(result: User[]) {
    this.dataSource = new MatTableDataSource<User>(result);
    this.names = [...new Set(result.map((item) => {return item.name;})),];
    this.emails = [...new Set(result.map((item) => {return item.email;})),];
    this.addresses = [...new Set(result.map((item) => {return item.address;})),];
  }

  private initFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterValue: TableFilter = JSON.parse(filter);
      if (filterValue.names && filterValue.names.length > 0) {
        if (!filterValue.names.includes(data.name)) {
          return false;
        }
      }
      if (filterValue.emails && filterValue.emails.length > 0) {
        if (!filterValue.emails.includes(data.email)) {
          return false;
        }
      }
      if (filterValue.addresses && filterValue.addresses.length > 0) {
        if (!filterValue.addresses.includes(data.address)) {
          return false;
        }
      }
      return true;
    };

    this.dataSource.filter = JSON.stringify({
      names: [],
      emails: [],
      addresses: [],
    });
  }

  private initFileUrl() {
    const blob = new Blob([JSON.stringify(this.dataSource.data)], {
      type: 'application/octet-stream',
    });
    this.fileUrl = this.sanitizer.
    bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  get displayedColumns(): string[] {
    return ['name', 'email', 'address'];
  }

  change(): void {
    this.dataSource.filter = JSON.stringify({
      names: this.namesCtrl.value,
      emails: this.emailsCtrl.value,
      addresses: this.addressesCtrl.value,
    });
  }

  getUser(id): void {
    this.queryUserSrv.getUser(id).subscribe((result) => {
      console.log(result);
    });
  }

  post(): void {
    this.queryUserSrv.post({
      name: 'test',
      email: 'test@ya.ru',
      address: 'some',
      geo: {
        lat: 0, lng: 0
      }
    }).subscribe((res) => console.log('POST=', res));
  }

  put(): void {
    this.queryUserSrv.put(1, {
      name: 'test',
      email: 'test@ya.ru',
      address: 'some',
      geo: {
        lat: 0, lng: 0
      }
    }).subscribe((res) => console.log('PUT=', res));
  }

  delete(id): void {
    this.queryUserSrv.delete(id).subscribe((res) => console.log('delete=', res));
  }

  openDialog(geo: Geo) {
    this.dialog.open(MapDialogComponent, { data: { geo } });
  }
}
