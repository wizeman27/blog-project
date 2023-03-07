import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Blog, BlogMeta } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs: BlogMeta[];
  subscription: Subscription;
  isSelected: boolean = false;
  activeTags: string[] = [];
  activeColor: "blue";
  tagsList: string[] = [];
  tagsExpanded: boolean = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogs = this.blogService.getBlogsMeta();
    this.tagsList= Array.from(this.blogService.getTags()).slice(0, 7);
    this.subscription = this.blogService.blogsChanged.subscribe(
      (blogs : BlogMeta[]) => {
        this.blogs = blogs;
      }
    );

  }

  onShowHideTags() {
    if(!this.tagsExpanded) {
      this.tagsList = Array.from(this.blogService.getTags());

    } else {
      this.tagsList= Array.from(this.blogService.getTags()).slice(0, 7);
    }
    this.tagsExpanded = !this.tagsExpanded;
  }

  filterByTag(tag: string) {
    if (this.activeTags.includes(tag)) {
      this.activeTags.splice(this.activeTags.indexOf(tag), 1);
    } else {
      this.activeTags.push(tag);
    }

    if(this.activeTags.length > 0) {
      this.blogs = this.blogService.getBlogsByTags(this.activeTags);
    } else {
      this.blogs = this.blogService.getBlogsMeta();
    }
    //this.isSelected = !this.isSelected;
  }

  onClearFilters() {
    this.activeTags = [];
    this.blogs = this.blogService.getBlogsMeta();
    //this.isSelected = false;
  }
}
