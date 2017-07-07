import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation'

@Component({
  selector: 'app-myclass',
  templateUrl: './myclass.component.html',
  styleUrls: ['./myclass.component.css'],
  animations: [fadeInAnimation]
})
export class MyclassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  myclasses: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getMyclasses(); }
 
  getMyclasses() {
    this.dataService.getRecords("class")
      .subscribe(
        myclasses => this.myclasses = myclasses,
        error =>  this.errorMessage = <any>error);
  }

  deleteMyclass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("class", id)
          .subscribe(
            myclass => {this.successMessage = "Record(s) deleted succesfully"; this.getMyclasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
