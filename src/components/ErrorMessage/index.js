import "./styles.css";

import React from "react";

const ErrorMessage = ({message}) => {
  return (
    <div className="error-message" augmented-ui="tl-clip br-clip exe">{message}</div>
  );
};

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
