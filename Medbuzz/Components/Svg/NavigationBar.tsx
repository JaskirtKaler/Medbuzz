import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
  }
const SvgComponent = ({ width = 40, height = 40, color = "#000", ...props }: SvgComponentProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
    style={{transform: [{rotate: '90deg'}]}}
  >
    <G id="Layer_2">
      <Path d="M18 4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1s1-.4 1-1V5c0-.6-.4-1-1-1zM12 4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1s1-.4 1-1V5c0-.6-.4-1-1-1zM6 4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1s1-.4 1-1V5c0-.6-.4-1-1-1z" />
    </G>
  </Svg>
)
export default SvgComponent