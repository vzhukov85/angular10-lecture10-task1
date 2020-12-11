import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {

  lat: number;
  long: number;

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.lat = parseFloat(data.geo.lat);
    this.long = parseFloat(data.geo.lng);
    console.log('lat=', this.lat);
    console.log('long=', this.long);
  }

  ngOnInit(): void {
  }

}
