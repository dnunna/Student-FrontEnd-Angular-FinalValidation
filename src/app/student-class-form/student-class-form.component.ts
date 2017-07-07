import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css'],
   animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})
export class StudentClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  student_class: object = {};
  classes: any[];
  students: any[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student_class", +params['id']))
      .subscribe(student_class => this.student_class = student_class);
  }

  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  getStudents() {
    this.dataService.getRecords("student")
      .subscribe(
        students => this.students = students,
        error =>  this.errorMessage = <any>error);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getClasses();
    this.getStudents();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveStudentClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("student_class", this.student_class, id)
          .subscribe(
            student_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student_class", this.student_class)
          .subscribe(
            student_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.student_class = {};
    this.studentClassForm.reset();
    
  }

  byClassId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.class_id === item2.class_id;
    }
  }

  byStudentId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.student_id === item2.student_id;
    }
  }

  studentClassForm: NgForm;
  @ViewChild('studentClassForm')
  currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentClassForm = this.currentForm;
    this.studentClassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.studentClassForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'student_id': '',
    'class_id': ''
  };

  validationMessages = {
    'student_id': {
      'required': 'A student is required.',
    },
    'class_id': {
      'required': 'A class is required.'
    }
  };

}


