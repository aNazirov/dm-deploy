import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {AppButton, AppInput, eCustomFilter} from "../../Main";
import FilterIcon from "../../../assets/images/icons/filled/filter.svg";
import TrashIcon from "../../../assets/images/icons/filled/trash.svg";
import {eReportStatusType, eTable, eTablePermission, IReportGetParams} from "../../../core/models";
import {useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import cn from "classnames";
import {AppOrganizationSelect} from "../../Main/AppOrganizationSelect";
import {useForm} from "react-hook-form";
import SearchIcon from "../../../assets/images/icons/filled/search.svg";
import autoAnimate from "@formkit/auto-animate";

interface TablePageWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	cb?: (filters: IReportGetParams) => void;
	table: eTable;
	disabledFilters?: eCustomFilter[];
}
export const ReportListPageWrapper = ({
	children,
	table,
	cb,
	className,
	disabledFilters,
	...props
}: TablePageWrapperProps) => {
	const [permissions, paternalId] = useAppSelector(({user}) => [
		user.current?.permissions,
		user.current?.organization.id,
	]);

	const currentPermission = permissions?.find((p) => p.table === table);

	const url = useRouter();

	const parentRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (parentRef.current) {
			autoAnimate(parentRef.current);
		}
	}, [parentRef]);

	const {setValue, register, handleSubmit, getValues} = useForm<IReportGetParams>();

	const onStatusChange = (statusId?: eReportStatusType) => () => {
		setValue("statusId", statusId);
		setValue("skip", 0);
		setValue("take", 20);
		cb?.({...getValues(), statusId, skip: 0, take: 20});
	};

	const onSelect = (option: unknown) => {
		const field = option as {label: string; value: number}[] | {label: string; value: number};

		if (Array.isArray(field)) {
			setValue(
				"organizations",
				field.map((f) => +f.value),
			);
		} else {
			setValue("organizations", [+field.value]);
		}
		setValue("skip", 0);
		setValue("take", 20);
	};

	const onSubmit = (fields: IReportGetParams) => {
		cb?.({...fields, skip: 0, take: 20});
	};

	const onClear = () => {
		setValue("organizations", null as unknown as undefined);
		setValue("start", undefined);
		setValue("end", undefined);
		cb?.({...getValues(), organizations: undefined, start: undefined, end: undefined});
		setIsVisible(false);
	};

	const toggleVisibility = (isVisible: boolean) => () => {
		if (!isVisible) {
			return onClear();
		}
		setIsVisible(isVisible);
	};

	return (
		<div className={cn("flex-col h-100", className)} {...props}>
			<div className="mb-1.25">
				<div className={styles.filters}>
					<div className={styles.filterLabel}>
						<AppButton onClick={toggleVisibility(!isVisible)} variant="primary-outline" size="lg" withIcon>
							<FilterIcon width="24px" height="24px" className="main-btn-text-color" />
							<span>Фильтр</span>
						</AppButton>
					</div>

					<div className={styles.filterLabel}>
						<span className="text-main-bold">Статус:</span>
						<div className="d-flex gap-0.125">
							<AppButton
								onClick={onStatusChange()}
								className={cn({active: !getValues().statusId})}
								variant="primary-outline"
								size="lg"
							>
								Все
							</AppButton>
							<AppButton
								onClick={onStatusChange(eReportStatusType.Sent)}
								className={cn({active: getValues().statusId === eReportStatusType.Sent})}
								variant="primary-outline"
								size="lg"
							>
								Отправлен
							</AppButton>

							<AppButton
								onClick={onStatusChange(eReportStatusType.Approved)}
								className={cn({active: getValues().statusId === eReportStatusType.Approved})}
								variant="primary-outline"
								size="lg"
							>
								Принят
							</AppButton>
							<AppButton
								onClick={onStatusChange(eReportStatusType.Rejected)}
								className={cn({active: getValues().statusId === eReportStatusType.Rejected})}
								variant="primary-outline"
								size="lg"
							>
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

				<div ref={parentRef}>
					{isVisible && (
						<form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-wrap gap-0.75 pt-1.25">
							{!disabledFilters?.includes(eCustomFilter.start) && <AppInput type="date" {...register("start")} />}
							{!disabledFilters?.includes(eCustomFilter.end) && <AppInput type="date" {...register("end")} />}
							{!disabledFilters?.includes(eCustomFilter.organizations) && (
								<AppOrganizationSelect
									paternalId={paternalId}
									isMulti
									className="min-w-10 w-max-20"
									onChange={onSelect}
								/>
							)}
							<AppButton variant="primary-outline" size="square">
								<SearchIcon width="24px" height="24px" className="main-btn-text-color" />
							</AppButton>
							<AppButton onClick={onClear} variant="primary-outline" size="square" type="button">
								<TrashIcon width="24px" height="24px" className="main-btn-text-color" />
							</AppButton>
						</form>
					)}
				</div>
			</div>
			{children}
		</div>
	);
};
