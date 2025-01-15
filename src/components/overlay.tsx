import { ReactElement } from "react";

interface OverlayProps {
  children: ReactElement | ReactElement[];
}

const Overlay = ({ children }: OverlayProps) => {
  return (
    <div className="swc-preflight swc-fixed swc-z-999 swc-bottom-2 swc-right-2 swc-h-3/5 swc-w-1/3 swc-rounded-lg swc-border swc-border-gray-300 swc-bg-gray-50 swc-shadow">
      {children}
    </div>
  );
};

export default Overlay;
