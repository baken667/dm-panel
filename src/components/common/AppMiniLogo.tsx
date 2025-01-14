import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  className?: string;
};

function AppMiniLogo({...props}: Props) {
  return (
    <svg
      width="32.000000"
      height="32.000000"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g clipPath="url(#clip32_1)">
        <path
          id="square"
          d="M6.85 0L25.14 0C28.92 0 32 3.07 32 6.85L32 25.14C32 28.92 28.92 32 25.14 32L6.85 32C3.07 32 0 28.92 0 25.14L0 6.85C0 3.07 3.07 0 6.85 0Z"
          fill="current"
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
        <path
          id="red"
          d="M5.71 22.17L19.88 22.17C20.51 22.17 21.02 22.68 21.02 23.31C21.02 23.94 20.51 24.45 19.88 24.45L5.71 24.45C5.08 24.45 4.57 23.94 4.57 23.31C4.57 22.68 5.08 22.17 5.71 22.17Z"
          fill="#F31260"
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
        <path
          id="purple"
          d="M5.71 14.62L26.28 14.62C26.91 14.62 27.42 15.14 27.42 15.77C27.42 16.4 26.91 16.91 26.28 16.91L5.71 16.91C5.08 16.91 4.57 16.4 4.57 15.77C4.57 15.14 5.08 14.62 5.71 14.62Z"
          fill="#9353D3"
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
        <path
          id="blue"
          d="M12.11 7.31L26.28 7.31C26.91 7.31 27.42 7.82 27.42 8.45C27.42 9.08 26.91 9.59 26.28 9.59L12.11 9.59C11.48 9.59 10.97 9.08 10.97 8.45C10.97 7.82 11.48 7.31 12.11 7.31Z"
          fill="#338EF7"
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
export default AppMiniLogo;
