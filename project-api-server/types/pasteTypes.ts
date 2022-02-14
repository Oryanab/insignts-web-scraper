export interface PasteDb {
  title: string;
  content: string;
  author: string;
  date: string;
  sentiment: string;
  paste_entire_content: string;
  ner: object;
}

export interface PasteInterface {
  title: string;
  content: string;
  author: string;
  date: string;
  sentiment: string;
}
