import React, {useEffect} from "react";
import Head from "next/head";
import {AppBadge, AppDivider, AppPagination, AppTable} from "../../../components/Main";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import Moment from "react-moment";
import {useRouter} from "next/router";
import {ReportListPageWrapper} from "../../../components/Layout";
import {eTable} from "../../../core/models";
import {getAllScientificWorksReportsThunk} from "../../../core/store/report/scientificWorks/scientific-works-report.thunks";
import {setAllScientificWorksReportsAction} from "../../../core/store/report/scientificWorks/scientific-works-report.slices";

const ScientificWorksReportListPage = () => {
	const dispatch = useAppDispatch();
	const scientificWorksReport = useAppSelector(({scientificWorksReport}) => scientificWorksReport);

	const router = useRouter();

	useEffect(() => {
		const promises = [dispatch(getAllScientificWorksReportsThunk())];

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setAllScientificWorksReportsAction({list: [], count: 0}));
		};
	}, []);

	const onOpenReport = (reportId: number) => () => {
		void router.push(`/reports/scientific-works/${reportId}`);
	};

	const renderTableBodyRow = () => {
		return scientificWorksReport.list.map((report) => (
			<tr onClick={onOpenReport(report.id)} key={report.id}>
				<td>{report.id}</td>
				<td>{report.id}</td>
				<td>
					<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
				</td>
				<td>{report.organization.title.ru}</td>
				<td>{report.note ?? "-"}</td>
				<td>
					<AppBadge statusId={report.status.id} className="mx-auto">
						{report.status.title.ru}
					</AppBadge>
				</td>
			</tr>
		));
	};

	return (
		<>
			<Head>
				<title>Научные статьи, патенты и др.</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">Научные статьи, патенты и др.</h1>

			<AppDivider className="my-1.25" />

			<ReportListPageWrapper table={eTable.ScientificWorksReport}>
				{scientificWorksReport.list.length > 0 ? (
					<AppTable linked wrapperClassName="p-0">
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

export default ScientificWorksReportListPage;