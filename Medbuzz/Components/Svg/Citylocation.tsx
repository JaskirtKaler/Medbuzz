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
    viewBox="0 0 60 50"
    {...props}
  >
    <Path
      d="M10 4v16H2.994l.152 26H47V8H31v20h-5.004V4.008L10 4zm2 2 11.996.008V28h-4.982l-.016-8H12V6zm3 2v2h2V8h-2zm4.04 0v2H21V8h-1.96zM33 10h12v34h-5.04v-4H38v4h-5V10zm-18 2v2h2v-2h-2zm4 0v2h2v-2h-2zm17 .004V14h2v-1.996h-2zm4.02.004v2.013h1.96v-2.013h-1.96zM36 16.016V18h2v-1.984h-2zm4.02 0V18h1.96v-1.984h-1.96zM36 20v2h2v-2h-2zm4 0v2h1.98v-2H40zM5.006 22h11.996l.012 6h-.016l.043 16h-5.06v-4H10.02v4H5.135l-.13-22zM8 24v2.016h2.04V24H8zm4.04 0v2.016H14V24h-1.96zm23.96.008v1.99h2v-1.99h-2zm4 0v1.99h1.98v-1.99H40zM8 27.984V30h2.04v-2.016H8zm4.04 0V30H14v-2.016h-1.96zm23.96.008v2.016h2v-2.016h-2zm4.02 0v2.016h1.96v-2.016h-1.96zM19.018 30H31v14h-5v-4h-2v4h-4.957l-.025-14zM8 32v2.016h2.04V32H8zm4.04 0v2.016H14V32h-1.96zM22 32v2.016h2V32h-2zm4 0v2.016h2V32h-2zm10 0v2.016h2V32h-2zm4.02 0v2.016h1.96V32h-1.96zM22 35.984V38h2v-2.016h-2zm4 0V38h2v-2.016h-2zm10 0V38h2v-2.016h-2zm4.02 0V38h1.96v-2.016h-1.96z"
      data-name="city location"
      fill={color}
    
    />
  </Svg>
)
export default SvgComponent
