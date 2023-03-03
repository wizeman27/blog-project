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
    const blogs = this.blogService.getAllBlogs();

    this.http.put(this.dbUrl + '/blogs.json', blogs).subscribe((response) => {
      console.log(response);
    });
  }
}
