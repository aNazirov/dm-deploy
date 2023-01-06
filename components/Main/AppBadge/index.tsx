import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import {eReportStatusType} from "../../../core/models";

interface AppBadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	variant?: "warning" | "success" | "danger" | "primary-outline";
	statusId?: eReportStatusType;
}
export const AppBadge = ({className, variant, statusId, children, ...props}: AppBadgeProps) => {
	return (
		<div
			className={cn(styles.badge, className, {
				[styles.warning]: statusId === eReportStatusType.Sent || variant === "warning",
				[styles.danger]: statusId === eReportStatusType.Rejected || variant === "danger",
				[styles.success]: statusId === eReportStatusType.Approved || variant === "success",
				[styles.primaryOutline]: statusId === eReportStatusType.Created || variant === "primary-outline",
			})}
			{...props}
		>
			{children}
		</div>
	);
};
