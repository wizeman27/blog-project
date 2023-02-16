import { User } from "../user.model"

export class Blog {
  constructor(
    public author: User,
    public title: string,
    public sections: Array<{
      sectionTitle: string, sectionText: string
    }>,
    public imagePath: string,
    public quotes: Array<string>,
    public publishedDate: Date,
    public comments: Array<{
      commentText: string,
      commentAuthor: User,
      commentDate: Date
    }>,
  ){}
}
