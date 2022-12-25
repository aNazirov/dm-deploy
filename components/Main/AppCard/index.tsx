import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	shadow?: "table";
	rounded?: "md" | "lg";
}

type IHeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type IBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const AppCard = ({children, shadow, className, rounded, ...props}: ICardProps) => {
	return (
		<div
			className={cn(styles.card, className, {
				[styles.tableShadow]: shadow === "table",
				...(rounded ? {[`rounded-${rounded}`]: rounded} : {rounded: true}),
			})}
			{...props}
		>
			{children}
		</div>
	);
};

const Header = ({children, className, ...props}: IHeaderProps) => (
	<div className={cn("rounded-top", styles.cardHeader, className)} {...props}>
		<h3 className="text-table-header">{children}</h3>
	</div>
);
const Body = ({children, className, ...props}: IBodyProps) => (
	<div className={cn("rounded-bottom", styles.cardBody, className)} {...props}>
		{children}
	</div>
);

AppCard.Header = Header;
AppCard.Body = Body;
