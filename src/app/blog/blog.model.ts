import { User } from '../shared/user.model';

export class BlogMeta {
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
    public heroImage?: string,
    public blogTags?: Array<string>,
    public blogId?: string,
  ) {}
}

export class BlogBody {
  constructor(
    public blogId: string,
    public sections: Array<{
      sectionTitle?: string;
      sectionText?: string;
      sectionMediaType?: string;
      sectionMediaPath?: string;
      sectionMediaText?: string;
      sectionMediaCredits?: string;
    }>,
    public quotes?: Array<string>,
    public comments?: Array<{
      commentText: string;
      commentTitle?: string;
      commentAuthor: User;
      commentDate: Date;
    }>
  ) {}
}

export class BlogDraft {
  constructor(
    public blogId?: string,
    public title?: string,
    public description?: string,
    public featured?: boolean,
    public lastSavedDate?: Date,
    public address?: string,
    public category?: string,
    public sections?: Array<{
      sectionTitle?: string;
      sectionText?: string;
      sectionMediaType?: string;
      sectionMediaPath?: string;
      sectionMediaText?: string;
      sectionMediaCredits?: string;
    }>,
    public heroImage?: string,
    public quotes?: Array<string>,
    public blogTags?: Array<string>
  ) {}
}

export class BlogTranslationMeta {
  constructor(
    public blogId: string,
    public translator: User,
    public language: string,
    public status: string,
    public title?: string,
    public description?: string,
    public publishedDate?: Date,
    public category?: string,
    public blogTags?: Array<string>
  ) {}
}

export class BlogTranslationBody {
  constructor(
    public blogId: string,
    public language: string,
    public sections: Array<{
      sectionTitle?: string;
      sectionText?: string;
      sectionMediaType?: string;
      sectionMediaPath?: string;
      sectionMediaText?: string;
      sectionMediaCredits?: string;
    }>,
    public quotes?: Array<string>,
  ) {}
}

export class BlogTranslationDraft {
  constructor(
    public blogId: string,
    public language: string,
    public title?: string,
    public description?: string,
    public lastSavedDate?: Date,
    public sections?: Array<{
        sectionTitle?: string;
        sectionText?: string;
        sectionMediaText?: string;
      }>,
      public  quotes?: Array<string>,
      public  blogTags?: Array<string>,

  ) {}
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
  ) {}
}
