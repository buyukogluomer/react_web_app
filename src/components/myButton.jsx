const MyButton = ({ text, onClick, type = "button", variant = "primary" }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]} text-white px-4 py-2 rounded-lg font-medium transition-colors w-full shadow-sm`}
    >
      {text}
    </button>
  );
};

export default MyButton;