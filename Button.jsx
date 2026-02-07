import { Link } from "react-router-dom";

function Button({ children, onClick, to, type = "button", className = "" }) {
  const base =
    "inline-block px-6 py-2 rounded-lg shadow font-medium transition bg-blue-600 text-white hover:bg-blue-700";

  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={`${base} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
