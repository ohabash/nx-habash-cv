import { twMerge } from "tailwind-merge";
import "./DownArrows.scss";

export const DownArrows = ({className}: any) => {
  return (
    <div className={twMerge("container1_", className)}>
      <div className="chevron inline-block"></div>
      <div className="chevron inline-block"></div>
      <div className="chevron inline-block"></div>
    </div>
  );
}