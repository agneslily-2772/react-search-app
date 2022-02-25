import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="navigation " style={{background:'#557a95'}}>
      
      <nav className="navbar py-3 navbar-expand">
        
        <div className="container">
          <Link className="navbar-brand" to="/" style={{fontWeight:'bolder'},{fontSize:'30px'},{color:'white'}}>React Search App</Link>
          <div>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item"><h5  style={{color:'white'}} className="nav-link" >Data is taken from </h5></li>
            <li className="nav-item"><a  style={{color:'white'}} className="nav-link" href="https://www.anapioficeandfire.com/api/books?pageSize=30" target="_blank">HERE</a></li>
              </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;