"use client";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { usePathname } from "next/navigation";

//TODO: Logout-style, missing log-in style
//TODO: The class is little to the right
function Navigation() {
  const pathname = usePathname();
  const isSameURL = (route: any) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <header className="ng-scope ng-isolate-scope">
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand ng-binding" href="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link
                className={isSameURL("/") ? "nav-link active" : "nav-link"}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/login"
                className={isSameURL("/login") ? "nav-link active" : "nav-link"}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/register"
                className={
                  isSameURL("/register") ? "nav-link active" : "nav-link"
                }
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
