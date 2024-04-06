import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
  }

const SvgComponent = ({ width = 40, height = 40, color = "#231f20", ...props }: SvgComponentProps) => (
  <Svg
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21.28 6.4-9.54 9.54c-.95.95-3.77 1.39-4.4.76-.63-.63-.2-3.45.75-4.4l9.55-9.55a2.58 2.58 0 1 1 3.64 3.65v0Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11c2.21 0 3-1.8 3-4v-5"
    />
  </Svg>
)
export default SvgComponent
