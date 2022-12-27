import React, {DetailedHTMLProps, HTMLAttributes} from "react";
import {eReportStatusType, eTable, eTablePermission} from "../../../core/models";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {AppButton} from "../../Main";
import DeleteIcon from "../../../assets/images/icons/filled/trash.svg";
import EditIcon from "../../../assets/images/icons/filled/pencil.svg";
import {
	changeStatusOfDailyReportThunk,
	deleteDailyReportThunk,
} from "../../../core/store/report/daily/daily-report.thunks";
import {
	changeStatusOfFinancialExpensesReportThunk,
	deleteFinancialExpensesReportThunk,
} from "../../../core/store/report/financialExpenses/financial-expenses-report.thunks";
import {
	changeStatusOfMediaPlaceReportThunk,
	deleteMediaPlaceReportThunk,
} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {
	changeStatusOfTelemedicineReportThunk,
	deleteTelemedicineReportThunk,
} from "../../../core/store/report/telemedicine/telemedicine.thunks";
import {
	changeStatusOfTrainingReportThunk,
	deleteTrainingReportThunk,
} from "../../../core/store/report/training/training-report.thunks";
import {
	changeStatusOfVisitForeignSpecialistsReportThunk,
	deleteVisitForeignSpecialistsReportThunk,
} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import {useRouter} from "next/router";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	reportId: number;
	table: eTable;
}
export const ReportPageUpdate = ({reportId, table, ...props}: IProps) => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const permissions = useAppSelector(({user}) => user.user?.permissions);

	const currentPermission = permissions?.find((p) => p.table === table);

	const onUpdateStatus = (statusTypeId: eReportStatusType) => () => {
		switch (table) {
			case eTable.DailyReport:
				dispatch(changeStatusOfDailyReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.FinancialExpensesReport:
				dispatch(changeStatusOfFinancialExpensesReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.MediaReport:
				dispatch(changeStatusOfMediaPlaceReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.TelemedicineReport:
				dispatch(changeStatusOfTelemedicineReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.TrainingReport:
				dispatch(changeStatusOfTrainingReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.VisitsOfForeignSpecialistsReport:
				dispatch(changeStatusOfVisitForeignSpecialistsReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			default:
				break;
		}
	};

	const onDelete = async () => {
		let url = "/reports";
		// TODO: refactor variable below, use const instead of let
		let action: {payload: number};

		switch (table) {
			case eTable.DailyReport:
				action = (await dispatch(deleteDailyReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/daily";
				}
				break;
			case eTable.FinancialExpensesReport:
				action = (await dispatch(deleteFinancialExpensesReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/financial-expenses";
				}
				break;
			case eTable.MediaReport:
				action = (await dispatch(deleteMediaPlaceReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/media-place";
				}
				break;
			case eTable.TelemedicineReport:
				action = (await dispatch(deleteTelemedicineReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/telemedicine";
				}
				break;
			case eTable.TrainingReport:
				action = (await dispatch(deleteTrainingReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/training";
				}
				break;
			case eTable.VisitsOfForeignSpecialistsReport:
				action = (await dispatch(deleteVisitForeignSpecialistsReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/visit-foreign-specialists";
				}
				break;
			default:
				break;
		}

		if (url) {
			void router.push(url);
		}
	};

	return (
		<div className="d-flex gap-1.25" {...props}>
			{currentPermission?.permissions.includes(eTablePermission.Update) && (
				<AppButton size="lg" variant="print" withIcon>
					<EditIcon width="24px" height="24px" />
					<span>Редактировать</span>
				</AppButton>
			)}

			{currentPermission?.permissions.includes(eTablePermission.Delete) && (
				<AppButton onClick={onDelete} size="lg" variant="danger" withIcon>
					<DeleteIcon width="24px" height="24px" />
					<span>Удалить</span>
				</AppButton>
			)}

			{currentPermission?.permissions.includes(eTablePermission.Status) && (
				<>
					<AppButton onClick={onUpdateStatus(eReportStatusType.Rejected)} size="lg" variant="danger">
						Отказать
					</AppButton>
					<AppButton onClick={onUpdateStatus(eReportStatusType.Approved)} size="lg" variant="success">
						Принять
					</AppButton>
				</>
			)}
		</div>
	);
};
