import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import {eReportStatusType, eTable, eTablePermission} from "../../../core/models";
import {useAppDispatch, useAppSelector, useDebounce} from "../../../core/hooks";
import {AppButton, AppInput} from "../../Main";
import DeleteIcon from "../../../assets/images/icons/filled/trash.svg";
import EditIcon from "../../../assets/images/icons/filled/pencil.svg";
import {
	changeStatusOfDailyReportThunk,
	deleteDailyReportThunk,
	updateDailyReportThunk,
} from "../../../core/store/report/daily/daily-report.thunks";
import {
	changeStatusOfFinancialExpensesReportThunk,
	deleteFinancialExpensesReportThunk,
	updateFinancialExpensesReportThunk,
} from "../../../core/store/report/financialExpenses/financial-expenses-report.thunks";
import {
	changeStatusOfMediaPlaceReportThunk,
	deleteMediaPlaceReportThunk,
	updateMediaPlaceReportThunk,
} from "../../../core/store/report/mediaPlace/mediaPlace.thunks";
import {
	changeStatusOfTelemedicineReportThunk,
	deleteTelemedicineReportThunk,
	updateTelemedicineReportThunk,
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
import {
	changeStatusOfScientificWorksReportThunk,
	deleteScientificWorksReportThunk,
	updateScientificWorksReportThunk,
} from "../../../core/store/report/scientificWorks/scientific-works-report.thunks";
import {
	changeStatusOfScientificEventsReportThunk,
	deleteScientificEventsReportThunk,
	updateScientificEventsReportThunk,
} from "../../../core/store/report/scientificEvents/scientific-events-report.thunks";
import {
	changeStatusOfScienceReportThunk,
	deleteScienceReportThunk,
	updateScienceReportThunk,
} from "../../../core/store/report/science/science.thunks";
import {
	changeStatusOfInsuranceReportThunk,
	deleteInsuranceReportThunk,
	updateInsuranceReportThunk,
} from "../../../core/store/report/insurance/insurance-report.thunks";
import {
	changeStatusOfImplementationReportThunk,
	deleteImplementationReportThunk,
	updateImplementationReportThunk,
} from "../../../core/store/report/implementation/implementation-report.thunks";
import {
	changeStatusOfAppealsReportThunk,
	deleteAppealsReportThunk,
	updateAppealsReportThunk,
} from "../../../core/store/report/appeals/appeals-report.thunks";
import {
	changeStatusOfDepartureReportThunk,
	deleteDepartureReportThunk,
	updateDepartureReportThunk,
} from "../../../core/store/report/departure/departure-report.thunks";

interface IProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	reportId: number;
	table: eTable;
	paternalId: number;
	reportStatusId: eReportStatusType;
	reportCreatorId?: number;
}
export const ReportPageUpdate = ({reportId, table, paternalId, reportCreatorId, reportStatusId, ...props}: IProps) => {
	const router = useRouter();

	const dispatch = useAppDispatch();
	const user = useAppSelector(({user}) => user.current);
	const permissions = useAppSelector(({user}) => user.current?.permissions);

	const [comment, setComment] = useState("");

	const debouncedComment = useDebounce(comment, 500);

	useEffect(() => {
		if (debouncedComment) {
			switch (table) {
				case eTable.DailyReport:
					dispatch(updateDailyReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;

				case eTable.FinancialExpensesReport:
					dispatch(updateFinancialExpensesReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.MediaReport:
					dispatch(updateMediaPlaceReportThunk({payload: {id: +reportId, body: {note: debouncedComment}}}));
					break;
				case eTable.TelemedicineReport:
					dispatch(updateTelemedicineReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				/*case eTable.TrainingReport:
				dispatch(changeStatusOfTrainingReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.VisitsOfForeignSpecialistsReport:
				dispatch(changeStatusOfVisitForeignSpecialistsReportThunk({id: +reportId, statusId: statusTypeId}));
				break;*/
				case eTable.ScientificEventsReport:
					dispatch(updateScientificEventsReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.ScientificWorksReport:
					dispatch(updateScientificWorksReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.ScienceReport:
					dispatch(updateScienceReportThunk({payload: {id: +reportId, body: {note: debouncedComment}}}));
					break;
				case eTable.InsuranceReport:
					dispatch(updateInsuranceReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.ImplementationReport:
					dispatch(updateImplementationReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.AppealsReport:
					dispatch(updateAppealsReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				case eTable.DepartureReport:
					dispatch(updateDepartureReportThunk({id: +reportId, body: {note: debouncedComment}}));
					break;
				default:
					break;
			}
		}
	}, [debouncedComment]);

	const currentPermission = permissions?.find((p) => p.table === table);

	const onEditing = () => {
		void router.push({pathname: "update", query: {reportId}});
	};

	const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

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
			case eTable.ScientificEventsReport:
				dispatch(changeStatusOfScientificEventsReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.ScientificWorksReport:
				dispatch(changeStatusOfScientificWorksReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.ScienceReport:
				dispatch(changeStatusOfScienceReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.InsuranceReport:
				dispatch(changeStatusOfInsuranceReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.ImplementationReport:
				dispatch(changeStatusOfImplementationReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.AppealsReport:
				dispatch(changeStatusOfAppealsReportThunk({id: +reportId, statusId: statusTypeId}));
				break;
			case eTable.DepartureReport:
				dispatch(changeStatusOfDepartureReportThunk({id: +reportId, statusId: statusTypeId}));
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
			case eTable.ScientificEventsReport:
				action = (await dispatch(deleteScientificEventsReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/scientific-events";
				}
				break;
			case eTable.ScientificWorksReport:
				action = (await dispatch(deleteScientificWorksReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/scientific-works";
				}
				break;
			case eTable.ScienceReport:
				action = (await dispatch(deleteScienceReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/science";
				}
				break;
			case eTable.InsuranceReport:
				action = (await dispatch(deleteInsuranceReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/insurance";
				}
				break;
			case eTable.ImplementationReport:
				action = (await dispatch(deleteImplementationReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/implementation";
				}
				break;
			case eTable.AppealsReport:
				action = (await dispatch(deleteAppealsReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/appeals";
				}
				break;
			case eTable.DepartureReport:
				action = (await dispatch(deleteDepartureReportThunk(reportId))) as typeof action;
				if (action.payload) {
					url += "/departure";
				}
				break;
			default:
				break;
		}

		if (url !== "/reports") {
			void router.push(url);
		}
	};

	return (
		<div className="d-flex gap-1.25" {...props}>
			{currentPermission?.permissions.includes(eTablePermission.Update) &&
				user?.id === reportCreatorId &&
				reportStatusId !== eReportStatusType.Approved && (
					<>
						<AppButton onClick={onEditing} size="lg" variant="print" withIcon>
							<EditIcon width="24px" height="24px" />
							<span>Редактировать</span>
						</AppButton>
					</>
				)}

			{currentPermission?.permissions.includes(eTablePermission.Delete) && user?.id === reportCreatorId && (
				<AppButton onClick={onDelete} size="lg" variant="danger" withIcon>
					<DeleteIcon width="24px" height="24px" />
					<span>Удалить</span>
				</AppButton>
			)}

			{currentPermission?.permissions.includes(eTablePermission.Status) && user?.organization.id === paternalId && (
				<>
					{reportStatusId === eReportStatusType.Rejected ? (
						<>
							<AppInput type="text" onChange={onCommentChange} placeholder="Комментарий..." value={comment} />
							<AppButton onClick={onUpdateStatus(eReportStatusType.Approved)} size="lg" variant="success">
								Принять
							</AppButton>
						</>
					) : (
						<>
							<AppButton onClick={onUpdateStatus(eReportStatusType.Rejected)} size="lg" variant="danger">
								Отказать
							</AppButton>
						</>
					)}
				</>
			)}
		</div>
	);
};
