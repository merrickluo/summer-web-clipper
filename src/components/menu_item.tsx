import { ReactNode, useCallback } from "react";

interface MenuItemProps {
  title: string;
  icon: ReactNode;
  selected?: boolean;
  onClick?: (title: string) => void;
}

const MenuItem = ({ icon, title, selected, onClick }: MenuItemProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(title);
    }
  }, [title]);

  return (
    <div
      className={(selected ? "bg-blue-200 " : "") + "p-2 rounded-lg my-2"}
      onClick={handleClick}
    >
      <div className="flex flex-row justify-start items-center cursor-pointer">
        <div className="p-1 mr-4 text-2xl">{icon}</div>
        <h1 className="">{title}</h1>
      </div>
    </div>
  );
};

export default MenuItem;
