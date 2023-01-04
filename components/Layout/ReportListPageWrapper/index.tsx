import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./styles.module.scss";
import {AppButton} from "../../Main";
import FilterIcon from "../../../assets/images/icons/filled/filter.svg";
import {eTable, eTablePermission} from "../../../core/models";
import {useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import cn from "classnames";

interface TablePageWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	cb?: () => void;
	table: eTable;
}
export const ReportListPageWrapper = ({children, table, cb, className, ...props}: TablePageWrapperProps) => {
	const permissions = useAppSelector(({user}) => user.current?.permissions);
	const currentPermission = permissions?.find((p) => p.table === table);

	const url = useRouter();

	return (
		<div className={cn("flex-col h-100", className)} {...props}>
			<div className={styles.filters}>
				<div className={styles.filterLabel}>
					<AppButton variant="primary-outline" size="lg" withIcon>
						<FilterIcon width="24px" height="24px" className="main-btn-text-color" />
						<span>Фильтр</span>
					</AppButton>
				</div>

				<div className={styles.filterLabel}>
					<span className="text-main-bold">Статус:</span>
					<div className="d-flex gap-0.125">
						<AppButton className="active" variant="primary-outline" size="lg">
							Все
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Отправлен
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Принят
						</AppButton>
						<AppButton variant="primary-outline" size="lg">
							Отказан
						</AppButton>
					</div>
				</div>
				{currentPermission?.permissions.includes(eTablePermission.Create) && (
					<AppButton useAs="link" href={`${url.pathname}/create`} className="ms-auto" variant="main" size="lg">
						Создать
					</AppButton>
				)}
			</div>
			{children}
		</div>
	);
};
