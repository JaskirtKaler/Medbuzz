import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
}
const SvgComponent = ({width = 40, height = 40, color = "#0EA68D", ...props }: SvgComponentProps) =>(
  <Svg
    width={width}
    height={height}
    fill={color}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12h16m-8-8v16"
    />
  </Svg>
)
export default SvgComponent
