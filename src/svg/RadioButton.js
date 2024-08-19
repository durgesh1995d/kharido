import * as React from "react"
import Svg, { Defs, Path, Mask, Use } from "react-native-svg"

const RadioButton = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={13}
        height={13}
        {...props}
    >
        <Defs>
            <Path
                id="a"
                fillRule="evenodd"
                d="M0 6.5a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z"
            />
            <Mask
                id="b"
                x={0}
                y={0}
                maskContentUnits="userSpaceOnUse"
                maskUnits="userSpaceOnUse"
            >
                <Path d="M0 0h13v13H0z" />
                <Use fill="#fff" xlinkHref="#a" />
            </Mask>
        </Defs>
        <Use
            fillOpacity={0}
            stroke={props.isChecked ? "#002C6A" : '#808080'}
            strokeWidth={2}
            mask="url(#b)"
            opacity={0.58}
            xlinkHref="#a"
        />
        {props.isChecked
            && <Path
                fill="#002C6A"
                fillRule="evenodd"
                d="M6.5 3C8.432 3 10 4.568 10 6.5S8.432 10 6.5 10 3 8.432 3 6.5 4.568 3 6.5 3z"
            />}
    </Svg>
)

export default React.memo(RadioButton);
