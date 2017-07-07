import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';
import { MajorComponent }   from '../major/major.component';
import { MajorFormComponent }   from '../major-form/major-form.component';
import { GradeComponent }   from '../grade/grade.component';
import { GradeFormComponent }   from '../grade-form/grade-form.component';
import { AssignmentComponent }   from '../assignment/assignment.component';
import { AssignmentFormComponent }   from '../assignment-form/assignment-form.component';
import { InstructorComponent }   from '../instructor/instructor.component';
import { InstructorFormComponent }   from '../instructor-form/instructor-form.component';
import { MyclassComponent }   from '../myclass/myclass.component';
import { MyclassFormComponent }   from '../myclass-form/myclass-form.component';
import { HomeComponent }   from '../home/home.component';
import { MajorClassComponent }   from '../major-class/major-class.component';
import { MajorClassFormComponent }   from '../major-class-form/major-class-form.component';
import { StudentClassComponent }   from '../student-class/student-class.component';
import { StudentClassFormComponent }   from '../student-class-form/student-class-form.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'student',  component: StudentComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },
  { path: 'major',  component: MajorComponent },
  { path: 'major/edit/:id', component: MajorFormComponent },
  { path: 'major/add', component: MajorFormComponent },
  { path: 'major-class',  component: MajorClassComponent },
  { path: 'major-class/edit/:id', component: MajorClassFormComponent },
  { path: 'major-class/add', component: MajorClassFormComponent },
  { path: 'grade',  component: GradeComponent },
  { path: 'grade/edit/:id', component: GradeFormComponent },
  { path: 'grade/add', component: GradeFormComponent },
  { path: 'assignment',  component: AssignmentComponent },
  { path: 'assignment/edit/:id', component: AssignmentFormComponent },
  { path: 'assignment/add', component: AssignmentFormComponent },
  { path: 'instructor',  component: InstructorComponent },
  { path: 'instructor/edit/:id', component: InstructorFormComponent },
  { path: 'instructor/add', component: InstructorFormComponent },
  { path: 'myclass',  component: MyclassComponent },
  { path: 'myclass/edit/:id', component: MyclassFormComponent },
  { path: 'myclass/add', component: MyclassFormComponent },
  { path: 'student-class',  component: StudentClassComponent },
  { path: 'student-class/edit/:id', component: StudentClassFormComponent },
  { path: 'student-class/add', component: StudentClassFormComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
