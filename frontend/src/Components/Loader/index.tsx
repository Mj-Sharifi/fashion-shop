import React, { ReactNode } from "react";
import { BeatLoader, MoonLoader, PropagateLoader } from "react-spinners";

type loaderTypes = "MoonLoader" | "PropagateLoader" | "BeatLoader";
type props = {
  type: loaderTypes;
  color?: string;
  size?: number;
};
export default function Loader({ type, color = "oklch(0.558 0.288 302.321)", size = 40 }: props) {
  const loaderSwitcher = (
    type: loaderTypes,
    color: string
  ): ReactNode => {
    switch (type) {
      case "MoonLoader":
        return <MoonLoader size={size} color={color} />;
      case "PropagateLoader":
        return <PropagateLoader size={size} color={color} />;
      case "BeatLoader":
        return <BeatLoader size={size} color={color} />;
      default:
        return <></>;
    }
  };
  return <>{loaderSwitcher(type, color)}</>;
}
