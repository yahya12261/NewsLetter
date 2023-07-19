export interface Post {
  postId: number;
  accountId: number;
  Paragraph: String;
  DateOfCreated: String;
  imgLink: String;
  imgId: String;
  lastComment: Comment;
  comments: Comment[];
  IsLike: number;
  coummentCount: number;
  likesCount: number;
  person: Person;
  addComment: boolean;
  showMore: boolean;
  personInfo: Person;
}
interface Comment {
  personId: number;
  personInfo: Person;
  commentContent: String;
  CommentDate: Date;
}
export interface Person {
  id: number;
  first: String;
  middle: String;
  last: String;
  Dob: Date;
  DateOfCreated: Date;
  imgId: number;
  ProfileImage: Image;
}

export interface Image {
  imgId: number;
  imgSize: number;
  Link: String;
  Ext: String;
}
export interface PostToAdd {
  image: File;
  Paragraph: String;
}
