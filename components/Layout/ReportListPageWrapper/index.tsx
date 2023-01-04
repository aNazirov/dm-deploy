import React, {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./styles.module.scss";
import {AppButton} from "../../Main";
import FilterIcon from "../../../assets/images/icons/filled/filter.svg";
import {eReportStatusType, eTable, eTablePermission, IReportGetParams} from "../../../core/models";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import cn from "classnames";
import {getAllDailyReportsThunk} from "../../../core/store/report/daily/daily-report.thunks";
import {getAllFinancialExpensesReportsThunk} from "../../../core/store/report/financialExpenses/financial-expenses-report.thunks";
import {getAllMediaPlaceReportsThunk} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {getAllTelemedicineReportsThunk} from "../../../core/store/report/telemedicine/telemedicine.thunks";
import {getAllTrainingReportsThunk} from "../../../core/store/report/training/training-report.thunks";
import {getAllVisitForeignSpecialistsReportsThunk} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import {getAllScientificEventsReportsThunk} from "../../../core/store/report/scientificEvents/scientific-events-report.thunks";
import {getAllScientificWorksReportsThunk} from "../../../core/store/report/scientificWorks/scientific-works-report.thunks";
import {getAllScienceReportsThunk} from "../../../core/store/report/science/science.thunks";
import {getAllInsuranceReportsThunk} from "../../../core/store/report/insurance/insurance-report.thunks";
import {getAllImplementationReportsThunk} from "../../../core/store/report/implementation/implementation-report.thunks";
import {getAllAppealsReportsThunk} from "../../../core/store/report/appeals/appeals-report.thunks";
import {getAllDepartureReportsThunk} from "../../../core/store/report/departure/departure-report.thunks";

interface TablePageWrapperProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	cb?: () => void;
	table: eTable;
}
export const ReportListPageWrapper = ({children, table, cb, className, ...props}: TablePageWrapperProps) => {
	const dispatch = useAppDispatch();
	const permissions = useAppSelector(({user}) => user.current?.permissions);

	const currentPermission = permissions?.find((p) => p.table === table);

	const url = useRouter();

	const [filters, setFilters] = useState<IReportGetParams>({skip: 0, take: 20});

	const onStatusChange = (statusId?: eReportStatusType) => () => {
		setFilters((prev) => ({...prev, statusId}));

		switch (table) {
			case eTable.DailyReport:
				dispatch(getAllDailyReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.FinancialExpensesReport:
				dispatch(getAllFinancialExpensesReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.MediaReport:
				dispatch(getAllMediaPlaceReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.TelemedicineReport:
				dispatch(getAllTelemedicineReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.TrainingReport:
				dispatch(getAllTrainingReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.VisitsOfForeignSpecialistsReport:
				dispatch(getAllVisitForeignSpecialistsReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.ScientificEventsReport:
				dispatch(getAllScientificEventsReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.ScientificWorksReport:
				dispatch(getAllScientificWorksReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.ScienceReport:
				dispatch(getAllScienceReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.InsuranceReport:
				dispatch(getAllInsuranceReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.ImplementationReport:
				dispatch(getAllImplementationReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.AppealsReport:
				dispatch(getAllAppealsReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			case eTable.DepartureReport:
				dispatch(getAllDepartureReportsThunk(statusId ? {statusId, skip: 0, take: 20} : undefined));
				break;
			default:
				break;
		}
	};

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
						<AppButton
							onClick={onStatusChange()}
							className={cn({active: !filters.statusId})}
							variant="primary-outline"
							size="lg"
						>
							Все
						</AppButton>
						<AppButton
							onClick={onStatusChange(eReportStatusType.Sent)}
							className={cn({active: filters.statusId === eReportStatusType.Sent})}
							variant="primary-outline"
							size="lg"
						>
							Отправлен
						</AppButton>
						<AppButton
							onClick={onStatusChange(eReportStatusType.Approved)}
							className={cn({active: filters.statusId === eReportStatusType.Approved})}
							variant="primary-outline"
							size="lg"
						>
							Принят
						</AppButton>
						<AppButton
							onClick={onStatusChange(eReportStatusType.Rejected)}
							className={cn({active: filters.statusId === eReportStatusType.Rejected})}
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
			{children}
		</div>
	);
};
