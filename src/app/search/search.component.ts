import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Blog } from '../blog/blog.model';
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
  results: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.results = this.blogService.getBlogs();
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
