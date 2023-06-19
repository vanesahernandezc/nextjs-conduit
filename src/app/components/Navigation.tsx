"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
//TODO: Logout-style, missing log-in style
//TODO: The class is little to the right
function Navigation() {
  const currentRoute = usePathname();
  const isUser = localStorage.getItem("userLogged") ? true : false;
  const item = localStorage.getItem("userLogged");
  const user = item ? JSON.parse(item) : null;
  return (
    <>
      <header className="ng-scope ng-isolate-scope">
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand ng-binding" href="/">
              conduit
            </Link>
            <ul className="nav navbar-nav pull-xs-right">
              {isUser ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={
                        currentRoute == "/" ? "nav-link active" : "nav-link"
                      }
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/editor"
                      className={
                        currentRoute == "/editor"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="ion-compose"></i>&nbsp;New Article{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/settings"
                      className={
                        currentRoute == "/settings"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/profile"
                      className={
                        currentRoute == "/profile"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      <Image
                        className="user-pic"
                        src={user?.image}
                        alt={user?.username}
                        width={26}
                        height={26}
                      />
                      &nbsp; {user.username}
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={
                        currentRoute == "/" ? "nav-link active" : "nav-link"
                      }
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/login"
                      className={
                        currentRoute == "/login"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/register"
                      className={
                        currentRoute == "/register"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
