import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project';
  displayedColumns: string[] = ['courseName', 'description', 'date', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === "save"){
        this.getAllCourses();
      }
    })
  }

  getAllCourses() {
    this.api.getCourses()
    .subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => [
        console.log("Error while fetching the records!!!")
      ]
    })
  }
  editCourse(row : any) {
    this.dialog.open(DialogComponent, {
      width:'30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === "update"){
        this.getAllCourses();
      }
    });
  }
  deleteCourse(id : number){
    this.api.deleteCourse(id)
    .subscribe({
      next:(res)=>{
        alert("Course deleted Successfully!");
        this.getAllCourses();
      },
      error:()=>{
        alert("Error while deleting the course!");
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
