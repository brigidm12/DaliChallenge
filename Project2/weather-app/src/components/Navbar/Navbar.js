import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/search" activeStyle>
                        Search Page
                    </NavLink>
                    <NavLink to="/display" activeStyle>
                        Weather Display
                    </NavLink>
                    <NavLink to="/main" activeStyle>
                        Weather Main
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
