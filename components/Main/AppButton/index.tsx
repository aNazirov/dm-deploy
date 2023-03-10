import React from "react";
import {AppButtonProps} from "./props";
import cn from "classnames";
import Link from "next/link";

export const AppButton = ({children, variant, size, rounded, withIcon, className, ...props}: AppButtonProps) => {
	if (props.useAs === "link") {
		const {useAs, ...restProps} = props;
		return (
			<Link
				className={cn("btn", {
					["text-btn"]: !variant,
					[`${variant}-btn`]: variant,
					[`${className}`]: className,
					[`btn-${size}`]: size,
					"text-with-icon": withIcon,
					...(rounded ? {[`rounded-${rounded}`]: rounded} : {rounded: true}),
				})}
				{...restProps}
			>
				{children}
			</Link>
		);
	} else if (props.useAs === "externalLink") {
		const {useAs, ...restProps} = props;
		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				className={cn("btn", {
					["text-btn"]: !variant,
					[`${variant}-btn`]: variant,
					[`${className}`]: className,
					[`btn-${size}`]: size,
					"text-with-icon": withIcon,
					...(rounded ? {[`rounded-${rounded}`]: rounded} : {rounded: true}),
				})}
				{...restProps}
			>
				{children}
			</a>
		);
	} else {
		const {useAs, ...restProps} = props;
		return (
			<button
				className={cn("btn", {
					["text-btn"]: !variant,
					[`${variant}-btn`]: variant,
					[`${className}`]: className,
					[`btn-${size}`]: size,
					"text-with-icon": withIcon,
					...(rounded ? {[`rounded-${rounded}`]: rounded} : {rounded: true}),
				})}
				{...restProps}
			>
				{children}
			</button>
		);
	}
};
