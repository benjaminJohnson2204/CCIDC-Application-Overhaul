import { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";

import cartIcon from "../assets/cart.svg";
import logo from "../assets/logo.svg";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { FormContext } from "../contexts/FormContext.tsx";

import styles from "./NavBar.module.css";
import { Button } from "./index.ts";

export function NavBar() {
  const destinations = {
    consumers: "https://ccidc.org/consumer-items-of-interest/",
    cids: "https://ccidc.org/wp-login.php",
    aboutUs: "https://ccidc.org/about-us/",
    resources: "https://ccidc.org/", // resources nav item on ccidc.org does not have link address
    contactUs: "https://ccidc.org/contact-ccidc/",
    login: "https://ccidc.org/wp-login.php",
    payment: "https://ccidc.org/product-category/idex/",
  };

  const { isLoggedIn, logout } = useContext(AuthContext);

  const { formData } = useContext(FormContext);

  const applyRedirectUrl = useMemo(
    () => (formData.applicantPath ? `/application` : "/prescreening"),
    [formData.applicantPath],
  );

  return (
    <nav className={styles.navBar}>
      <div className={styles.navContent}>
        <NavLink className={styles.navLink} to={"/"}>
          <img src={logo} className={styles.logo} alt={"CCIDC"} />
        </NavLink>
        <ul className={styles.navigation}>
          <li>
            <a className={styles.legacyLink} href={destinations.consumers}>
              Consumers
            </a>
          </li>
          <li>
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              to={"/candidates"}
            >
              Candidates
            </NavLink>
          </li>
          <li>
            <a className={styles.legacyLink} href={destinations.cids}>
              CIDS
            </a>
          </li>
          <li>
            <a className={styles.legacyLink} href={destinations.aboutUs}>
              About Us
            </a>
          </li>
          <li>
            <a className={styles.legacyLink} href={destinations.resources}>
              Resources
            </a>
          </li>
          <li>
            <a className={styles.legacyLink} href={destinations.contactUs}>
              Contact Us
            </a>
          </li>
          {isLoggedIn && (
            <li>
              <a href={destinations.payment}>
                <img src={cartIcon} className={styles.navIcon} alt="shop"></img>
              </a>
            </li>
          )}

          <li>
            {isLoggedIn ? (
              <button className={styles.logInOutButton} onClick={() => void logout()}>
                Logout
              </button>
            ) : (
              <NavLink className={styles.logInOutButton} to={"/login"}>
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink className={styles.navLink} to={applyRedirectUrl}>
              <Button onClick={undefined}>Apply</Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
