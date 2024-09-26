/* eslint-disable prettier/prettier */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SvgComponentProps {
  width?: number;
  height?: number;
  color?: string;
}

const SaveSVG = ({ width = 40, height = 40, color = "#231f20", ...props }: SvgComponentProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
      fill={color}
    />
  </Svg>
);

export default SaveSVG;
