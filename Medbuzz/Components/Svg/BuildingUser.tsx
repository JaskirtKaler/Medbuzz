import Svg, { Path, SvgProps } from "react-native-svg"

interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
}

const SvgComponent = ({ width = 40, height = 40, color = "#231f20", ...props }: SvgComponentProps) => (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 7h1m-1 3h1m4 0h1m-1 3h1m-6 0h1m4-6h1M7 21v-3a2 2 0 1 1 4 0v3H7Zm0 0H3V4.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C3.76 3 4.04 3 4.6 3h8.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C15 3.76 15 4.04 15 4.6V9m4.7 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.8 7.5v-.5A2.5 2.5 0 0 0 19 18h-1.5a2.5 2.5 0 0 0-2.5 2.5v.5h6.5Z"
      />
    </Svg>
  )
  export default SvgComponent
  