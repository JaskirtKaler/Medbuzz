import * as React from "react"
import Svg, {SvgProps, Path } from "react-native-svg"
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
      strokeWidth={1.5}
      d="M16 10h.01M12 10h.01M8 10h.01M3 10c0-5.353 2.118-7 9-7s9 1.647 9 7-2.118 7-9 7c-.34 0-.67-.004-.988-.012L7 21v-4.506C4.033 15.669 3 13.738 3 10Z"
    />
  </Svg>
)
export default SvgComponent
