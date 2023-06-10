import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  courseFrom !: FormGroup;
  actionBtn : string = "Save"

  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.courseFrom = this.formBuilder.group({
      courseName : ['', Validators.required],
      description: ['', Validators.required],
      date : ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = "Update";
      this.courseFrom.controls['courseName'].setValue(this.editData.courseName);
      this.courseFrom.controls['description'].setValue(this.editData.description);
      this.courseFrom.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    if(!this.editData) {
      if(this.courseFrom.valid) {
        this.api.postCourse(this.courseFrom.value)
        .subscribe({ 
          next: (res) => { 
            alert("course created successfully");
            this.courseFrom.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error while creating the course")
          }
        })
      }
    }else{
      this.updateCourse();
    }
  }

  updateCourse(){
    this.api.putCourse(this.courseFrom.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Course updated Successfully!");
        this.courseFrom.reset();
        this.dialogRef.close("update");
      },
      error:()=>{
        alert("Error while updating the course!");
      }
    })
  }
}
