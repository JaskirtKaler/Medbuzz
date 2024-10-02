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
    viewBox="0 0 22 22"
    {...props}
  >
    <Path
      fill={color}
      fillRule="nonzero"
      d="M1.716.29 11 9.572 20.284.289a1 1 0 0 1 1.32-.083l.107.096a1 1 0 0 1 0 1.414L12.427 11l9.284 9.284a1 1 0 0 1 .083 1.32l-.096.107a1 1 0 0 1-1.414 0L11 12.427l-9.284 9.284a1 1 0 0 1-1.32.083l-.107-.096a1 1 0 0 1 0-1.414L9.573 11 .289 1.716A1 1 0 0 1 .206.396L.302.29a1 1 0 0 1 1.414 0Zm-.72.72L10.987 11l-9.99 9.99.012.014L11 11.013l9.99 9.99.014-.012L11.013 11l9.99-9.99-.012-.014L11 10.987 1.01.997l-.014.012Z"
    />
  </Svg>
)
export default SvgComponent