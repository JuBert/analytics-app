import '../index.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to="/" className="navbar-links">
        <div className="navbar-logo">Home</div>
      </Link>
      <div className="navbar-items-container">
        <Link to="/dashboard" className="navbar-links">
          <div className="navbar-items">Dashboard</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
