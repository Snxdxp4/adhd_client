import { Link } from "react-router";

function Header() {
  const token = localStorage.getItem("name");

  return (
    <nav className="flex max-w-7xl mx-auto items-center justify-between p-6">
      <div className="flex items-center">
        <svg
          className="w-8 h-8 text-indigo-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="ml-2 text-xl font-semibold">Mindflow</span>
      </div>

      {token ? (
        <span className="bg-indigo-600 p-2 rounded-md text-white  shadow-md">{token}</span>
      ) : (
        <Link to="/auth">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
            Get Started
          </button>
        </Link>
      )}
    </nav>
  );
}

export default Header;
