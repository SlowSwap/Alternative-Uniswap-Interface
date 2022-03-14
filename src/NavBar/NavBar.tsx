import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItems } from "./MenuItems";

export default function NavBar() {
  const logoUrl = process.env.REACT_APP_SITE_URL + '/logo.svg'
  const location = useLocation();

  return (
    <nav>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mt-2 mx-auto h-36 w-auto bg-opacity-40 bg-slate-50 rounded-full"
          src={logoUrl}
          alt="SlowSwap Sloth face"
        />
        <h2 className="mt-2 text-center text-5xl font-bold text-white">
          SlowSwap
        </h2>
        <ul className="mt-2 mb-3 text-center text-xl  list-none flex items-center justify-center gap-8">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  className={"font-medium text-white " + (location.pathname === item.url ? "underline" : "")}
                  to={item.url}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
