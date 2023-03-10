import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getInsuranceReportByIdThunk} from "../../../core/store/report/insurance/insurance-report.thunks";
import {eTable} from "../../../core/models";
import Moment from "react-moment";
import {setInsuranceReportByIdAction} from "../../../core/store/report/insurance/insurance-report.slices";
import {ReportPageUpdate} from "../../../components/Layout";

const InsuranceReportInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({insuranceReport}) => insuranceReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getInsuranceReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setInsuranceReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>{report.organization.title.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">{report.organization.title.ru}</h1>

			<AppDivider className="my-1.25" />

			<AppTable>
				<AppTable.THead extended>
					<tr>
						{/* TODO: URGENT add date to all report id pages */}
						<th>Дата</th>
						<th colSpan={2}>Акты, поданные на рассмотренеие в ГФМС</th>
						<th colSpan={2}>Рассмотренные и одобренные акты ГФМС</th>
						<th colSpan={2}>Рассмотренные и неодобренные акты ГФМС</th>
						<th>Расмотренные, одобренные акты и отправленные счет-фактуры</th>
						<th>Финансирования со стороны ГФМС</th>
						<th>Количество пациентов получивших лечение на основе льготного напрваления</th>
						<th>Итоговый годовой контракт</th>
						<th>Остаток относительно суммы контракта</th>
					</tr>
					<tr>
						<th>Количество</th>
						<th>Сумма</th>
						<th>Количество</th>
						<th>Сумма</th>
						<th>Количество</th>
						<th>Сумма</th>
						<th>Сумма</th>
						<th>Сумма</th>
						<th>Сумма</th>
						<th>Сумма</th>
						<th>Сумма</th>
						<th>Сумма</th>
						{/* TODO: URGENT SHOW ALSO GENERATED FIELDS	*/}
					</tr>
				</AppTable.THead>
				<AppTable.TBody>
					<tr>
						<td>
							<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
						</td>
						<td>{report.acts}</td>
						<td>{report.amountOfActs}</td>
						<td>{report.approvedActs}</td>
						<td>{report.amountOfApprovedActs}</td>
						<td>{report.rejectedActs}</td>
						<td>{report.amountOfRejectedActs}</td>
						<td>{report.amountOfSentApprovedInvoices}</td>
						<td>{report.fundedAmount}</td>
						<td>{report.patients}</td>
						<td>{report.annualAmount}</td>
						<td>{report.residualAmount}</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/insurance" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportOrganizationId={report.organization.id}
					reportCreatorId={report.user?.id}
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.InsuranceReport}
				/>
			</div>
		</div>
	);
};

export default InsuranceReportInfoPage;
