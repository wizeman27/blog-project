import { Component } from '@angular/core';
import { User } from 'src/app/user.model';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent {
  testUser: User = new User('Jack Tester', 'jack@tks.com', 'jacktester1');

  blogs: Blog[] = [
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
  ];


  onClick() {
    // should open the blog article page. Maybe we can use routerLink.
  }
}
