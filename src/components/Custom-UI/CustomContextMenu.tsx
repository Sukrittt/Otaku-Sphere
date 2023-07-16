import { FC, ReactNode } from "react";

interface CustomContextMenuProps {
  children: ReactNode;
}

const CustomContextMenu: FC<CustomContextMenuProps> = ({ children }) => {
  return <div>CustomContextMenu</div>;
};

export default CustomContextMenu;
