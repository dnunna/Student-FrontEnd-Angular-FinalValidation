import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-major-form',
  templateUrl: './major-form.component.html',
  styleUrls: ['./major-form.component.css'],
  animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})
export class MajorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major: object = {};

majorForm: NgForm;
@ViewChild('majorForm') currentForm: NgForm;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major", +params['id']))
      .subscribe(major => this.major = major);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveMajor(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major", this.major, id)
          .subscribe(
            major => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major", this.major)
          .subscribe(
            major => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.major = {};
    this.majorForm.reset();
    
  }

 ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.majorForm = this.currentForm;
    this.majorForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.majorForm.form;

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
    'major': '',
    'sat': ''
  };

  validationMessages = {
    'major': {
      'required': 'Major is required.',
      'minlength': 'Major must be at least 2 characters long.',
      'maxlength': 'Major cannot be more than 30 characters long.'
    },
    'sat': {
      'required': 'SAT score is required',
      'pattern': 'SAT score must be between 400 and 1600',
      'maxlength': 'SAT cannot be more than 4 digits long.'
    }
  };
}

