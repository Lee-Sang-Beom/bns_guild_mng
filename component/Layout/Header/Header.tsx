import { MenuItem } from "@/types/common/commonType";
import HeaderClient from "./HeaderClient";

interface IProps {
  menuList: MenuItem[];
}
export default function Header({ menuList }: IProps) {
  return <HeaderClient menuList={menuList} />;
}
