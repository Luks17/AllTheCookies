export type SubmenuCords = {
  center: number;
  bottom: number;
};

export interface ItemTemplate {
  name: string;
  Icon: JSX.Element;
}

export interface LinkTemplate extends ItemTemplate {
  id: number;
  url?: string;
  sublinks?: LinkTemplate[];
}
