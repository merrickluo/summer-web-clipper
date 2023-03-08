const Select = ({
  id,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      id={id}
      className="w-44 border bg-white text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
