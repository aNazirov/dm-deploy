import React, {DetailedHTMLProps, HtmlHTMLAttributes} from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLHRElement>, HTMLHRElement> {
	height?: number;
}

export const AppDivider = ({height, className, ...props}: IProps) => (
	<hr className={cn("hr", styles.hr, className)} style={height ? {height} : {}} {...props} />
);
