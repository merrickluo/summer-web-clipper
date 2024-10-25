const Overlay = ({ children }) => {
  return (
    <div className="fixed bottom-2 right-2 h-3/5 w-1/3 rounded-lg border border-gray-300 bg-gray-50 shadow">
      {children}
    </div>
  );
};

export default Overlay;
