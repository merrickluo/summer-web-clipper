import { ReactNode } from "react";
import pkg from "package.json";

import Icon from "@assets/icon";

interface HeaderProps {
  subtitle?: string;
  actions?: ReactNode | ReactNode[];
}

const Header = ({ subtitle, actions }: HeaderProps) => {
  return (
    // Certain websites injects CSS for `header` tags, had to use a `div` instead.
    <div className="swc:bg-white swc:rounded-t-lg swc:flex swc:items-center swc:border-b swc:border-gray-300 swc:py-2">
      <div className="swc:flex swc:ml-3 swc:items-center swc:w-full">
        <Icon className="swc:w-10 swc:h-10" />
        <div className="swc:flex swc:flex-col swc:ml-2">
          <div className="swc:flex swc:items-center">
            <span className="swc:text-lg">{pkg.name}</span>
            <span className="swc:text-xs swc:ml-2">{pkg.version}</span>
          </div>
          <span className="swc:text-sm">{subtitle}</span>
        </div>
        {actions}
      </div>
    </div>
  );
};

export default Header;
