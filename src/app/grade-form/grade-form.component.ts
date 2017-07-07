import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css'],
  animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})
export class GradeFormComponent implements OnInit {

  gradeForm: NgForm;
  @ViewChild('gradeForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  grade: object = {};

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  getRecordForEdit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("grade", +params['id']))
      .subscribe(grade => this.grade = grade);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveGrade(id) {
    if (typeof id === "number") {
      this.dataService.editRecord("grade", this.grade, id)
        .subscribe(
        grade => this.successMessage = "Record updated succesfully",
        error => this.errorMessage = <any>error);
    } else {
      this.dataService.addRecord("grade", this.grade)
        .subscribe(
        grade => this.successMessage = "Record added succesfully",
        error => this.errorMessage = <any>error);
    }
    this.grade = {};
    this.gradeForm.reset();
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.gradeForm = this.currentForm;
    this.gradeForm.valueChanges
      .subscribe(
      data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.gradeForm.form;

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
    'grade': '',
  };

  validationMessages = {
    'grade': {
      'required': 'grade is required.',
      'minlength': 'grade must be at least 2 characters long.',
      'maxlength': 'grade cannot be more than 30 characters long.'
    }

  };


}

