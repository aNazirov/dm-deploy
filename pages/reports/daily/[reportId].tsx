import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {getDailyReportByIdThunk} from "../../../core/store/report/daily/daily-report.thunks";
import {eTable} from "../../../core/models";
import Moment from "react-moment";
import {setDailyReportByIdAction} from "../../../core/store/report/daily/daily-report.slices";
import {ReportPageUpdate} from "../../../components/Layout";

const DailyListInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({dailyReport}) => dailyReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				const promises = [dispatch(getDailyReportByIdThunk(id))];

				return () => {
					promises.forEach((p) => p.abort());
					dispatch(setDailyReportByIdAction(null));
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
						<th rowSpan={3}>Дата</th>
						<th colSpan={3}>Количество коек</th>
						<th colSpan={3}>Количество пациентов (резиденты)</th>
						<th colSpan={2}>Количество пациентов (не резиденты)</th>
						<th colSpan={6}>Поступление денег</th>
					</tr>
					<tr>
						<th rowSpan={2}>Итого</th>
						<th rowSpan={2}>Занято</th>
						<th rowSpan={2}>Свободно</th>
						<th rowSpan={2}>Амбулаторно</th>
						<th rowSpan={2}>Стационар</th>
						<th rowSpan={2}>В том числе с направлением</th>
						<th rowSpan={2}>Амбулаторно</th>
						<th rowSpan={2}>Стационар</th>
						<th colSpan={2}>Поликлиника</th>
						<th colSpan={2}>Стационар</th>
						<th rowSpan={2}>ГФМС</th>
						<th rowSpan={2}>Другие поступления</th>
					</tr>
					<tr>
						<th>Касса</th>
						<th>Перечисления</th>
						<th>Касса</th>
						<th>Перечисления</th>
					</tr>
				</AppTable.THead>
				<AppTable.TBody>
					<tr>
						<td>
							<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
						</td>
						<td>{report.totalBeds}</td>
						<td>{report.occupiedBeds}</td>
						<td>{report.freeBeds}</td>
						<td>{report.outPatientsRes}</td>
						<td>{report.inPatientsRes}</td>
						<td>{report.otherPatientsRes}</td>
						<td>{report.outPatients}</td>
						<td>{report.inPatients}</td>
						<td>{report.polyclinicCash}</td>
						<td>{report.polyclinicReceiptsCash}</td>
						<td>{report.hospitalCash}</td>
						<td>{report.hospitalReceiptsCash}</td>
						<td>{report.gfms}</td>
						<td>{report.otherReceipts}</td>
					</tr>
				</AppTable.TBody>
			</AppTable>

			<div className="flex-justify-between mt-auto pe-2.5">
				<AppButton useAs="link" href="/reports/daily" size="lg" variant="dark" withIcon>
					<ChevronIcon width="24px" height="24px" />
					Назад
				</AppButton>

				<ReportPageUpdate
					reportStatusId={report.status.id}
					paternalId={report.organization.paternalId}
					reportId={+reportId}
					table={eTable.DailyReport}
				/>
			</div>
		</div>
	);
};

export default DailyListInfoPage;
