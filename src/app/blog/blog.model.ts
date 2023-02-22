import { User } from '../user.model';

export class Blog {
  constructor(
    public author: User,
    public title: string,
    public description: string,
    public featured: boolean,
    public publishedDate: Date,
    public address: string,
    public category: string,
    public status: string,
    public sections: Array<{
      sectionTitle?: string;
      sectionText: string;
      sectionImage?: string;
    }>,
    public heroImage?: string,
    public quotes?: Array<string>,
    public comments?: Array<{
      commentText: string;
      commentAuthor: User;
      commentDate: Date;
    }>,
    public tags?: Array<string>,
    public draft?: {
      author: User;
      title: string;
      description: string;
      featured: boolean;
      lastSavedDate: Date;
      address: string;
      category: string;
      sections: Array<{
        sectionTitle?: string;
        sectionText: string;
        sectionImage?: string;
      }>;
      heroImage?: string;
      quotes?: Array<string>;
      comments?: Array<{
        commentText: string;
        commentAuthor: User;
        commentDate: Date;
      }>;
      tags?: Array<string>;
    }
  ) {}
}
