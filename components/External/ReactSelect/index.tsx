import React from "react";
import Select, {Props} from "react-select";
import cn from "classnames";
import styles from "./styles.module.scss";

interface ReactSelectProps extends Props {
	bg?: "colored";
	dimension?: "sm" | "lg";
}

export const ReactSelect = ({bg, dimension, className, styles: reactStyles, ...props}: ReactSelectProps) => {
	return (
		<Select
			classNamePrefix="my"
			className={cn("text-main-regular", styles.mySelect, {
				...(dimension ? {[styles[dimension]]: dimension} : {[styles.sm]: true}),
				...(bg ? {[styles[bg]]: bg} : {}),
				[`${className}`]: className,
			})}
			styles={{
				...reactStyles,
				indicatorSeparator: () => ({display: "none"}),
			}}
			{...props}
		/>
	);
};
