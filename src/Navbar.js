import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {

  return (
  <>
<nav className="navbar navbar-light bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand text-white">Starship: a game made with unity</a>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>   
  </>
  );
}

export default Navbar;