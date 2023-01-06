import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import {useAppSelector} from "../../../core/hooks";

interface TableProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement> {
	wrapperClassName?: string;
	linked?: boolean;
}

interface TableHeadSectionProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
	extended?: boolean;
}

type TableSectionProps = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

export const AppTable = ({children, linked, wrapperClassName, className, ...props}: TableProps) => {
	return (
		<div className={cn(styles.tableWrapper, wrapperClassName)}>
			<table className={cn(styles.table, className, {"linked-table": linked})} {...props}>
				{children}
			</table>
		</div>
	);
};

const THead = ({children, extended, className, ...props}: TableHeadSectionProps) => {
	return (
		<thead
			className={cn("text-main-bold", styles.thead, className, {
				[styles.extended]: extended,
			})}
			{...props}
		>
			{children}
		</thead>
	);
};
const TBody = ({children, className, ...props}: TableSectionProps) => (
	<tbody className={cn("text-main-regular", styles.tbody, className)} {...props}>
		{children}
	</tbody>
);
const TFoot = ({children, className, ...props}: TableSectionProps) => (
	<tfoot className={cn(styles.tfoot, className)} {...props}>
		{children}
	</tfoot>
);

AppTable.THead = THead;
AppTable.TBody = TBody;
AppTable.TFoot = TFoot;
