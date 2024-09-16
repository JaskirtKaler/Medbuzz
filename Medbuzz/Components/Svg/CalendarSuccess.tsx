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
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fill="#0F0F0F"
            fillRule="evenodd"
            d="M7 1a1 1 0 0 0-1 1v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h8.101a7.018 7.018 0 0 1-1.427-2H5a1 1 0 0 1-1-1v-9h16v.29a6.972 6.972 0 0 1 2 .965V6a3 3 0 0 0-3-3h-1V2a1 1 0 1 0-2 0v1H8V2a1 1 0 0 0-1-1Zm9 5V5H8v1a1 1 0 0 1-2 0V5H5a1 1 0 0 0-1 1v3h16V6a1 1 0 0 0-1-1h-1v1a1 1 0 1 1-2 0Z"
            clipRule="evenodd"
        />
        <Path
            fill="#0F0F0F"
            d="M15.293 17.707a1 1 0 0 1 1.414 0l.641.641 1.9-1.899a1 1 0 0 1 1.414 1.414l-2.54 2.54a.996.996 0 0 1-.29.202 1 1 0 0 1-1.212-.156l-1.327-1.328a1 1 0 0 1 0-1.414Z"
        />
        <Path
            fill="#0F0F0F"
            fillRule="evenodd"
            d="M24 18a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-10.018 0a4.018 4.018 0 1 0 8.036 0 4.018 4.018 0 0 0-8.036 0Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default SvgComponent