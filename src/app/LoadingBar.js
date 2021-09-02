import React from "react";
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
const override = css`
  display: block;
  margin-top: 300px;
`;
const LoadingBar = () => {
  return (
    <div className="login-container">
      <BarLoader color={"#36D7B7"} height={5} width={200} css={override} />
    </div>
  );
};
export default LoadingBar;
