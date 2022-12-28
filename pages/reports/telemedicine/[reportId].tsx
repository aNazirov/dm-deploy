import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppCard, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {eReportStatusType, eTable} from "../../../core/models";
import {getTelemedicineReportByIdThunk} from "../../../core/store/report/telemedicine/telemedicine.thunks";
import {setTelemedicineReportByIdAction} from "../../../core/store/report/telemedicine/telemedicine.slices";
import {ReportPageUpdate} from "../../../components/Layout";

const TelemedicineListInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({telemedicineReport}) => telemedicineReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getTelemedicineReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setTelemedicineReportByIdAction(null));
				};
			}
		}
	}, [reportId]);

	if (!report) return null;
	const renderTableBodyRows = () => {
		return report.telemedicineParts?.map((part) => (
			<tr key={part.id}>
				<td>{part.place}</td>
				<td>{part.consultations}</td>
				<td>{part.councils}</td>
				<td>{part.demonstrationOperations}</td>
				<td>{part.seminars}</td>
				<td>{part.symposiums}</td>
			</tr>
		));
	};

	return (
		<>
			<Head>
				<title>{report.organization.title.ru}</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">{report.organization.title.ru}</h1>

			<AppDivider className="my-1.25" />

			<AppCard shadow="table">
				<AppTable wrapperClassName="p-0">
					<AppTable.THead extended>
						<tr>
							<th>Область</th>
							<th>Кол-во консультаций</th>
							<th>Кол-во консилиумов:</th>
							<th>Кол-во показательных операций</th>
							<th>Кол-во семинаров, (мacтep.к)</th>
							<th>Кол-во симпозиумов, (к)</th>
						</tr>
					</AppTable.THead>
					<AppTable.TBody>{renderTableBodyRows()}</AppTable.TBody>
				</AppTable>
			</AppCard>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/telemedicine" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.TelemedicineReport}
				/>
			</div>
		</>
	);
};

export default TelemedicineListInfoPage;
