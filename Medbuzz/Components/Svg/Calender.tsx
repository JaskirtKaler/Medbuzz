import * as React from "react"
import Svg, {SvgProps, Path } from "react-native-svg"
interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
}
const Calender = ({width = 40, height = 40, color = "#231f20", ...props }: SvgComponentProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path 
        d="M19 4h-2V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7h16Zm0-9H4V7a1 1 0 0 1 1-1h2v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h2a1 1 0 0 1 1 1Z"
        fill={color}
    />
  </Svg>
)
export default Calender