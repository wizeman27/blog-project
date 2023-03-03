import { User } from '../shared/user.model';

export interface BlogTranslation {
  translator: User;
  title?: string;
  description?: string;
  lastSavedDate?: Date;
  status: string;
  language: string;
  sections?: Array<{
    sectionTitle?: string;
    sectionText?: string;
    sectionMediaText?: string;
  }>;
  quotes?: Array<string>;
  blogTags?: Array<string>;
  draft?: {
    title?: string;
    description?: string;
    lastSavedDate?: Date;
    sections?: Array<{
      sectionTitle?: string;
      sectionText?: string;
      sectionMediaText?: string;
    }>;
    quotes?: Array<string>;
    blogTags?: Array<string>;
  };
}

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
    public sourceLanguage: string, // 2-letter language code, e.g. 'en' or language and locale code e.g. 'en-US'
    public sections: Array<{
      sectionTitle?: string;
      sectionText?: string;
      sectionMediaType?: string;
      sectionMediaPath?: string;
      sectionMediaText?: string;
      sectionMediaCredits?: string;
    }>,
    public heroImage?: string,
    public quotes?: Array<string>,
    public comments?: Array<{
      commentText: string;
      commentTitle?: string;
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
        sectionMediaText?: string;
        sectionMediaCredits?: string;
      }>;
      heroImage?: string;
      quotes?: Array<string>;
      blogTags?: Array<string>;
    },
    public translations?: Array<BlogTranslation>,
  ) {}
}
