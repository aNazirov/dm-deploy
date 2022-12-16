import React, {useEffect} from "react";
import Head from "next/head";
import {AppButton, AppDivider, AppTable} from "../../../components/Main";
import ChevronIcon from "../../../assets/images/icons/filled/arrows/chevron-left.svg";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../../core/hooks";
import {
	changeStatusOfDailyReportThunk,
	getDailyReportByIdThunk,
} from "../../../core/store/report/daily/daily-report.thunks";
import {eReportStatusType} from "../../../core/models";
import Moment from "react-moment";

const DailyListInfoPage = () => {
	const router = useRouter();
	const reportId = router.query["reportId"] as string;

	const dispatch = useAppDispatch();
	const report = useAppSelector(({dailyReport}) => dailyReport.current);

	useEffect(() => {
		if (reportId) {
			const id = +reportId;

			if (!isNaN(id)) {
				dispatch(getDailyReportByIdThunk(id));
			}
		}
	}, [reportId]);

	const onClick = (statusTypeId: number) => () => {
		dispatch(changeStatusOfDailyReportThunk({id: +reportId, statusId: statusTypeId}));
	};
	if (!report) return null;

	return (
		<div className="pe-0 flex-col h-100">
			<Head>
				<title>
					Республика ихтисослаштирилган онкология ва тиббий радиология илмий-амалий тиббиёт маркази tibbiyot markazining
					<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
				</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="h1 text-center">
				Республика ихтисослаштирилган онкология ва тиббий радиология илмий-амалий тиббиёт маркази tibbiyot markazining
				<Moment format="DD.MM.YYYY">{report.createdAt}</Moment>
			</h1>

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
				<div className="d-flex gap-0.5">
					<AppButton onClick={onClick(eReportStatusType.Rejected)} size="lg" variant="danger">
						Отказать
					</AppButton>
					<AppButton onClick={onClick(eReportStatusType.Approved)} size="lg" variant="success">
						Принять
					</AppButton>
				</div>
			</div>
		</div>
	);
};

export default DailyListInfoPage;
