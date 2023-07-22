import React from "react";
import cx from "classnames";

import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
}) => {
  return (
    <button
      // TODO: Ajouter des noms de classes conditionnelles
      // - Doit avoir une condition pour attribuer la classe '.primary'
      // - Doit avoir une condition pour attribuer la classe '.secondary'
      className={$.button}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
