import { GiEclipseFlare } from "react-icons/gi";
import { ReactNode } from "react";

interface HeaderProps {
  subtitle: string;
  actions: ReactNode | ReactNode[];
}

const Header = ({ subtitle, actions }: HeaderProps) => {
  return (
    <header className="bg-white h-16 w-full flex items-center border-b border-gray-300">
      <div className="flex ml-3 items-center w-full">
        <GiEclipseFlare className="w-8 h-8 text-orange-300" />
        <div className="ml-2">
          <span className="text-lg">Summber Web Clipper</span>
          <span className="text-xs ml-2">0.0.1</span>
          <p className="text-sm">{subtitle}</p>
        </div>
        {actions}
      </div>
    </header>
  );
};

export default Header;
