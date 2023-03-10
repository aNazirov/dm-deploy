import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AppBadge, AppDivider, AppPagination, AppTable} from "../../../components/Main";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getAllInsuranceReportsThunk} from "../../../core/store/report/insurance/insurance-report.thunks";
import {setAllInsuranceReportsAction} from "../../../core/store/report/insurance/insurance-report.slices";
import Moment from "react-moment";
import {useRouter} from "next/router";
import {ReportListPageWrapper} from "../../../components/Layout";
import {eTable, IReportGetParams} from "../../../core/models";

const InsuranceReportListPage = () => {
	const dispatch = useAppDispatch();
	const insuranceReport = useAppSelector(({insuranceReport}) => insuranceReport);

	const router = useRouter();

	const [filters, setFilters] = useState<IReportGetParams>({skip: 0, take: 20});
	useEffect(() => {
		const promises = [dispatch(getAllInsuranceReportsThunk(filters))];

		return () => {
			promises.forEach((p) => p.abort());
			dispatch(setAllInsuranceReportsAction({list: [], count: 0}));
		};
	}, [filters]);

	const onOpenReport = (reportId: number) => () => {
		void router.push(`/reports/insurance/${reportId}`);
	};

	const onPagination = (pagination: {take: number; skip: number}) => {
		setFilters((prev) => ({...prev, ...pagination}));
	};

	const renderTableBodyRow = () => {
		return insuranceReport.list.map((report) => (
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
				<title>
					Информация о размере финансирования из государственного фонда медицинского страхования (название центра)
				</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">
				Информация о размере финансирования из государственного фонда медицинского страхования (название центра)
			</h1>

			<AppDivider className="my-1.25" />

			<ReportListPageWrapper table={eTable.InsuranceReport} cb={onPagination}>
				{insuranceReport.list.length > 0 ? (
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
					<AppPagination
						take={filters.take}
						skip={filters.skip}
						totalCount={insuranceReport?.count}
						cb={onPagination}
					/>
				</div>
			</ReportListPageWrapper>
		</>
	);
};

export default InsuranceReportListPage;
