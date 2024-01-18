import { Outlet } from "react-router-dom";
import logo from '../assets/img/logo-futbol.png';

export function Header() { 

    return (
      <>
          <header>
            <img src={logo} className="logo" alt="logo" />
          </header>
          <Outlet />
      </>
    )
  }
   