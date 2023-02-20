import { User } from '../user.model';

export class Blog {
  constructor(
    public author: User,
    public title: string,
    public description: string,
    public featured: boolean,
    public publishedDate: Date,
    public address: string,
    public sections: Array<{
      sectionTitle?: string;
      sectionText: string;
    }>,
    public imagePath?: string,
    public quotes?: Array<string>,

    public comments?: Array<{
      commentText: string;
      commentAuthor: User;
      commentDate: Date;
    }>,
    public category?: string,
    public tags?: Array<string>
  ) {}
}
