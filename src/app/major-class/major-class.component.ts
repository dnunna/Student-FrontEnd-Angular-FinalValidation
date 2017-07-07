import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-major-class',
  templateUrl: './major-class.component.html',
  styleUrls: ['./major-class.component.css'],
   animations: [fadeInAnimation]
})
export class MajorClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  major_classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMajorClasses(); }
 
  getMajorClasses() {
    this.dataService.getRecords("major_class")
      .subscribe(
        major_classes => this.major_classes = major_classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteMajorClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("Major_class", id)
          .subscribe(
            major_class => {this.successMessage = "Record(s) deleted succesfully"; this.getMajorClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
