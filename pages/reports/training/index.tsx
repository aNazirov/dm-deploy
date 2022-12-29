import React, {useEffect} from "react";
import Head from "next/head";
import {AppBadge, AppDivider, AppPagination, AppTable} from "../../../components/Main";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import {getAllTrainingReportsThunk} from "../../../core/store/report/training/training-report.thunks";
import {setAllTrainingReportsAction} from "../../../core/store/report/training/training-report.slices";
import Moment from "react-moment";
import {eTable} from "../../../core/models";
import {ReportListPageWrapper} from "../../../components/Layout";

const TrainingReportListPage = () => {
	const dispatch = useAppDispatch();
	const trainingReport = useAppSelector(({trainingReport}) => trainingReport);

	const router = useRouter();

	useEffect(() => {
		const promises = [dispatch(getAllTrainingReportsThunk())];

		return () => {
			promises.forEach((p) => p.abort());
			setAllTrainingReportsAction({list: [], count: 0});
		};
	}, []);

	const onOpenReport = (reportId: number) => () => {
		void router.push(`/reports/training/${reportId}`);
	};

	const renderTableBodyRow = () => {
		return trainingReport.list.map((report) => (
			<tr onClick={onOpenReport(report.id)} key={report.id}>
				<td>{report.id}</td>
				<td>{report.id}</td>
				<td>
					<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
				</td>
				<td>{report.organization.title.ru}</td>
				<td>{report.note ?? "-"}</td>
				<td>
					<AppBadge statusId={report.status.id} className="mx-auto" variant="warning">
						{report.status.title.ru}
					</AppBadge>
				</td>
			</tr>
		));
	};

	return (
		<>
			<Head>
				<title>Повышение квалификации (ОЦ)</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Повышение квалификации (ОЦ)</h1>

			<AppDivider className="my-1.25" />

			<ReportListPageWrapper table={eTable.TrainingReport}>
				{trainingReport.list.length > 0 ? (
					<AppTable linked>
						<AppTable.THead>
							<tr>
								<th>ID</th>
								<th>Номер</th>
								<th>Дата</th>
								<th>Организация</th>
								<th>Комментарии</th>
								<th>Статус</th>
							</tr>
						</AppTable.THead>
						<AppTable.TBody>{renderTableBodyRow()}</AppTable.TBody>
					</AppTable>
				) : (
					"Список отчётов пуст."
				)}

				<div className="mt-auto">
					<AppDivider className="my-1.25" />
					<AppPagination />
				</div>
			</ReportListPageWrapper>
		</>
	);
};

export default TrainingReportListPage;
