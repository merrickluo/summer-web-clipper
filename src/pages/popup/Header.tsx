import { GiEclipseFlare } from "react-icons/gi";
import { AiTwotoneSetting } from "react-icons/ai";

const Header = () => {
  return (
    <header className="bg-white h-16 w-full flex items-center border-b border-gray-300">
      <div className="flex ml-3 items-center w-full">
        <GiEclipseFlare className="w-8 h-8 text-orange-300" />
        <div className="ml-2">
          <span className="text-bold">Summber Web Clipper</span>
          <span className="text-xs ml-2">0.0.1</span>
          <p className="text-sm">Clip with Summary</p>
        </div>
        <AiTwotoneSetting className="ml-auto mr-6 w-8 h-8 hover:text-blue-600" />
      </div>
    </header>
  );
};

export default Header;
