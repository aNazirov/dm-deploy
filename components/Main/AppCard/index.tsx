import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	shadow?: "table";
}
type IHeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type IBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const AppCard = ({children, shadow, className, ...props}: ICardProps) => {
	return (
		<div
			className={cn("rounded", styles.card, className, {
				[styles.tableShadow]: shadow === "table",
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
