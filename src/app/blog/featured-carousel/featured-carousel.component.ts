import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent implements OnInit {
  currentIndex: number = 0;

  featuredBlogs: Blog[];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.featuredBlogs = this.blogService.getFeaturedBlogs();
  }


  // onNextClick() {
  //   this.currentIndex = (this.currentIndex + 1) % this.featuredBlogs.length;
  // }
  // maybe we can add the Prev/Next buttons in the header to the right?

  // onPrevClick() {
  //   this.currentIndex = (this.currentIndex - 1 + this.featuredBlogs.length) % this.featuredBlogs.length;
  // }


}
