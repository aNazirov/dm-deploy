import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import {LinkProps} from "next/link";

type BaseProps = {
	children: ReactNode;
	withIcon?: boolean;
	variant?: "main" | "primary-outline" | "success" | "warning" | "danger" | "dark" | "outline-success" | "text";
	size?: "xl" | "lg" | "square";
	className?: string;
	rounded?: "md" | "lg";
};

type ButtonAsButton = BaseProps &
	Omit<
		Omit<
			DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
			"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "ref"
		>,
		keyof BaseProps
	> & {
		useAs?: "button";
	};

type ButtonAsLink = BaseProps &
	Omit<LinkProps, keyof BaseProps> & {
		useAs: "link";
	};

type ButtonAsExternal = BaseProps &
	Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, keyof BaseProps> & {
		useAs: "externalLink";
	};

export type AppButtonProps = ButtonAsButton | ButtonAsExternal | ButtonAsLink;
