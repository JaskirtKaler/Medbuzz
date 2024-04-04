import * as React from "react"

import Svg, { SvgProps, Path } from "react-native-svg"
interface SvgComponentProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
}

const SvgComponent = ({ width = 40, height = 40, color = "#231f20", ...props }: SvgComponentProps) => (
    <Svg

        width={width}
        height={height}
        viewBox="0 0 32 32"
        {...props}
    >
        <Path
            d="M22 29.73a1 1 0 0 1-.71-.29L9.93 18.12a3 3 0 0 1 0-4.24L21.24 2.56A1 1 0 1 1 22.66 4L11.34 15.29a1 1 0 0 0 0 1.42L22.66 28a1 1 0 0 1 0 1.42 1 1 0 0 1-.66.31Z"
            data-name="arrow left"
            fill={color}

        />
    </Svg>
)
export default SvgComponent
