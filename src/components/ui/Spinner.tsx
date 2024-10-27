import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
};

interface SpinnerProps {
  loading: boolean;
  color?: string;
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, color = "#ffffff", size = 150 }) => (
  <div className="sweet-loading">
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default Spinner;
