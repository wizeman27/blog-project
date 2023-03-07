import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogService } from '../blog/blog.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  dbUrl = 'https://tks-blog-db-default-rtdb.firebaseio.com';

  constructor(private blogService: BlogService, private http: HttpClient) {}

  storePosts() {
    const blogsMeta = this.blogService.getAllBlogsMeta();
    const blogsBody = this.blogService.getAllBlogsBody();


    this.http.put(this.dbUrl + '/blogsMeta.json', blogsMeta).subscribe((response) => {
      console.log(response);
    });
    this.http.put(this.dbUrl + '/blogsBody.json', blogsBody).subscribe((response) => {
      console.log(response);
    });
  }
}
