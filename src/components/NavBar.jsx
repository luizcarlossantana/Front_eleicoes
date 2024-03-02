import { Link } from "react-router-dom";





const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-black">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">Navbar</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-white" aria-current="page" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Candidatos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled text-white">Gráficos</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
