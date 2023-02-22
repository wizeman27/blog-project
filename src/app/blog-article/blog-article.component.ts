import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from '../blog/blog.model';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  blog: Blog;
  address: string;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const address = this.route.params.subscribe(
      (params: Params) => {
        this.address = params['address'];
        this.blog = this.blogService.getBlog(this.address);
      }
    )

  }

  onDeletePost() {
    // open a dialog that asks to confirm, then delete the post.


  }
}
