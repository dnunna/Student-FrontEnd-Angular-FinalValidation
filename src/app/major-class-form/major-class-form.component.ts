import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css'],
  animations: [slideInOutAnimation],
 
    // attach the slide in/out animation to the host (root) element of this component
    host: { '[@slideInOutAnimation]': '' }
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major_class: object = {};
  majors: any[];
  classes: any[];

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(major_class => this.major_class = major_class);
  }

  getMajors() {
    this.dataService.getRecords("major")
      .subscribe(
        majors => this.majors = majors,
        error =>  this.errorMessage = <any>error);
  }
    getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMajors();
    this.getClasses();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveMajorClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major_class", this.major_class, id)
          .subscribe(
            major_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major_class", this.major_class)
          .subscribe(
            major_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.major_class = {};
    this.majorClassForm.reset();
    
  }

  byMajorId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.major_id === item2.major_id;
    }
  }

  byClassId(item1, item2){
    if (item1 != undefined && item2 != undefined) {
      return item1.class_id === item2.class_id;
    }
  }
majorClassForm: NgForm;
  @ViewChild('majorClassForm')
  currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.majorClassForm = this.currentForm;
    this.majorClassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.majorClassForm.form;

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
    'major_id': '',
    'class_id': ''
  };

  validationMessages = {
    'major_id': {
      'required': 'Major is required.',
    },
    'class_id': {
      'required': 'Class is required.'
    }
  };
}


