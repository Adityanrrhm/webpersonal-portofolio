"use client";

import { SVGProps } from "react";

export const Tableau = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z"
      fill="#E97627"
    />
    <path
      d="M7.5 8.5V15.5H9.5V13.5H11.5V15.5H13.5V8.5H11.5V10.5H9.5V8.5H7.5ZM14.5 8.5V15.5H16.5V8.5H14.5Z"
      fill="white"
    />
  </svg>
);