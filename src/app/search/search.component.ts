import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogMeta } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  editing = false;
  subscription: Subscription;
  searchQuery: string;
  results: BlogMeta[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.results = this.blogService.getBlogsMeta();
  }

  onInputChange() {
    if (this.searchQuery !== '' && this.searchQuery !== undefined) {
      this.editing = true;
    }
    if (this.searchQuery === '') {
      this.editing = false;
    }
    this.results = this.blogService.searchBlogs(this.searchQuery);
    //console.log(this.searchQuery);
    //console.log(this.editing);
    //console.log(JSON.stringify(this.results));
  }


  onDelete() {
    this.searchQuery = '';
  }
}
