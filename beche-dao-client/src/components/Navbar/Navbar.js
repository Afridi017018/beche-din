import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-sky-500">
  <div className="navbar-start">
    
    <a className="btn btn-ghost normal-case text-xl text-white">BecheDin</a>
  </div>
  
  <div className="navbar-end">
  <ul className="menu menu-horizontal  text-white px-1">
      <li><a>Profile</a></li>
      <li><a>About</a></li>
    </ul>
    <a className="btn">Logout</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;