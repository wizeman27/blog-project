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
      sectionText?: string;
      sectionMediaType?: string;
      sectionMediaPath?: string;
      sectionMediaText?: string;
    }>,
    public heroImage?: string,
    public quotes?: Array<string>,
    public comments?: Array<{
      commentText: string;
      commentAuthor: User;
      commentDate: Date;
    }>,
    public blogTags?: Array<string>,
    public draft?: {
      title?: string;
      description?: string;
      featured?: boolean;
      lastSavedDate?: Date;
      address?: string;
      category?: string;
      sections?: Array<{
        sectionTitle?: string;
        sectionText?: string;
        sectionMediaType?: string;
        sectionMediaPath?: string;
      }>;
      heroImage?: string;
      quotes?: Array<string>;
      blogTags?: Array<string>;
    }
  ) {}
}
