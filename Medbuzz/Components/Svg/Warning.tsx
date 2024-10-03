import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
interface SvgComponentProps extends SvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const Warning = ({ width = 60, height = 60, color = "#0EA68D", ...props }: SvgComponentProps) => (
    <Svg width={width} height={height} viewBox="0 0 32 32">
    <Path fill={color} d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"/>
  </Svg>
);

export default Warning;