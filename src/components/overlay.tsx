const Overlay = ({ children }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-50 shadow">
      {children}
    </div>
  );
};

export default Overlay;
