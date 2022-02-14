export interface PasteNotifications {
  title: string;
  content: string;
  author: string;
  date: string;
  sentiment: string;
}

export interface Paste {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  sentiment: string;
  paste_entire_content: string;
  ner: any;
}
