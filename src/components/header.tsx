import { ReactNode } from "react";
import pkg from "package.json";

import Icon from "@assets/icon";

interface HeaderProps {
  subtitle?: string;
  actions?: ReactNode | ReactNode[];
}

const Header = ({ subtitle, actions }: HeaderProps) => {
  return (
    <header className="swc-bg-white swc-rounded-t-lg swc-flex swc-items-center swc-border-b swc-border-gray-300">
      <div className="swc-flex swc-ml-3 swc-items-center swc-w-full">
        <Icon className="swc-w-10 swc-h-10" />
        <div className="swc-flex swc-flex-col swc-ml-2">
          <span className="swc-text-lg">{pkg.name}</span>
          <span className="swc-text-xs swc-ml-2">{pkg.version}</span>
          <p className="swc-text-sm">{subtitle}</p>
        </div>
        {actions}
      </div>
    </header>
  );
};

export default Header;
