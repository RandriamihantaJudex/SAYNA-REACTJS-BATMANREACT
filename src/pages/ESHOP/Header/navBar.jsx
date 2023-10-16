import { Link } from "react-router-dom";
import React from "react";
import './navStyle.css';

const ListNav = () => {
  return (
    <ul>
      <Link to={"./"}>HOME</Link>
      <Link to={"./"}>GAME</Link>
      <Link to={"./"}>E-SHOP</Link>
      <Link to={"./"}>MON COMPTE</Link>
    </ul>
  );
};

export default function NavBar() {
  return (
    <div className="navBar">
      <img src="../../../../../assets/logos/logohome.png" alt="icons"/>
      <ListNav/>
    </div>
  );
}
