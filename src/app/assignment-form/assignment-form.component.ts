import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
    animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})
export class AssignmentFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  assignment: object = {};
  classes: any[];
  grades: any[];
  students: any[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignment", +params['id']))
      .subscribe(assignment => this.assignment = assignment);
  }

  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  getGrades() {
    this.dataService.getRecords("grade")
      .subscribe(
        grades => this.grades = grades,
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
    this.getGrades();
    this.getStudents();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveAssignment(id){
    if(typeof id === "number"){
      this.dataService.editRecord("assignment", this.assignment, id)
          .subscribe(
            assignment => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("assignment", this.assignment)
          .subscribe(
            assignment => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.assignment = {};
    this.assignmentForm.reset();
    
  }

  byClassId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.class_id === item2.class_id;
    }
  }

  byGradeId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.grade_id === item2.grade_id;
    }
  }

  byStudentId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.student_id === item2.student_id;
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  assignmentForm: NgForm;
  @ViewChild('assignmentForm') currentForm: NgForm;

  formChanged() {
    this.assignmentForm = this.currentForm;
    this.assignmentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.assignmentForm.form;

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
    'assignment_nbr': ''
  };


  validationMessages = {
    'student_id': {
      'required': 'A student is required.',
    },
    'assignment_nbr': {
      'required': 'An assignment number is required.',
      'minlength': 'The assignment number must be at least 2 characters long.',
    }

  };

  

}


