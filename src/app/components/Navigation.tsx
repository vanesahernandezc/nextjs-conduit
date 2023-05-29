"use client";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { usePathname } from "next/navigation";

//TODO: Logout-style, missing log-in style
function Navigation() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand ng-binding" href="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login" className="nav-link">
              <i className="ion-compose"></i>&nbsp;Sign In{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/register" className="nav-link">
              <i className="ion-gear-a"></i>&nbsp;Sign Up{" "}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
