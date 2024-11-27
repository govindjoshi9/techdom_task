import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <Link to="/dashboard" className="text-xl font-bold">
          Loan App
        </Link>
        <div>
          <Link to="/" className="mr-4">
            Login
          </Link>
          <Link to="/register" className="mr-4">
            Register
          </Link>
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
