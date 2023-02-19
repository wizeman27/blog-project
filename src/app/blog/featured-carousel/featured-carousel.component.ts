import { Component, Input } from '@angular/core';
import { User } from 'src/app/user.model';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-featured-carousel',
  templateUrl: './featured-carousel.component.html',
  styleUrls: ['./featured-carousel.component.scss'],
})
export class FeaturedCarouselComponent {
  currentIndex: number = 0;
  testUser: User = new User('Jack Tester', 'jack@tks.com', 'jacktester1');

  @Input() featuredBlogs: Blog[] =[
    new Blog(
      this.testUser,
      'My first blog title',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg',
      ['first quote', 'second quote'],
      new Date('December 17, 2022 03:24:00'),
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ]
    ),
    new Blog(
      this.testUser,
      'My second blog title',
      [
        {
          sectionTitle: 'First section title2',
          sectionText: 'First section text2',
        },
        {
          sectionTitle: 'Second section title2',
          sectionText: 'Second section text2',
        },
      ],
      'https://www.thespruceeats.com/thmb/pRkqG_XtQYYc2HnNQSof8InwnRE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-90053856-588b7aff5f9b5874ee534b04.jpg',
      ['first quote2', 'second quote2'],
      new Date('December 30, 2022 14:24:00'),
      [
        {
          commentText: 'Another great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 7, 2022 09:20:00'),
        },
      ]
    ),
    new Blog(
      this.testUser,
      'My first blog title',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg',
      ['first quote', 'second quote'],
      new Date('December 17, 2022 03:24:00'),
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ]
    ),
    new Blog(
      this.testUser,
      'My first blog title',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg',
      ['first quote', 'second quote'],
      new Date('December 17, 2022 03:24:00'),
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ]
    ),
    new Blog(
      this.testUser,
      'My first blog title',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg',
      ['first quote', 'second quote'],
      new Date('December 17, 2022 03:24:00'),
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ]
    ),
    new Blog(
      this.testUser,
      'My first blog title',
      [
        {
          sectionTitle: 'First section title',
          sectionText: 'First section text',
        },
        {
          sectionTitle: 'Second section title',
          sectionText: 'Second section text',
        },
      ],
      'https://cdn.yemek.com/mncrop/940/625/uploads/2014/06/mercimek-corbasi-yemekcom.jpg',
      ['first quote', 'second quote'],
      new Date('December 17, 2022 03:24:00'),
      [
        {
          commentText: 'Great blog post!',
          commentAuthor: this.testUser,
          commentDate: new Date('January 3, 2022 09:24:00'),
        },
      ]
    ),
  ];



  onNextClick() {
    this.currentIndex = (this.currentIndex + 1) % this.featuredBlogs.length;
  }

  onPrevClick() {
    this.currentIndex = (this.currentIndex - 1 + this.featuredBlogs.length) % this.featuredBlogs.length;
  }


}
