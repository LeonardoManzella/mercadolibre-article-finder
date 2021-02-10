import "./styles.css";

import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import * as ROUTES from "../../constants/routes";

const MenuBar = ({defaultTerm, executeSearch}) => {
  const [searchTerm, setSearchTerm] = useState(defaultTerm || "");

  const isDesktopOrTablet = useMediaQuery({
    query: "(min-device-width: 1100px)"
  });

  return (
    <div className="burger-menu-styles">
      <Menu width={isDesktopOrTablet ? "20%" : "60%"}>
        <a id="home" className="menu-item" href={ROUTES.HOME}>
          Home
        </a>
      </Menu>
      <textarea onChange={event => setSearchTerm(event.target.value)} className="search-input" rows="2" placeholder="Buscar" wrap="soft" />
      <button className="search-button" onClick={() => executeSearch(searchTerm)}>
        <svg className="search-icon" focusable="false" viewBox="0 0 24 24" >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
            </path></svg>
      </button>
    </div>
  );
};

MenuBar.displayName = "MenuBar";

export default MenuBar;
