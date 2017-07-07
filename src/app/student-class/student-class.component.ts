import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.css'],
  animations: [fadeInAnimation]
})
export class StudentClassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  student_classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getStudentClasses(); }
 
  getStudentClasses() {
    this.dataService.getRecords("student_class")
      .subscribe(
        student_classes => this.student_classes = student_classes,
        error =>  this.errorMessage = <any>error);
  }

  deleteStudentClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("Student_class", id)
          .subscribe(
            student_class => {this.successMessage = "Record(s) deleted succesfully"; this.getStudentClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
