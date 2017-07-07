import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-myclass-form',
  templateUrl: './myclass-form.component.html',
  styleUrls: ['./myclass-form.component.css'],
    animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})

export class MyclassFormComponent implements OnInit {

  myclassForm: NgForm;
  @ViewChild('myclassForm')
  currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  myclass: object = {};
  instructors: any[];

   constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(myclass => this.myclass= myclass);
  }

  getInstructors() {
    this.dataService.getRecords("instructor")
      .subscribe(
        instructors => this.instructors = instructors,
        error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getInstructors();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveMyclass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("class", this.myclass, id)
          .subscribe(
            myclass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", this.myclass)
          .subscribe(
            myclass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }
    this.myclass = {};
    this.myclassForm.reset();
    
  }

  byinstructor_id(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.instructor_id === item2.instructor_id;
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.myclassForm = this.currentForm;
    this.myclassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.myclassForm.form;

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
    'instructor_id': '',
    'subject': '',
    'course': ''
  };

  validationMessages = {
    'instructor_id': {
      'required': 'instructor is required.',
    },
    'subject': {
      'required': 'subject is required.',
      'minlength': 'subject must be at least 3 characters long.',
      'maxlength': 'subject cannot be more than 30 characters long.'
    },
     'course': {
      'minlength': 'course must be at least 3 number long.',
      'maxlength': 'course must be 3 number long only.',
    }
    
  };

}

