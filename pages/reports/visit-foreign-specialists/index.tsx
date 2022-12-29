import React, {useEffect} from "react";
import Head from "next/head";
import {AppBadge, AppDivider, AppPagination, AppTable} from "../../../components/Main";

import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {useRouter} from "next/router";
import Moment from "react-moment";
import {getAllVisitForeignSpecialistsReportsThunk} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.thunks";
import {setAllVisitForeignSpecialistsReportsAction} from "../../../core/store/report/visitForeignSpecialists/visitForeignSpecialists.slices";
import {eTable} from "../../../core/models";
import {ReportListPageWrapper} from "../../../components/Layout";

const VisitForeignSpecialistsReportListPage = () => {
	const dispatch = useAppDispatch();
	const visitForeignSpecialistsReport = useAppSelector(
		({visitForeignSpecialistsReport}) => visitForeignSpecialistsReport,
	);

	const router = useRouter();

	useEffect(() => {
		const promises = [dispatch(getAllVisitForeignSpecialistsReportsThunk())];

		return () => {
			promises.forEach((p) => p.abort());
			setAllVisitForeignSpecialistsReportsAction({list: [], count: 0});
		};
	}, []);

	const onOpenReport = (reportId: number) => () => {
		void router.push(`/reports/visit-foreign-specialists/${reportId}`);
	};

	const renderTableBodyRow = () => {
		return visitForeignSpecialistsReport.list.map((report) => (
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
				<title>Визит иностранных специалистов (ОЦ)</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Визит иностранных специалистов (ОЦ)</h1>

			<AppDivider className="my-1.25" />

			<ReportListPageWrapper table={eTable.VisitsOfForeignSpecialistsReport}>
				{visitForeignSpecialistsReport.list.length > 0 ? (
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

export default VisitForeignSpecialistsReportListPage;
