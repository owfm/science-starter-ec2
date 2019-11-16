import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div className="loadingPage">
    <ReactLoading type={type} color={color} height={150} width={150} />
  </div>
);

export default Loading;
