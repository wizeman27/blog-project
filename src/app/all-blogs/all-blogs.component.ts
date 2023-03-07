import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog, BlogMeta } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css'],
})
export class AllBlogsComponent implements OnInit {
  featuredMode = false;
  categoryMode = false;
  urlSection: string;
  category: string;

  allBlogs: BlogMeta[];

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.urlSection = this.route.snapshot['_routerState'].url;
      if (this.urlSection.split('/')[2] === 'featured') {
        this.featuredMode = true;
        console.log(this.featuredMode);
      }
      if (
        this.urlSection.split('/')[2] !== 'featured' &&
        this.urlSection.split('/')[2] !== '' &&
        this.urlSection.split('/')[2] !== undefined
      ) {
        this.categoryMode = true;
        this.category = this.urlSection.split('/')[2];
        console.log(`Category is ${this.category}`);
        console.log(this.categoryMode);
      }

      if (this.featuredMode) {
        this.allBlogs = this.blogService.getFeaturedBlogsMeta();
      } else if (this.categoryMode) {
        this.allBlogs = this.blogService.getBlogsByCategory(this.category);
      } else {
        this.allBlogs = this.blogService.getBlogsMeta();
      }
    });
  }
}
