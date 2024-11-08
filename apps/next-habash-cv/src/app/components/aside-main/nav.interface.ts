import { IconType } from "react-icons";

export interface INavItem {
  title: string;
  icon?: React.ReactNode | null;
  iconClass?: string;
  subMenu?: INavItem[];
}