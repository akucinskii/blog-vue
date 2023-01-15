export interface ArticleInterface {
  id: string;
  title: string;
  text: string;
  image_url?: string; // Api returns in snake case
  date: string;
  author: {
    username: string;
    url?: string;
    avatar_url: string;
    description: string;
  };
  category: {
    id: string;
    name: string;
  };
  disabled?: boolean;
}

export interface ResponseInterface {
  status: number | undefined;
  detail: string | undefined;
}

export interface MessageInterface {
  type: "success" | "error" | "warning" | "info" | undefined;
  text: string;
}

export interface CategoryInterface {
  id: string;
  name: string;
}

export interface RuleI {
  (v: string): true | string;
}
