export interface ItemTemplate {
  name: string;
  Icon?: JSX.Element;
}

export interface LinkTemplate extends ItemTemplate {
  slug: string;
  description: string;
  sublinks?: LinkTemplate[];
}
