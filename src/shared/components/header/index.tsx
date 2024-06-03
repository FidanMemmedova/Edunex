import { useState } from "react";

import { NavLink, Link } from "react-router-dom";
import { Button, Flex } from "antd";
import { Logo } from "../logo";

import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

export function Header() {
  const [buttonClick, setButtonClick] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = localStorage.getItem("user_email");
  console.log(isLoggedIn);

  function handleClick() {
    if (buttonClick) {
      setButtonClick(false);
    } else {
      setButtonClick(true);
    }
  }

  return (
    <header>
      <nav>
        <Flex className="flex-container" justify="space-between" align="center">
          <Flex gap="64px">
            <Logo to="/" />

            <Flex gap="48px" align="center" className="flex-info">
              <li>
                <NavLink to="*" className="links">
                  Haqqımızda
                </NavLink>
              </li>
              <li>
                <NavLink to="*" className="links">
                  Tariflər
                </NavLink>
              </li>
            </Flex>
          </Flex>

          {/* <button></button> */}

          <Flex className="flex-sign" gap="16px" align="center">
            {isLoggedIn ? (
              <div>{email}</div>
            ) : (
              <>
                <NavLink to="auth/signup" className="links">
                  Qeydiyyat
                </NavLink>
                <NavLink to="auth">
                  <Button type="primary" className="signin-btn" ghost>
                    <span>Daxil ol</span>
                  </Button>
                </NavLink>
              </>
            )}
          </Flex>

          <div className="toogle-btn">
            <button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </button>
          </div>
        </Flex>

        <div className={buttonClick ? "dropdown-menu open" : "dropdown-menu"}>
          <li>
            <Link to="*" className="links">
              Haqqımızda
            </Link>
          </li>
          <li>
            <Link to="*" className="links">
              Tariflər
            </Link>
          </li>
          <li>
            <Link to="auth/signup" className="links">
              Qeydiyyat
            </Link>
          </li>
          <li>
            <Link to="auth" className="links">
              Daxil ol
            </Link>
          </li>
        </div>
      </nav>
    </header>
  );
}
