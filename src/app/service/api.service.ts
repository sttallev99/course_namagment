import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postCourse(data : any) {
    return this.http.post<any>("http://localhost:3000/coursesList/", data);
  }

  getCourses() {
    return this.http.get<any>("http://localhost:3000/coursesList/");
  }

  putCourse(data : any, id : number) {
    return this.http.put<any>("http://localhost:3000/coursesList/"+id, data);
  }
  deleteCourse(id : number) {
    return this.http.delete<any>("http://localhost:3000/coursesList/"+id);
  }
}
