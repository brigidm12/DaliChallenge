import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";  
import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffb3ff;
  padding: 0 2rem 0 0;/* Adjusted padding for the right side */
  z-index: 999;
  position: fixed; /* Make the navbar fixed */
  width: 100vw; /* Fill the entire width */
  left: 0; /* Stick to the left */
  top: 0; /* Stick to the top */
`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem; 
  height: 100%;
  cursor: pointer;
  
  &.active {
    color: #4d4dff;
  }
  justify-content: center;
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;

  @media screen and (max-width: 768px) {
    display: block;
    position: fixed; 
    top: 0px;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  margin-right: -24px; /* Second Nav */
  /* margin-right: 24px; */ /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
