import { ReactElement, useCallback } from "react";

interface MenuItemProps {
  title: string;
  icon: ReactElement;
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
      className={(selected ? "swc-bg-blue-200 " : "") + "swc-p-2 swc-rounded-lg swc-my-2"}
      onClick={handleClick}
    >
      <div className="swc-flex swc-flex-row swc-justify-start swc-items-center swc-cursor-pointer swc-select-none">
        <div className="swc-p-1 swc-mr-4 swc-text-2xl">{icon}</div>
        <h1 className="">{title}</h1>
      </div>
    </div>
  );
};

export default MenuItem;
